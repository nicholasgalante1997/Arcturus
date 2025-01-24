use actix_cors::Cors;
use actix_web::{dev::Service, http, middleware, web, App, HttpServer};

mod database;
mod env;
mod log;
mod models;
mod routes;
mod services;
mod util;

use routes as AppRoutes;
use services as AppServices;

use database::DatabaseConnection;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env::setup_env();

    let pg_database = database::PostgresConnection::new();

    let pg_pool = pg_database
        .connect()
        .await
        .expect("Failed to connect to database");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pg_pool.clone()))
            .wrap(
                Cors::default()
                    .allow_any_origin() // Temporarily allow any origin -> .allowed_origin("http://example.com") // Allow only this origin
                    .allowed_methods(vec!["GET", "OPTIONS"])
                    .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT])
                    .allowed_header(http::header::CONTENT_TYPE)
                    .max_age(3600),
            )
            .wrap_fn(|req, srv| {
                let mut logger = log::get_logger("middleware");
                let logline = format!("{} {}", req.method(), req.path());
                logger.write(logline);
                let fut = srv.call(req);
                async {
                    let res = fut.await?;
                    Ok(res)
                }
            })
            .wrap(
                middleware::DefaultHeaders::new()
                    .add(("X-RS-Project-Arcturus-Server-API-Version", "0.2")),
            )
            .service(web::scope("/api").configure(|api_config| {
                AppServices::service_configurations::api::configure_api_service(api_config);
            }))
            .service(web::scope("/health").configure(|health_config| {
                AppServices::service_configurations::health::configure_health_check_service(
                    health_config,
                );
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
