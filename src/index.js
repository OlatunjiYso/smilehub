import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import "regenerator-runtime/runtime";

import authHandler from './routes/auth';
import registrationHandler from './routes/registration';

const app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/register', registrationHandler);
app.use('/auth', authHandler);



app.listen(8000, () => {
  console.log("server running on localhost:5556");
});
