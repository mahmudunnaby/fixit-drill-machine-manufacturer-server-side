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
        const reviewCollection = client.db("manufacturer-website").collection("review")
        const userCollection = client.db("manufacturer-website").collection("users")


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
        app.get('/review', async (req, res) => {

            const query = {}
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray()
            res.send(reviews)
        })
        app.get('/user', async (req, res) => {

            const query = {}
            const cursor = userCollection.find(query);
            const users = await cursor.toArray()
            res.send(users)
        })
        app.put('/user/:email', async (req, res) => {
            const email = req.params.email
            const userData = req.body

            const filter = { email: email }
            const options = { upsert: true }
            const updateDoc = {
                $set: { userData },
            }
            const result = await userCollection.updateOne(filter, updateDoc, options)
            res.send(result)
        })


        app.post('/purchase', async (req, res) => {

            const orderData = req.body
            const result = await purchaseCollection.insertOne(orderData)
            res.send(result)

        })
        app.post('/products', async (req, res) => {

            const newProduct = req.body
            const result = await productCollection.insertOne(newProduct)
            res.send(result)

        })


        app.put('/user/admin/:email', async (req, res) => {
            const email = req.params.email

            const filter = { email: email }
            const updateDoc = {
                $set: { role: 'admin' },
            }
            const result = await userCollection.updateOne(filter, updateDoc)
            res.send(result)
        })


        app.get('/admin/:email', async (req, res) => {
            const email = req.params.email

            const user = await userCollection.findOne({ email: email })
            const isAdmin = user.role === 'admin'
            res.send({ admin: isAdmin })




        })

        app.put('/user/:email', async (req, res) => {
            const email = req.params.email
            const user = req.body
            const filter = { email: email }
            const options = { upsert: true }
            const updateDoc = {
                $set: user,
            }
            const result = await userCollection.updateOne(filter, updateDoc, options)
            res.send(result)

        })

        app.get('/purchase', async (req, res) => {


            const query = {}
            const cursor = purchaseCollection.find(query);
            const allPurchase = await cursor.toArray()
            res.send(allPurchase)

        })
        app.get('/purchase/:id', async (req, res) => {
            const id = req.params.id
            const query = { email: id }
            const cursor = purchaseCollection.find(query);
            const purchases = await cursor.toArray()
            res.send(purchases)

        })
        app.post('/review', async (req, res) => {

            const reviewData = req.body
            const result = await reviewCollection.insertOne(reviewData)
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