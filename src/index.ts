import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import pingRoute from './routes/ping';
import submitRoute from './routes/submit';
import readRoute from './routes/read';
import deleteRoute from './routes/delete';


const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/ping', pingRoute);
app.use('/submit', submitRoute);
app.use('/read', readRoute);
app.use('/delete', deleteRoute);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
