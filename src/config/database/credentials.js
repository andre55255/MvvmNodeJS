require("dotenv").config();

const credentials = {
    database: process.env.DB_DATABASE || "mvvm",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "3306"
}

module.exports = { credentials }