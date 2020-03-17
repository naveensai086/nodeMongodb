const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const uri =
  "mongodb+srv://naveen123:naveen123@cluster-01-y6yql.mongodb.net/demoDb?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.connect(err => {
  assert.equal(null, err);
  console.log("Connected successfully to mongodb server");
});
module.exports = { client: client };
