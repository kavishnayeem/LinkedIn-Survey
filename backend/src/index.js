import express from 'express';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
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

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { userId } = req.body;
  
  const { data, error } = await supabase
    .from('users')
    .select('user_id')
    .eq('user_id', userId)
    .single();

  if (error) return res.status(401).json({ error: 'Invalid user ID' });
  res.json({ user: data });
});

// Submission endpoint
app.post('/api/submit', async (req, res) => {
  const { userId, profileId, responses } = req.body;

  // Insert new submission
  const { data, error } = await supabase
    .from('submissions')
    .insert([{
      user_id: userId,
      profile_id: profileId,
      ...responses
    }]);

  if (error) return res.status(500).json({ error: 'Database error' });
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});