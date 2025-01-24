use anyhow::Result;

pub trait ORM<'a, T, CT> {
    async fn create(&'a self, post: CT) -> Result<T>;
    async fn read(&'a self, id: u32) -> Result<T>;
    async fn read_all(&'a self) -> Result<Vec<T>>;
    async fn update(&'a self, id: u32, post: CT) -> Result<T>;
    async fn delete(&'a self, id: u32) -> Result<T>;
}
