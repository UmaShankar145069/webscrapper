const needle = require("needle");
const mongodb = require("./mongodb/mongodb.connect");


async function main() {
    const mongoClient = await mongodb();
    const result = await needle(
        "get",
        "https://toifeeds.indiatimes.com/treact/feeds/toi/web/config/geoinfo?geo=UP",
        {
            header: {
                "user-Agent":
                     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537."
            }
        }

    );
    console.log(result.body);
    const NewsDB = mongoClient.db("News");
    const newsLists = NewsDB.collection("news-lists");
    await newsLists.insertMany(result.body);
}

main();