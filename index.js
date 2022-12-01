const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mhsbjhf.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const dataCollection = client.db('blackCoffer').collection('data');

    app.get('/data', async (req, res) => {
      const query = {};
      const cursor = dataCollection.find(query);
      const categories = await cursor.toArray();
      res.send(categories);
    });
  } finally {
  }
}

run().catch((err) => {
  console.error(err);
});

app.get('/', (req, res) => {
  res.send('Graph Chart Server is Running.');
});

app.listen(port, () => {
  console.log(`Graph Chart server running on: ${port} `);
});
