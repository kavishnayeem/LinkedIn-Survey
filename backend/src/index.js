import express from 'express';
import cors from 'cors';
import { query } from './config/db.js';
import submissionRoutes from './routes/submissions.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/submissions', submissionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});