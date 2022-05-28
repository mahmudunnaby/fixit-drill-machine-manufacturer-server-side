const express = require('express');
var cors = require('cors');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('hey there!hlwwww')
})

app.listen(port, () => {
    console.log('listning to port', port);
})