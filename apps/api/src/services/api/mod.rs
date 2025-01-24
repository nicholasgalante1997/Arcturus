use crate::AppRoutes;
use actix_web::{web, HttpResponse};

pub fn configure_api_service(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::resource("/events")
            .route(web::post().to(AppRoutes::events::post_event))
            .route(web::get().to(HttpResponse::MethodNotAllowed))
            .route(web::put().to(HttpResponse::MethodNotAllowed))
            .route(web::patch().to(HttpResponse::MethodNotAllowed))
            .route(web::delete().to(HttpResponse::MethodNotAllowed)),
    );
    cfg.service(
        web::resource("/posts")
            .route(web::get().to(AppRoutes::posts::get_all))
            .route(web::post().to(AppRoutes::posts::create))
            .route(web::put().to(AppRoutes::posts::update))
            .route(web::delete().to(AppRoutes::posts::delete)),
    );
    cfg.service(web::resource("/posts/id/{id}").route(web::get().to(AppRoutes::posts::get_by_id)));
    cfg.service(
        web::resource("/posts/slug/{slug}").route(web::get().to(AppRoutes::posts::get_by_slug)),
    );
}
