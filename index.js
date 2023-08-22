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
    const myData = {
      name: "Liton",
      Roll: "101",
      class: "12",
      age: "19",
      city: "Dhaka",
    };
    myCollection.insertOne(myData).then((result) => {
      console.log("My Data added");
    });
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
    name: "Sayed",
    Roll: "102",
    class: "12",
    age: "20",
    city: "Barishal",
  };
  myCollection2.insertOne(myData).then((result) => {
    console.log("My Data 2 added");
  });
}
// insert();

async function deleteData() {
  await client.connect();
  const myCollection2 = client.db("School").collection("Students");
  const myDeleteData = { Roll: "102" };
  myCollection2.deleteMany(myDeleteData).then((result) => {
    console.log("One Data deleted where roll equal to 102");
  });
}
deleteData();
