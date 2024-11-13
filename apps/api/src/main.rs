use actix_cors::Cors;
use actix_web::{
    http,
    middleware::{self, Logger},
    web, App, HttpServer,
};

mod config;
mod database;
mod env;
mod models;
mod routes;
mod services;
mod util;

use routes as AppRoutes;
use services as AppServices;

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    env_logger::init_from_env(env_logger::Env::default().default_filter_or("info"));

    env::setup_env();
    
    let pool = database::establish_connection()
        .await
        .expect("Failed to connect to database");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .wrap(Logger::default())
            .wrap(
                Cors::default()
                    .allow_any_origin() // Temporarily allow any origin -> .allowed_origin("http://example.com") // Allow only this origin
                    .allowed_methods(vec!["GET", "OPTIONS"])
                    .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT])
                    .allowed_header(http::header::CONTENT_TYPE)
                    .max_age(3600),
            )
            .wrap(
                middleware::DefaultHeaders::new()
                    .add(("X-RS-Project-Arcturus-Server-API-Version", "0.2")),
            )
            .service(web::scope("/api").configure(|api_config| {
                AppServices::service_configurations::api::configure_api_service(api_config);
            }))
            .service(
                web::scope("")
                    .wrap(middleware::Compress::default())
                    .configure(|web_config| {
                        AppServices::service_configurations::file::configure_static_file_service(
                            web_config,
                        );
                    }),
            )
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
