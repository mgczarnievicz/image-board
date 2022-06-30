const aws = require("aws-sdk");
const fs = require("fs");

let secrets;

if (process.env.NODE_ENV === "production") {
    secrets = process.env;
} else {
    secrets = require("./secrets.json");
}

/*  Create an intance of an AWS user. (is just an object)
That give us a bunch of methods to communication 
and interacr with our s3 cloud storage that amazon calls buckets
*/

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_ID,
    secretAccessKey: secrets.AWS_SECRET,
});

module.exports.upload = (req, res, next) => {
    // We valid that we have a file.
    // console.log("in S3 req", req);
    if (!req.file) {
        console.log("no file on reques");
        return req.sendStatus(500);
    }
    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "spicedling",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            console.log("yay it worked our image is in the ☁️");

            next();

            // para borra la imagen de la carperta temporal
            fs.unlink(path, () => {});
        })
        .catch((err) => {
            console.log("Ups, sth went wrong!");
            return res.sendStatus(500);
        });
};
