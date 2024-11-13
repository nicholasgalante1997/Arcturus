use sqlx::postgres::PgPoolOptions;
use std::env;

use log::info;

/// Establishes a connection to the PostgreSQL database using the DATABASE_URL
/// environment variable. Returns a `sqlx::PgPool` representing the connection pool.
///
/// #### Errors
///
/// Returns an error if the DATABASE_URL is not set or if the connection cannot be established.
pub async fn establish_connection() -> sqlx::Result<sqlx::PgPool> {
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = PgPoolOptions::new()
        .max_connections(2)
        .connect(&database_url)
        .await?;
    info!("Connected to database!");
    Ok(pool)
}
