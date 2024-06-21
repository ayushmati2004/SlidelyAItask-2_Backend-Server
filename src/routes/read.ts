import { Router, Request, Response } from 'express';
import { readFileSync } from 'fs';
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

router.get('/', (req: Request, res: Response) => {
  const { index } = req.query;

  if (index === undefined || isNaN(Number(index))) {
    return res.status(400).json({ error: 'Index query parameter is required and must be a number' });
  }

  let submissions: Submission[] = [];
  try {
    submissions = JSON.parse(readFileSync(dbFilePath, 'utf8'));
  } catch (err) {
    // file does not exist or is empty
    return res.status(404).json({ error: 'No submissions found' });
  }

  const idx = Number(index);
  if (idx < 0 || idx >= submissions.length) {
    return res.status(404).json({ error: 'Submission not found' });
  }

  res.json(submissions[idx]);
});

export default router;
