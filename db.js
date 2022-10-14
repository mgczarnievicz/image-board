const spicedPg = require("spiced-pg");

let USER_NAME, USER_PASSWORD;

const LIMIT_CARDS = 3;
const database = "imageboard";

// if (!process.env.DATABASE_URL) {
//     // Bc we are deploying we need to define where to get the value.
//     USER_NAME = require("./secrets").USER_NAME;
//     USER_PASSWORD = require("./secrets").USER_PASSWORD;
// }

// const db = spicedPg(
//     process.env.DATABASE_URL ||
//         `postgres:${USER_NAME}:${USER_PASSWORD}@localhost:5432/${database}`
// );

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:1234@localhost:5432/${database}`
);

// REVIEW. change Fetch first to Limit
// exports.getAllImages = () => {
//     return db.query(
//         `SELECT * FROM images ORDER BY id DESC FETCH FIRST 6 ROWS ONLY`
//     );
// };

/* ---------------------------------------------------------------
                    images TABLE
----------------------------------------------------------------*/

exports.getAllImages = () => {
    return db.query(
        `SELECT id, title, url ,  (
            SELECT id FROM images
            ORDER BY id ASC
            LIMIT 1
            )AS "lowestId"
            FROM images ORDER BY id DESC LIMIT $1`,
        [LIMIT_CARDS]
    );
};

exports.getMoreImages = (id) => {
    return db.query(
        `SELECT id, title, url, (
            SELECT id FROM images
            ORDER BY id ASC
            LIMIT 1
            ) AS "lowestId"
            FROM images
            WHERE id < $1
            ORDER BY id DESC
            LIMIT $2;
            `,
        [id, LIMIT_CARDS]
    );
};

exports.getCardById = (id) => {
    return db.query(
        `SELECT *, (
            SELECT id FROM images
            WHERE id < $1
            ORDER BY id DESC
            LIMIT 1
            ) AS "nextId", (
            SELECT id FROM images
            WHERE id > $1
            ORDER BY id ASC
            LIMIT 1
            ) AS "previousId"
            FROM images
            WHERE id = $1;`,
        [id]
    );
};

// exports.getCardById = (id) => {
//     return db.query(`SELECT * FROM images WHERE id = $1`, [id]);
// };

exports.saveImage = (url, username, title, description) => {
    return db.query(
        `INSERT INTO images (url, username, title, description)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [url, username, title, description]
    );
};

/* ---------------------------------------------------------------
                    Comments TABLE
----------------------------------------------------------------*/

exports.getCommentByCardId = (id_image) => {
    return db.query(
        `SELECT * FROM comments 
        WHERE id_image = $1`,
        [id_image]
    );
};

exports.saveComment = (id_image, username, comment) => {
    return db.query(
        `INSERT INTO comments (id_image, username, comment)
        VALUES ($1, $2, $3) RETURNING *`,
        [id_image, username, comment]
    );
};
