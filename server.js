const PORT = 8080;

const express = require("express");
const app = express();
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");

const { getAllImages, saveImage } = require("./db.js");

app.use(express.static("./public"));

app.use(express.json());

// This to be able to grab from the form.
// This will only work if the form is encritped as urlencoded.
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "uploads");
    },
    filename(req, file, callback) {
        // const randomFileName =
        //  how to keep the extention
        uidSafe(24).then((randomString) => {
            callback(null, `${randomString}${path.extname(file.originalname)}`);
        });
    },
});

const uploader = multer({
    storage,
    limits: {
        fileSize: 2097155,
    },
});

app.use((req, res, next) => {
    console.log("---------------------");
    console.log("req.url:", req.url);
    console.log("req.method:", req.method);
    console.log("req.session:", req.session);
    console.log("---------------------");
    next();
});
//

// app.use(express.multipartFormData());

app.get("/board", (req, res) => {
    console.log("/board route has benn hits!");
    getAllImages().then((result) => {
        console.log("result.rows", result.rows);
        res.json(result.rows);
    });
});

// uploader.single("image") imgae is the name of the input filed.
app.post("/upload", uploader.single("image"), s3.upload, (req, res) => {
    console.log(
        "-----------------------------------------------------------------------------"
    );
    console.log("In upLoadeing");
    // console.log("req.body:", req.body);
    // console.log("req.file:", req.file);

    const { title, user } = req.body;
    const url = `https://s3.amazonaws.com/spicedling/${req.file.filename}`;

    // we need to generate the url of the image.
    // spicedling/
    // https://s3.amazonaws.com/:yourBucketName/:filename

    // console.log(`https://s3.amazonaws.com/spicedling/${req.file.filename}`);

    console.log(`\t title: ${title}\n\t user: ${user} \n\t url: ${url}`);

    // Aca solo puedo validar el titulo y el usario pq no tengo acceso al archivo
    // if (!req.body.title) {
    //     return res.json({ error: "Missinf Field title" });
    // }
    // res.json({ success: true });

    saveImage(url, user, title)
        .then((result) => {
            console.log("result.rows[0]", result.rows[0]);
            res.json({
                success: true,
                image: result.rows[0],
            });
        })
        .catch((err) => console.log("err db", er));

    // res.json({ tempAnswer: true });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(PORT, () =>
    console.log(
        `\t Server is lisening on port ${PORT}\n\t http://localhost:${PORT}/\n`
    )
);
