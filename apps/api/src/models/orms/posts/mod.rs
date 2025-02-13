use anyhow::Result;
use serde::{Deserialize, Serialize};
use sqlx::{postgres::PgRow, types::Json, FromRow, PgPool, Row};

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Author {
    first_name: String,
    last_name: String,
    email: String,
    github: String,
    avatar: String,
    nickname: String,
    id: String,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Media {
    source: String,
    alt: String,
}

/// Represents a Post item from the psql database 'posts' table
#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Post {
    pub id: i32,
    pub slug: String,
    pub title: String,
    pub description: String,
    pub author: Json<Author>,
    pub category: String,
    pub arch_category: Option<String>,
    pub search_terms: Vec<String>,
    pub genres: Vec<String>,
    pub release_date: String,
    pub estimated_reading_time: String,
    pub media: Json<Media>,
    pub content: String,
    pub is_test_data: Option<bool>,
}

impl FromRow<'_, PgRow> for Post {
    fn from_row(row: &sqlx::postgres::PgRow) -> sqlx::Result<Self> {
        Ok(Post {
            id: row.try_get("id")?,
            slug: row.try_get("slug")?,
            title: row.try_get("title")?,
            description: row.try_get("description")?,
            author: row.try_get("author")?,
            category: row.try_get("category")?,
            arch_category: row.try_get("arch_category")?,
            search_terms: row.try_get("search_terms")?,
            genres: row.try_get("genres")?,
            release_date: row.try_get("release_date")?,
            estimated_reading_time: row.try_get("estimated_reading_time")?,
            media: row.try_get("media")?,
            content: row.try_get("content")?,
            is_test_data: row.try_get("is_test_data")?,
        })
    }
}

/// Represents the data transfer object for creating a Post item in the psql database 'posts' table
#[derive(Debug, Deserialize, Serialize)]
pub struct CreatePost {
    slug: String,
    title: String,
    description: String,
    author: Json<Author>,
    category: String,
    arch_category: Option<String>,
    search_terms: Vec<String>,
    genres: Vec<String>,
    release_date: String,
    estimated_reading_time: String,
    media: Json<Media>,
    content: String,
    is_test_data: Option<bool>,
}

pub struct Posts<'a> {
    pool: &'a PgPool,
}

impl<'a> Posts<'a> {
    pub fn new(pool: &'a PgPool) -> Self {
        Self { pool }
    }

    pub async fn read_by_slug(&self, slug: &str) -> Result<Post> {
        let post = sqlx::query_as::<_, Post>("SELECT * FROM posts WHERE slug = $1")
            .bind(slug)
            .fetch_one(self.pool)
            .await?;
        Ok(post)
    }

    pub async fn read_by_id(&self, id: i32) -> Result<Post> {
        let post = sqlx::query_as::<_, Post>("SELECT * FROM posts WHERE id = $1")
            .bind(id)
            .fetch_one(self.pool)
            .await?;
        Ok(post)
    }

    pub async fn read_all(&self) -> Result<Vec<Post>> {
        let posts = sqlx::query_as::<_, Post>("SELECT * FROM posts")
            .fetch_all(self.pool)
            .await?;
        Ok(posts)
    }

    pub async fn create(&self, post: CreatePost) -> Result<Post> {
        let post = sqlx::query_as::<_, Post>(
            "INSERT INTO posts (slug, title, description, author, category, arch_category, search_terms, genres, release_date, estimated_reading_time, media, content, is_test_data)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            RETURNING *",
        )
        .bind(post.slug)
        .bind(post.title)
        .bind(post.description)
        .bind(post.author)
        .bind(post.category)
        .bind(post.arch_category)
        .bind(post.search_terms)
        .bind(post.genres)
        .bind(post.release_date)
        .bind(post.estimated_reading_time)
        .bind(post.media)
        .bind(post.content)
        .bind(post.is_test_data)
        .fetch_one(self.pool)
        .await?;
        Ok(post)
    }

    pub async fn update(&self, post: Post) -> Result<Post> {
        let id = post.id;
        let query = r#"
            UPDATE posts
            SET slug = $1, title = $2, description = $3, author = $4, category = $5, arch_category = $6, 
                search_terms = $7, genres = $8, release_date = $9, estimated_reading_time = $10, 
                media = $11, content = $12, is_test_data = $13
            WHERE id = $14
            RETURNING id, slug, title, description, author, category, arch_category, search_terms, genres, 
                    release_date, estimated_reading_time, media, content, is_test_data
        "#;

        let post = sqlx::query_as(query)
            .bind(post.slug)
            .bind(post.title)
            .bind(post.description)
            .bind(post.author)
            .bind(post.category)
            .bind(post.arch_category)
            .bind(post.search_terms)
            .bind(post.genres)
            .bind(post.release_date)
            .bind(post.estimated_reading_time)
            .bind(post.media)
            .bind(post.content)
            .bind(post.is_test_data)
            .bind(id)
            .fetch_one(self.pool)
            .await?;
        Ok(post)
    }

    pub async fn delete(&self, id: i32) -> Result<i32> {
        let post = sqlx::query_as::<_, Post>("DELETE FROM posts WHERE id = $1 RETURNING *")
            .bind(id)
            .fetch_one(self.pool)
            .await?;
        Ok(post.id)
    }
}
