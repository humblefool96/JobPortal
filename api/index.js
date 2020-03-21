var express = require('express');
var app = express();
const port = 3001;

const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);


app.get('/jobs', async(req, res) => {

    const jobs = await getAsync('github');
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    console.log(JSON.parse(jobs).length);
    return res.send(jobs);
});

app.listen(port, () => console.log(`example express app listening at ${port}!`));