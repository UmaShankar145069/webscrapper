const mongodb = require("mongodb").MongoClient;

const connectionString = "mongodb+srv://uma:8726160693a@cluster0.zvklb.mongodb.net/NewsDB?retryWrites=true&w=majority";

async function connect() {
    try{
        const client = await mongodb.connect(connectionString,{useNewUrlParser: true});
        console.log("connected to mongodb");
        return client;
    }catch(err) {
        console.error(err);
    }
}

module.exports = connect;
