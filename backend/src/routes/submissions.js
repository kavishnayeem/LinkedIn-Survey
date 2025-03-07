import express from 'express';
import { query } from '../config/db.js';

const router = express.Router();

// Create submission
router.post('/', async (req, res) => {
  try {
    const { userId, profileId, responses } = req.body;
    
    const result = await query(
      `INSERT INTO submissions 
      (user_id, profile_id, clarity, professionalism, completeness, skills, overall)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        userId,
        profileId,
        responses.clarity,
        responses.professionalism,
        responses.completeness,
        responses.skills,
        responses.overall
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get submissions by user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await query(
      'SELECT * FROM submissions WHERE user_id = $1',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;