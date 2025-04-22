import express from 'express';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: 'https://linkedin-survey.vercel.app/', // Your frontend URL
  methods: ['POST', 'GET'],
  credentials: true
}));
const port = process.env.PORT || 5000;

// Connect to the database using URI
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.use(express.json());



// Submission endpoint
app.post('/api/submit', async (req, res) => {
  const { userId, profileId, responses } = req.body;

  // Ensure quality is included in the submission
  const { quality, ...otherResponses } = responses; // Destructure quality from responses

  // Insert new submission
  const { data, error } = await supabase
    .from('submissions')
    .insert([{
      user_id: userId,
      profile_id: profileId,
      quality: quality, // Include quality in the insert
      ...otherResponses // Spread the rest of the responses
    }]);

  if (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database error' });
  }
  res.json(data);
});
// Add login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { userId } = req.body;
    const cleanUserId = userId.trim().toLowerCase();

    const { data, error } = await supabase
      .from('users')
      .select('user_id, quality')
      .ilike('user_id', cleanUserId)
      .maybeSingle();

    if (error || !data) {
      return res.status(401).json({ valid: false, error: 'Invalid credentials' });
    }

    res.json({ 
      valid: true,
      user: {
        user_id: data.user_id,
        quality: parseInt(data.quality) // Ensure quality is returned as an integer
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ valid: false, error: 'Server error' });
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});