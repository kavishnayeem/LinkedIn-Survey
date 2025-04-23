import express from 'express';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import serverless from 'serverless-http';
import dotenv from 'dotenv';
import submissionRouter from './route/submission.js';
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});


dotenv.config();

const app = express();

// Update allowedOrigins to match your actual frontend URL
const allowedOrigins = [
  'https://linkedin-survey.vercel.app', // Main frontend URL
  'https://linkedin-survey-git-main-lakshya-singhs-projects.vercel.app', // Vercel preview URLs
  'http://localhost:3000'
];

// Add OPTIONS method handling
app.options('*', cors());
app.use('/api/submit', submissionRouter);
app.use(cors({
  origin: allowedOrigins,
  methods: ['POST', 'GET'],
  credentials: true
}));

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Middleware
app.use(express.json());

// Routes
app.post('/api/submit', async (req, res) => {
  const { userId, profileId, responses } = req.body;
  const { quality, ...otherResponses } = responses;

  const { data, error } = await supabase
    .from('submissions')
    .insert([{
      user_id: userId,
      profile_id: profileId,
      quality,
      ...otherResponses
    }]);

  if (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database error' });
  }

  res.json(data);
});

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
        quality: parseInt(data.quality)
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ valid: false, error: 'Server error' });
  }
});

// 👇 This is what Vercel needs
export default serverless(app);
