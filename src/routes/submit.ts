import { Router, Request, Response } from 'express';
import { writeFileSync, readFileSync } from 'fs';
import path from 'path';

const router = Router();
const dbFilePath = path.join(__dirname, '../db/db.json');

interface Submission {
  name: string;
  email: string;
  phone: string;
  github_link: string;
  stopwatch_time: string;
}

router.post('/', (req: Request, res: Response) => {
  const { name, email, phone, github_link, stopwatch_time }: Submission = req.body;

  if (!name || !email || !phone || !github_link || !stopwatch_time) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  let submissions: Submission[] = [];
  try {
    submissions = JSON.parse(readFileSync(dbFilePath, 'utf8'));
  } catch (err) {
    // file does not exist or is empty
  }

  submissions.push({ name, email, phone, github_link, stopwatch_time });
  writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2));

  res.status(201).json({ success: true, message: 'Submission saved successfully' });
});

export default router;
