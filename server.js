// requiring the modules
const express = require("express");
const app = express();
const port = 4000;
const hostname = "localhost";
const mongodb = require("mongodb");

var mongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectId;

app.set('view engine', 'ejs');
app.use("/public",express.static(__dirname + "/public"));

const formidableMiddleware = require("express-formidable");
app.use(formidableMiddleware());

const requestModule = require("request");
const cheerio = require("cheerio");

var htmlspecialchars = require("htmlspecialchars");
var HTMLParser = require("node-html-parser");
const { response } = require("express");

var io = require("socket.io")(http, {
    "cors": {
        "origin": "*"
    }
});

var database = null;

function crawlPage(url, callBack = null){
    var pathArray = url.split("/");
    var protocal = pathArray[0];
    var host = pathArray[2];
    var baseUrl = protocal + "//" + host;

    io.emit("crawl_update", "Crawling page: " + url);

    requestModule(url, async function(error,res,html){
        if(!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            var page = await database.collection("page").findOne({
                "url": url
            });
            if(page == null){
                var html = $.html();
                var htmlContent = HTMLParser.parse(html);

                var allAnchors = htmlContent.querySelectorAll("a");
                var anchors = [];
                for( var a = 0; a < allAnchors.length; a++){
                    var href = allAnchors[a].getAttribute("href");
                    var title = allAnchors[a].innerHTML;

                    var hasAnyChildTag = (allAnchors[a].)
                }
            }
        }
    })
}


app.listen(port, hostname, () => {
        console.log("Server is running on " + hostname + ":" + port);

        mongoClient.connect("mongodb://localhost:27017", {
            // useNewUrlParser: true, useUnifieldTopology: true
        }, function (err, client) {
            if(err){
                throw err;
            }
            database = client.db("web_crawler");
            console.log("database connected");

            app.post("/crawl-page", async function (req,res){
                var url = req.fields.url;
                crawlPage(url);

                res.jaon({
                    "status": "success",
                    "message": "page crawled",
                    "url": url
                });
            });

            app.get("/", async function(req, res) {
                res.render("index");
            });
        });
});
















// mongoose.connect("mongodb+srv://umashankar:8726160693a@cluster0.yvfwu.mongodb.net/NewsDB?retryWrites=true&w=majority",
//    { useNewUrlParser: true, useUnifieldTopology: true})
//    .then(
//        app.listen(port, hostname, () => {
//            console.log("Server is running on " + hostname + ":" + port);
//        })
//    ).catch(err => console.log(err));