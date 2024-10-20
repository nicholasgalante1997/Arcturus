use actix_cors::Cors;
use actix_web::{
    http,
    middleware::{self, Logger},
    web::{self, ServiceConfig},
};
use shuttle_actix_web::ShuttleActixWeb;
use sqlx::PgPool;

mod config;
mod database;
mod models;
mod routes;
mod services;
mod util;

use routes as AppRoutes;
use services as AppServices;

#[shuttle_runtime::main]
async fn main(
    #[shuttle_shared_db::Postgres] pool: PgPool,
) -> ShuttleActixWeb<impl FnOnce(&mut ServiceConfig) + Send + Clone + 'static> {
    sqlx::migrate!()
        .run(&pool)
        .await
        .expect("Failed to run migrations");

    let config = move |cfg: &mut ServiceConfig| {
        cfg.app_data(web::Data::new(pool.clone()));
        cfg.service(
            web::scope("/api")
                .wrap(Logger::default())
                .wrap(
                    Cors::default()
                        .allow_any_origin() // Temporarily allow any origin -> .allowed_origin("http://example.com") // Allow only this origin
                        .allowed_methods(vec!["GET", "OPTIONS"]) // Allow only GET and POST methods
                        .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT]) // Allow only these headers
                        .allowed_header(http::header::CONTENT_TYPE) // Allow Content-Type header
                        .max_age(3600),
                )
                .wrap(
                    middleware::DefaultHeaders::new().add(("X-Dotafts-Server-API-Version", "0.1")),
                )
                .wrap(middleware::DefaultHeaders::new().add(("X-Dotafts-Markdown-Version", "0.1")))
                .wrap(middleware::Compress::default())
                .configure(|scoped_cfg| {
                    AppServices::service_configurations::api::configure_api_service(scoped_cfg)
                }),
        );
        cfg.service(
            web::scope("")
                .wrap(Logger::default())
                .wrap(
                    Cors::default()
                        .allow_any_origin() // Temporarily allow any origin -> .allowed_origin("http://example.com") // Allow only this origin
                        .allowed_methods(vec!["GET", "OPTIONS"]) // Allow only GET and POST methods
                        .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT]) // Allow only these headers
                        .allowed_header(http::header::CONTENT_TYPE) // Allow Content-Type header
                        .max_age(3600),
                )
                .wrap(
                    middleware::DefaultHeaders::new().add(("X-Dotafts-Server-API-Version", "0.1")),
                )
                .wrap(middleware::DefaultHeaders::new().add(("X-Dotafts-Markdown-Version", "0.1")))
                .wrap(middleware::Compress::default())
                .configure(|scoped_cfg| {
                    AppServices::service_configurations::file::configure_static_file_service(
                        scoped_cfg,
                    )
                }),
        );
    };

    Ok(config.into())
}
