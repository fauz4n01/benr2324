require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const routes = require('./routes/routes');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB URI and Client Setup
const uri = "mongodb+srv://fauzan:lmaolmao@fauzan.1ml0u5f.mongodb.net/?retryWrites=true&w=majority&appName=fauzan";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// MongoDB Connection
async function connectToMongoDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    app.locals.db = client.db('quiz_game'); // Make the database accessible to route handlers
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit if there's a connection error
  }
}

// Use Routes
app.use('/api', routes);

// Start Server After Connecting to MongoDB
connectToMongoDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
