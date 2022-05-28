const express = require('express');
var cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

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



    }

    finally {


    }

}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('hey there!hlwwww')
})

app.listen(port, () => {
    console.log('listning to port', port);
})