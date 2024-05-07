const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

app.use(express.json())

app.get('/user:id', async (req, res) => {
  // let auth = req.headers.authorization
  // console.log(auth)

  // let authSplitted = auth.split(' ')
  // console.log(authSplitted)

  // let token = authSplitted[1]
  // console.log(token)

  // let decoded = jwt.verify(token, 'cannothack');
  // console.log(decoded)

  if (req.identify._id != req.params.id) {
    res.status(401).send('Unauthorized Access')
  } else {
    let result = await client.db("testing").collection("test1").findOne({
      _id: new ObjectId(req.params.id)
    })
    res.send(result)
  }
})

//new user registration
app.post('/user', async (req, res) => {

  let existing = await client.db("testing").collection("test1").findOne(
    {
      username: req.body.username
    }
  )

  if (existing) {
    res.status(400).send("username already exist")
  } else {
    //insertOne the registration data to mongo
    const hash = bcrypt.hashSync(req.body.password, 10);

    let result = await client.db("testing").collection("test1").insertOne(
      {
        username: req.body.username,
        password: hash,
        name: req.body.name,
        email: req.body.email
      }
    )
    res.send(result)
  }
})

//user login api
app.post('/login', async (req, res) => {

  let result = await client.db("testing").collection("test1").findOne(
    {
      username: req.body.username
    }
  )

  if (result) {
    if(bcrypt.compareSync(req.body.password, result.password) == true) {
      var token = jwt.sign({ _id: result._id, username: result.username, name: result.name }, 
        'cannothack');
      res.send(token)
    } else {
      res.status(401).send("wrong password")
    }

  } else {
    res.status(401).send("username is not found")
  }

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

    // let result = await client.db('testing').collection('products').insertMany([
    //   {
    //     "_id": new ObjectId("617320a2452b071ad5b6e13a"),
    //     "name": "Apple MacBook Pro",
    //     "category": "Laptops",
    //     "brand": "Apple",
    //     "price": 1999.99,
    //     "in_stock": true
    //    },
    //    {
    //     "_id": new ObjectId("617320a2452b071ad5b6e13b"),
    //     "name": "Samsung Galaxy S21",
    //     "category": "Smartphones",
    //     "brand": "Samsung",
    //     "price": 899.99,
    //     "in_stock": true
    //    },
    //    {
    //     "_id": new ObjectId("617320a2452b071ad5b6e13c"),
    //     "name": "Sony Bravia 4K TV",
    //     "category": "Televisions",
    //     "brand": "Sony",
    //     "price": 1499.99,
    //     "in_stock": false
    //    }
    // ])
    // console.log(result)

    // let subjects = await client.db('testing').collection('test 2').find().toArray()
    // console.log(subjects)

    // let updated = await client.db('testing').collection('test 2').updateOne(
    //   {code: 'BERR 2233'},
    //   {
    //     $set: {
    //       lecturer:'Dr. Fayeez',
    //       semester: 4
    //     }
    //   }
    // )
    // console.log(updated)

    // let deleted = await client.db('testing').collection('test 2').deleteOne(
    //   {
    //     _id: new ObjectId('660b649a83d6eae8a2aea014')
    //   }
    // )
    // console.log(deleted)

  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)
  
  jwt.verify(token, "cannothack", (err, decoded) => {
    console.log(err)

    if (err) return res.sendStatus(403)
    
    req.identify = decoded

    next()
  })
}
run().catch(console.dir);
