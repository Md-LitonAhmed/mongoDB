const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const ObjectId = require("mongodb").ObjectId;
//MongoDB Atlas connections string
// const uri ="mongodb+srv://SayedDB:c9AdqrSuj3vSRnDi@cluster0.hvrydg3.mongodb.net/?retryWrites=true&w=majority";

const uri =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const myCollection = client.db("School").collection("Students");

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

async function insert() {
  await client.connect();
  const myCollection2 = client.db("School").collection("Students");
  const myData = {
    name: "Ayan",
    Roll: "109",
    class: "10",
    age: "29",
    city: "Rangpur",
  };
  myCollection2.insertOne(myData).then((result) => {
    console.log("My Data is added");
  });
}
// insert();

async function deleteData() {
  await client.connect();
  const myCollection2 = client.db("School").collection("Students");
  const myDeleteData = { Roll: "101" };
  myCollection2.deleteOne(myDeleteData).then((result) => {
    console.log("One Data deleted where roll equal to 101");
  });
}
// deleteData();

async function deleteAll() {
  await client.connect();
  const myCollection = client.db("School").collection("Students");
  myCollection.deleteMany().then((result) => {
    console.log(result);
  });
}
// deleteAll();

function findData() {
  const mydataBase = client.db("School");
  const myCollection = mydataBase.collection("Students");
  var FindObj = { Roll: "103" };
  myCollection.findOne(FindObj).then((result) => {
    console.log(result);
  });
}
// findData();

function FindAll() {
  const myCollection = client.db("School").collection("Students");
  myCollection
    .find()
    .toArray()
    .then((result) => {
      console.log(result);
    });
}
// FindAll();

function FindDataByProjection() {
  const myCollection = client.db("School").collection("Students");
  var itemObj = {};
  var ItemProjection = { projection: { Roll: 1, name: 1 } };
  myCollection
    .find(itemObj, ItemProjection)
    .toArray()
    .then((result) => {
      console.log(result);
    });
}
// FindDataByProjection();

function FindDataByQuery() {
  const myCollection = client.db("School").collection("Students");
  var query = { city: "Dhaka", class: "12" };
  myCollection
    .find(query)
    .toArray()
    .then((result) => {
      console.log(result);
    });
}
// FindDataByQuery();

function FindDataByLimit() {
  const myCollection = client.db("School").collection("Students");
  myCollection
    .find()
    .limit(3)
    .toArray()
    .then((result) => {
      console.log(result);
    });
}
// FindDataByLimit();

function FindDataBySort() {
  const myCollection = client.db("School").collection("Students");
  myCollection
    .find()
    .sort({ Roll: 1 })
    .toArray()
    .then((result) => {
      console.log(result);
    });
}
// FindDataBySort();

function UpdateData() {
  const myCollection = client.db("School").collection("Students");
  var MyQuery = { Roll: "101" };
  var setValue = { $set: { name: "Abu Sayed" } };
  myCollection.updateOne(MyQuery, setValue).then((result) => {
    console.log(result);
  });
}
// UpdateData();

function CreateCollection() {
  const myDB = client.db("School");
  myDB.createCollection("Teacher").then((result) => {
    console.log("Teacher Collection is Created ");
  });
}
// CreateCollection();

async function readWrite() {
  await client.connect();
  const myCollection = client.db("School").collection("Teachers");

  app.get("/readData", (req, res) => {
    myCollection
      .find()
      .toArray()
      .then((result) => {
        console.log(result);
        res.send(result);
      });
  });

  app.post("/addData", (req, res) => {
    const info = req.body;
    console.log(info);
    myCollection.insertOne(info).then((result) => {
      console.log("Informations Of Teacher are added");
      res.redirect("/");
    });
  });

  app.get("/data/:id", (req, res) => {
    myCollection
      .find({ _id: ObjectId(req.params.id) })
      .toArray((err, documents) => {
        res.send(documents[0]);
      });
  });
  // app.delete("/delete/:id", (req, res) => {
  // console.log(req.params.id);
  //   myCollection.deleteOne({ _id: ObjectId(req.params.id) }).then((result) => {
  //     console.log(result);
  // });
  //   myCollection.deleteOne({ _id: ObjectId(req.params.id) }).then((result) => {
  //     console.log(result);
  //   });
  // });

  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = myCollection.deleteOne(query);
    res.send(result.deletedCount > 0);
  });
}
readWrite();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  // res.send("Hello I am working");
});

app.listen(3000);
