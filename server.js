const PORT = process.env.PORT || 8080;

const express = require("express");
const app = express();
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");

const {
    getAllImages,
    saveImage,
    getCardById,
    getMoreImages,
    saveComment,
    getCommentByCardId,
} = require("./db.js");

app.use(express.static("./public"));

app.use(express.json());

// This to be able to grab from the form.
// This will only work if the form is encrypted as urlencoded.
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "uploads");
    },
    filename(req, file, callback) {
        // const randomFileName =
        //  how to keep the extension
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

/* -------------------------------------------------------
                        GET
--------------------------------------------------------*/

app.get("/board", (req, res) => {
    console.log("/board route has been hits!");
    getAllImages().then((result) => {
        // console.log("result.rows", result.rows);
        res.json(result.rows);
    });
});

app.get("/getCard/:id", (req, res) => {
    console.log(
        `-----------------------------------------------------------------------------\n\t Get Card id: ${req.params.id}`
    );

    getCardById(req.params.id)
        .then((result) => {
            let imageCard;

            if (result.rows.length != 0) {
                imageCard = result.rows[0];
                console.log("result.rows", result.rows);
                imageCard.created_at =
                    result.rows[0].created_at.toLocaleString("en-GB");
            }

            res.json({ img: imageCard });
        })
        .catch((err) => console.log("Error getCardByIs", err));
});

app.get("/moreImage/:lowestId", (req, res) => {
    console.log(
        `-----------------------------------------------------------------------------\n\t More Image`
    );

    console.log("req.params.lowestId:", req.params.lowestId);
    getMoreImages(req.params.lowestId)
        .then((result) => {
            console.log("result.rows[]:", result.rows);
            res.json(result.rows);
        })
        .catch((err) => console.log("Error getCardByIs", err));
});

app.get("/getComments/:cardId", (req, res) => {
    getCommentByCardId(req.params.cardId)
        .then((result) => {
            console.log(
                `-----------------------------------------------------------------------------\n\t Get Comment Id: ${req.params.cardId}`
            );
            console.log("Result.rows", result.rows);

            result.rows.map(
                (each) =>
                    (each.created_at = each.created_at.toLocaleString("en-GB"))
            );
            console.log("Seeing the comments to send", result.rows);
            res.json(result.rows);
        })
        .catch((err) => err);
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

/* -------------------------------------------------------
                        POST
--------------------------------------------------------*/

app.post("/addComment", (req, res) => {
    console.log(
        `-----------------------------------------------------------------------------\n\t Adding Comments`
    );
    console.log("req.body", req.body);
    const { user, comment, cardId } = req.body;

    // Add Comments
    saveComment(cardId, user, comment)
        .then((result) => {
            console.log("result.rows[]:", result.rows);

            result.rows.map(
                (each) =>
                    (each.created_at = each.created_at.toLocaleString("en-GB"))
            );

            res.json(result.rows);
        })
        .catch((err) => console.log("Error getCardByIs", err));
});

// uploader.single("image") image is the name of the input filed.
app.post("/upload", uploader.single("image"), s3.upload, (req, res) => {
    console.log(
        `-----------------------------------------------------------------------------\n\t UpLoading Image`
    );

    /* NOTE: 
    Upload the image in AWS and then, ones we know that is uploaded we save it in our date base
     with the url to be able to display it later. */

    const { title, user, description } = req.body;
    // If I use the other credentials
    // const url = `https://s3.amazonaws.com/spicedling/${req.file.filename}`;
    const url = `https://imageboard-cy.s3.eu-central-1.amazonaws.com/${req.file.filename}`;

    // we need to generate the url of the image.
    // https://s3.amazonaws.com/:yourBucketName/:filename
    // https://:yourBucketName.s3.eu-central-1.amazonaws.com/:filename.

    console.log(
        `\t title: ${title}\n\t user: ${user} \n\t description ${description} \n\t url: ${url}`
    );

    saveImage(url, user, title, description)
        .then((result) => {
            console.log("result.rows[0]", result.rows[0]);
            res.json({
                success: true,
                image: result.rows[0],
            });
        })
        .catch((err) => console.log("err db", er));
});

app.listen(PORT, () =>
    console.log(
        `\t Server is listening on port ${PORT}\n\t http://localhost:${PORT}/\n`
    )
);
