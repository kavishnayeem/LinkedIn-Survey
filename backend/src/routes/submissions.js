import express from 'express'
import supabase from '../supabaseClient.js'

const router = express.Router()

router.post('/', async (req, res) => {
    try {
      const { userId, profileId, responses } = req.body;
      
      // Validate input
      if (!userId || !profileId || !responses) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Insert submission
      const { data, error } = await supabase
        .from('submissions')
        .insert([{
          user_id: userId,
          profile_id: profileId,
          clarity: responses.clarity,
          professionalism: responses.professionalism,
          completeness: responses.completeness,
          skills: responses.skills,
          overall: responses.overall
        }]);
  
      if (error) {
        console.error('Supabase error:', error);
        return res.status(400).json({ error: error.message });
      }
  
      res.status(201).json(data[0]);
      
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

export default router