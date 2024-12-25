// This file contains the core logic of the application, including database connection setup and application state initialization.

pub mod db;
pub mod handlers;
pub mod models;

use rusqlite::{params, Connection, Result};

pub fn establish_connection() -> Result<Connection> {
    let conn = Connection::open("app.db")?;
    Ok(conn)
}

pub fn run() {
    // Initialize the database connection and application state here
    let _conn = establish_connection().expect("Failed to connect to the database");
    // Additional initialization logic can go here
}