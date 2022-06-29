const spicedPg = require("spiced-pg");

let USER_NAME, USER_PASSWORD;

if (!process.env.DATABASE_URL) {
    // Bc we are deploding we need to define where to get the value.
    USER_NAME = require("./secrets").USER_NAME;
    USER_PASSWORD = require("./secrets").USER_PASSWORD;
}

const database = "imageboard";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${USER_NAME}:${USER_PASSWORD}@localhost:5432/${database}`
);

exports.getAllImages = () => {
    return db.query(`SELECT * FROM images`);
};
