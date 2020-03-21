var fetch = require('node-fetch');

const redis = require("redis");
const client = redis.createClient();

//Node Redis currently doesn't natively support promises (this is coming in v4), 
// however you can wrap the methods you want to use with promises using the built-in Node.js util.promisify
const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);


const baseUrl = 'https://jobs.github.com/positions.json';

async function fetchGithub() {

    var resultCount = 1, onPage = 0;
    var alljobs = [];

    //fetch all job pages
    while(resultCount > 0) {
        const res = await fetch(`${baseUrl}?page=${onPage}`);
        const jobs = await res.json();
        resultCount = jobs.length;
        alljobs.push(...jobs);
        //console.log({jobs});
        console.log('got', jobs.length, 'jobs');
        onPage++;
    }
    console.log('got', alljobs.length, 'jobs page');

    //filter algo
    const jrJobs = alljobs.filter( job => {
        const jobTitle = job.title.toLowerCase();

        if(
            jobTitle.includes('senior') ||
            jobTitle.includes('manager') ||
            jobTitle.includes('sr') ||
            jobTitle.includes('architect')
        ) {
            return false;
        }
        return true;
    })
    console.log('filtered down to', jrJobs.length);

    //set in redis
    const success = await setAsync('github', JSON.stringify(jrJobs));

    console.log({success});
}

// fetchGithub();

module.exports = fetchGithub;