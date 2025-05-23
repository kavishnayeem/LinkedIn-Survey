import express from 'express';
import { supabase } from '../config/db.js'; // Fixed import

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userId, profileId, responses } = req.body;
    const { quality, ...otherResponses } = responses; // Add quality extraction

    // Check existing submission
    const { count } = await supabase
      .from('submissions')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .eq('profile_id', profileId);

    if (count > 0) return res.status(409).json({ error: 'Already submitted' });

    // Insert new submission
    const { data, error } = await supabase
      .from('submissions')
      .insert([{
        user_id: userId,
        profile_id: profileId,
        quality, // Add quality here
        ...otherResponses
      }]);

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;