const fs = require('fs').promises;
const path = require('path');
const { CronJob } = require('cron');
const fetch = require('node-fetch');

const fileUrl = path.resolve(__dirname, '../static/users.json');
let page = 1;

const job = new CronJob('0 */1 * * * *', async () => {
  console.log('hi');
  const response = await fetch(`https://reqres.in/api/users?page=${page}`);
  const json = await response.json();
  console.log(json);

  await fs.appendFile(fileUrl, JSON.stringify(json.data), '');
  
  ++page;
});

console.log('startuem');
job.start();