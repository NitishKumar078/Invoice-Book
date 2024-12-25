// This file is the entry point of the Rust application. It initializes the application and starts the server, calling functions from the library.

use actix_web::{web, App, HttpServer};
use rust_backend::db::init_db;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    init_db().expect("Failed to initialize database");

    HttpServer::new(|| {
        App::new()
            .route("/api/some_endpoint", web::get().to(some_handler))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}

async fn some_handler() -> &'static str {
    "Hello, World!"
}