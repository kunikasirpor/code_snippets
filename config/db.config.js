import mysql from "mysql";

// Create a connection pool
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "todo",
});

// Check the database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to the database:", err);
    } else {
        console.log("Connected to the database");
        connection.release();
    }
});

export default db;
