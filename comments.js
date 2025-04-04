// Create web server
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log('Connected to database');
  } catch (err) {
    console.error(err);
  }
}

run();

// API to get comments
app.get('/comments', async (req, res) => {
  try {
    const db = client.db('commentsDB');
    const comments = await db.collection('comments').find().toArray();
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving comments');
  }
});