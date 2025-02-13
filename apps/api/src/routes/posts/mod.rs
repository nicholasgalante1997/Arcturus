use actix_web::{web, HttpResponse};
use sqlx::PgPool;
use std::error::Error;

use crate::log::get_logger;
use crate::models::orms::posts::{Post, Posts};
use crate::util::json::convert_to_json_body;

pub async fn get_all(pool: web::Data<PgPool>) -> Result<HttpResponse, Box<dyn Error>> {
    let mut logger = get_logger("handler:get_all_posts");
    logger.write("Pulling all posts from psql ...".to_string());
    let orm = Posts::new(pool.as_ref());
    let posts = orm.read_all().await?;
    let filtered: Vec<Post> = posts
        .iter()
        .filter(|post| !post.is_test_data.unwrap_or_else(|| false))
        .map(|post| post.clone())
        .collect();
    logger.write("Posts pulled!".to_string());
    Ok(convert_to_json_body(&filtered))
}

pub async fn get_by_id(
    id: web::Path<i32>,
    pool: web::Data<PgPool>,
) -> Result<HttpResponse, Box<dyn Error>> {
    let mut logger = get_logger("handler:get_post_by_id");
    logger.write(format!("Pulling post w id {} from psql ...", &id));
    let orm = Posts::new(pool.as_ref());
    let post = orm.read_by_id(id.into_inner()).await?;
    logger.write("Post pulled!".to_string());
    Ok(convert_to_json_body(&post))
}

pub async fn get_by_slug(
    slug: web::Path<String>,
    pool: web::Data<PgPool>,
) -> Result<HttpResponse, Box<dyn Error>> {
    let mut logger = get_logger("handler:get_post_by_slug");
    logger.write(format!("Pulling post w slug {} from psql ...", &slug));
    let orm = Posts::new(pool.as_ref());
    let post = orm.read_by_slug(&slug).await?;
    logger.write("Post pulled!".to_string());
    Ok(convert_to_json_body(&post))
}

pub async fn create(
    post: web::Json<crate::models::orms::posts::CreatePost>,
    pool: web::Data<PgPool>,
) -> Result<HttpResponse, Box<dyn Error>> {
    let mut logger = get_logger("handler:create_post");
    logger.write("Creating post in psql ...".to_string());
    let orm = Posts::new(pool.as_ref());
    let post = orm.create(post.into_inner()).await?;
    logger.write("Post created!".to_string());
    Ok(convert_to_json_body(&post))
}

pub async fn update(
    post: web::Json<crate::models::orms::posts::Post>,
    pool: web::Data<PgPool>,
) -> Result<HttpResponse, Box<dyn Error>> {
    let mut logger = get_logger("handler:update_post");
    logger.write("Updating post in psql ...".to_string());
    let orm = Posts::new(pool.as_ref());
    let post = orm.update(post.into_inner()).await?;
    logger.write("Post updated!".to_string());
    Ok(convert_to_json_body(&post))
}

pub async fn delete(
    id: web::Path<i32>,
    pool: web::Data<PgPool>,
) -> Result<HttpResponse, Box<dyn Error>> {
    let mut logger = get_logger("handler:delete_post");
    logger.write("Deleting post in psql ...".to_string());
    let orm = Posts::new(pool.as_ref());
    let post = orm.delete(id.into_inner()).await?;
    logger.write("Post deleted!".to_string());
    Ok(convert_to_json_body(&post))
}
