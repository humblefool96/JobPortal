var CronJob = require('cron').CronJob;
var fetchGithub = require('./task/fetch-github');

var job = new CronJob('* * * * *', fetchGithub, null, true, 'America/Los_Angeles');

job.start();