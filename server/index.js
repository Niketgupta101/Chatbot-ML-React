import express from 'express';
import bodyParser from 'body-parser';

const app = express(); 

import cors from 'cors';
app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

import DataRoutes from './routes/DataRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
app.use('/data', DataRoutes);
app.use('/users', UserRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`listening at port : ${PORT}`);
})