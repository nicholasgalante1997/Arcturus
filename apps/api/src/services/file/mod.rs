use actix_files::{self as fs};

use actix_web::{
    dev::{fn_service, ServiceRequest, ServiceResponse},
    web, HttpResponse,
};

use crate::log::get_logger;

pub fn configure_static_file_service(cfg: &mut web::ServiceConfig) {
    cfg.service(
        fs::Files::new("", "./public")
            .use_last_modified(true)
            .use_etag(true)
            .prefer_utf8(true)
            .mime_override(move |_| "text/markdown".into())
            .index_file("index.html")
            .redirect_to_slash_directory()
            .show_files_listing()
            .default_handler(fn_service(|req: ServiceRequest| async {
                let mut error_logger = get_logger("request:static:error");
                error_logger.write("File not found!".to_string());
                let (req, _) = req.into_parts();
                let res = HttpResponse::InternalServerError().finish();
                Ok(ServiceResponse::new(req, res))
            })),
    );
}
