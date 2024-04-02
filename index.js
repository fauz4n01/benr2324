const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/', (req, res) => {
  res.send('bruh lol')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://fauzan:lmaolmao@fauzan.1ml0u5f.mongodb.net/?retryWrites=true&w=majority&appName=fauzan";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    let result = await client.db('testing').collection('test 2').insertOne(
      {
        subject: 'BERR 2233',
        description: 'Computer Organizations and Architecture',
        code: 'BERR 2233',
        credit: 2
      }
    )
    console.log(result)

    let subjects = await client.db('testing').collection('test 2').find().toArray()
    console.log(subjects)

    let updated = await client.db('testing').collection('test 2').updateOne(
      {code: 'BERR 2233'},
      {
        $set: {
          lecturer:'Dr. Fayeez',
          semester: 4
        }
      }
    )
    console.log(updated)

    let deleted = await client.db('testing').collection('test 2').deleteOne(
      {
        _id: new ObjectId('660b649a83d6eae8a2aea014')
      }
    )
    console.log(deleted)

  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);
