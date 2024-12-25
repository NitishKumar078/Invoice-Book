// This file contains the module for database-related functionality.
// It includes functions for connecting to the SQLite database and executing queries.

use rusqlite::{params, Connection, Result};

pub fn establish_connection() -> Result<Connection> {
    let conn = Connection::open("db.sqlite3")?;
    Ok(conn)
}

pub fn execute_query(conn: &Connection, query: &str, params: &[&(dyn rusqlite::ToSql + Sync)]) -> Result<usize> {
    conn.execute(query, params)
}