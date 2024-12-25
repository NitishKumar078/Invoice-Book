// This file defines the database schema, including the structure of tables and relationships. 
// It may use a library like Diesel or rusqlite for schema definitions.

table! {
    users (id) {
        id -> Integer,
        name -> Text,
        email -> Text,
        created_at -> Timestamp,
    }
}

table! {
    posts (id) {
        id -> Integer,
        user_id -> Integer,
        title -> Text,
        body -> Text,
        created_at -> Timestamp,
    }
}

joinable!(posts -> users(user_id));

allow_tables_to_appear_in_same_query!(
    users,
    posts,
);