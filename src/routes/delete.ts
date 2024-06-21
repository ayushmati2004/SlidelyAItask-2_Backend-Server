import { Router, Request, Response } from 'express';
import { writeFileSync, readFileSync } from 'fs';
import path from 'path';

const router = Router();
const dbFilePath = path.join(__dirname, '../db/db.json');

router.delete('/:index', (req: Request, res: Response) => {
  const index = parseInt(req.params.index);

  if (isNaN(index)) {
    return res.status(400).json({ error: 'Invalid index' });
  }

  let submissions = [];
  try {
    submissions = JSON.parse(readFileSync(dbFilePath, 'utf8'));
  } catch (err) {
    return res.status(500).json({ error: 'Failed to read submissions' });
  }

  if (index < 0 || index >= submissions.length) {
    return res.status(404).json({ error: 'Submission not found' });
  }

  submissions.splice(index, 1);
  writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2));

  res.status(200).json({ success: true, message: 'Submission deleted successfully' });
});

export default router;
