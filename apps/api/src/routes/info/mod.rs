use actix_web::Responder;
use std::error::Error;

use crate::config::api::info::ServiceInfo;
use crate::models::response::FilesInPublic;
use crate::util::fs::fsutils::load_directory_contents;

pub async fn get_service_info() -> impl Responder {
    ServiceInfo::new()
}

pub async fn get_all_articles_in_public() -> Result<impl Responder, Box<dyn Error>> {
    let contents = load_directory_contents("./public")?;
    Ok(FilesInPublic {
        data: contents.clone(),
    })
}
