const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://SayedDB:c9AdqrSuj3vSRnDi@cluster0.hvrydg3.mongodb.net/?retryWrites=true&w=majority";

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

// function FindDataByQuery() {
//   const myCollection = client.db("School").collection("Students");
//   var query = { city: "Dhaka", class: "12" };
//   myCollection
//     .find(query)
//     .toArray()
//     .then((result) => {
//       console.log(result);
//     });
// }
// FindDataByQuery();

// function FindDataByLimit() {
//   const myCollection = client.db("School").collection("Students");
//   myCollection
//     .find()
//     .limit(3)
//     .toArray()
//     .then((result) => {
//       console.log(result);
//     });
// }
// FindDataByLimit();

// function FindDataBySort() {
//   const myCollection = client.db("School").collection("Students");
//   myCollection
//     .find()
//     .sort({ Roll: 1 })
//     .toArray()
//     .then((result) => {
//       console.log(result);
//     });
// }
// FindDataBySort();

function UpdateData() {
  const myCollection = client.db("School").collection("Students");
  var MyQuery = { Roll: "101" };
  var setValue = { $set: { name: "Abu Sayed" } };
  myCollection.updateOne(MyQuery, setValue).then((result) => {
    console.log(result);
  });
}
UpdateData();
