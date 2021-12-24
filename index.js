const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
var cors = require("cors");
const ObjectId =require('mongodb').ObjectId;
const port =process.env.PORT|| 5000;

app.use(cors());
app.use(express.json())

// id:  AmitDB  pass: OnocNlrr3B8oDXIG

// ------------------------

const uri =
  "mongodb+srv://AmitDB:OnocNlrr3B8oDXIG@cluster0.edo8t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Database One
async function run() {
  try {
    await client.connect();
    const database = client.db("insertDB");
    const haiku = database.collection("haiku");

    const Orderdatabase = client.db("orderDB");
    const order = Orderdatabase.collection("order");


    // Post API
    app.post('/users', async(req,res)=>{
      const newUser= req.body;

      const result=await haiku.insertOne(newUser)
      console.log('start', req.body);
      console.log('Add user-', result);
      res.send('Enter the point')
    })



    // Post API Order
    app.post('/order', async(req,res)=>{
      const newUser= req.body;

      const result=await order.insertOne(newUser)
      console.log('start', req.body);
      console.log('Add user-', result);
      res.send('Enter the point')
    })
    // Find API
    app.get('/users',async(req,res)=>{
      const cursor= haiku.find({});
      const users=await cursor.toArray();
      res.send(users);
    })
    // Find API
    app.get('/order',async(req,res)=>{
      const cursor= order.find({});
      const users=await cursor.toArray();
      res.send(users);
    })
    // Delete API

    app.delete('/users/:id',async(req,res)=>{
      const id= req.params.id;
      const query = {_id:ObjectId(id)};
      const result = await haiku.deleteOne(query)
      console.log('Deleteing id ', result);
      res.json(result)
    })
    // Delete API Order

    app.delete('/order/:id',async(req,res)=>{
      const id= req.params.id;
      const query = {_id:ObjectId(id)};
      const result = await order.deleteOne(query)
      console.log('Deleteing id ', result);
      res.json(result)
    })



    
  }
   finally {
    // await client.close();
  }
}
run().catch(console.dir);


//  ----------------------

const hendel = (req, res) => {
  res.send("Hello Node JS");
};

app.get("/", hendel);

app.listen(port, () => {
  console.log("listening to portv", port);
});



app.get("/user", (req, res) => {
  res.send("Hello 1200 world 2");
});

app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  const user = users[id];
  res.send(user);
});


