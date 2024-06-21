import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const dbFile = './db.json';

// Initialize db.json if it doesn't exist
if (!fs.existsSync(dbFile)) {
  fs.writeFileSync(dbFile, JSON.stringify([]));
}

app.get('/ping', (req: Request, res: Response) => {
  res.json(true);
});

app.post('/submit', (req: Request, res: Response) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;
  const submissions = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
  submissions.push({ name, email, phone, github_link, stopwatch_time });
  fs.writeFileSync(dbFile, JSON.stringify(submissions));
  res.status(200).json({ message: 'Submission successful' });
});

app.get('/read', (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string, 10);
  const submissions = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
  if (index >= 0 && index < submissions.length) {
    res.json(submissions[index]);
  } else {
    res.status(404).json({ message: 'Submission not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
