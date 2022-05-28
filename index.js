const express = require('express');
var cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


//manufacturer_admin
//MRv8C5rekVSSNtd3





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.79mhp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {

        await client.connect()
        console.log('database connected');

        const productCollection = client.db("manufacturer-website").collection("products")
        const purchaseCollection = client.db("manufacturer-website").collection("purchase")


        app.get('/products', async (req, res) => {

            const query = {}
            const cursor = productCollection.find(query);
            const services = await cursor.toArray()
            res.send(services)

        })

        app.get('/products/:id', async (req, res) => {
            // console.log(req.params.id)
            // res.send(req.params.id)
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            console.log(query);
            const result = await productCollection.findOne(query)

            res.send(result)
        })

        app.post('/purchase', async (req, res) => {

            const orderData = req.body
            const result = await purchaseCollection.insertOne(orderData)
            res.send(result)

        })



    }

    finally {


    }

}

run().catch(console.dir);



app.listen(port, () => {
    console.log('listning to port', port);
})