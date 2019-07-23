import express = require('express');
import userRouter from './routes';

const app: express.Application = express();

app.use('/api/user', userRouter);

app.listen(3000, () => {
  console.log('server is running on port: ', 3000);
})