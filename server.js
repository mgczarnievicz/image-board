const PORT = 8080;

const express = require("express");
const app = express();

const { getAllImages } = require("./db.js");

app.use(express.static("./public"));

app.use(express.json());

app.get("/board", (req, res) => {
    console.log("/board route has benn hits!");
    getAllImages().then((result) => {
        console.log("result.rows", result.rows);
        res.json(result.rows);
    });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(PORT, () =>
    console.log(
        `\t Server is lisening on port ${PORT}\n\t http://localhost:${PORT}/\n`
    )
);
