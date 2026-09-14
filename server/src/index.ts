import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './db/database.js';
import { apiRouter } from './routes/apiRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRouter);

function startServer(port: number) {
  const server = app.listen(port, () => {
    console.log(`=======================================================`);
    console.log(`🚀 Converge Backend Server Live on http://localhost:${port}`);
    console.log(`🏛️ Govt of Maharashtra Procurement & Sandbox Portal API`);
    console.log(`=======================================================`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Port ${port} is in use, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Failed to launch Converge backend server:', err);
    }
  });
}

try {
  initDatabase();
  startServer(Number(PORT));
} catch (error) {
  console.error('Failed to initialize database:', error);
  process.exit(1);
}
