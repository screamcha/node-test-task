import { promises as fs } from 'fs';
import * as path from 'path';
import { CronJob } from 'cron';
import fetch, { Response as FetchResponse } from 'node-fetch';
import { UserData, UserResponseCron } from './interfaces';

const FILE_URL = path.resolve(__dirname, '../static/users.json');
let page = 1

const job = new CronJob('0 */1 * * * *', async () => {
  const requestUrl: RequestInfo = `https://reqres.in/api/users?page=${page}`;
  const response: FetchResponse = await fetch(requestUrl);
  const responseJson: UserResponseCron = await response.json();

  const fileHandle = await fs.open(FILE_URL, 'a+');
  const fileContent: Buffer = await fileHandle.readFile();
  let oldUsers: Array<UserData> = [];
  console.log(fileContent);

  if (fileContent.length) {
    oldUsers = JSON.parse(fileContent.toString('utf8'));
  }

  const newFileContent = [...oldUsers, ...responseJson.data];

  await fileHandle.write(JSON.stringify(newFileContent), 0);
  await fileHandle.close();

  ++page;
});

job.start();