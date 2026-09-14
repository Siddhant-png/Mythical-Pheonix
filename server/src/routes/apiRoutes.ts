import { Router, Request, Response } from 'express';
import {
  getProblems,
  getProblemById,
  getUserInterests,
  updateUserInterests,
  getPilots
} from '../db/database.js';

export const apiRouter = Router();

// Health Check
apiRouter.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    server: 'Converge Express API Server (Govt of Maharashtra)',
    timestamp: new Date().toISOString()
  });
});

// GET /api/problems - List all problem statements
apiRouter.get('/problems', (req: Request, res: Response) => {
  try {
    const { sector, status } = req.query;
    const problems = getProblems(
      typeof sector === 'string' ? sector : undefined,
      typeof status === 'string' ? status : undefined
    );
    res.json({ success: true, count: problems.length, data: problems });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/problems/:id - Single problem detail
apiRouter.get('/problems/:id', (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const problem = getProblemById(id);
    if (!problem) {
      return res.status(404).json({ success: false, error: 'Problem statement not found' });
    }
    res.json({ success: true, data: problem });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/user/interests - Fetch selected interest IDs
apiRouter.get('/user/interests', (_req: Request, res: Response) => {
  try {
    const selectedInterestIds = getUserInterests('default_user');
    res.json({ success: true, selectedInterestIds });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/user/interests - Update user selected interest IDs
apiRouter.post('/user/interests', (req: Request, res: Response) => {
  try {
    const { selectedInterestIds } = req.body;
    if (!Array.isArray(selectedInterestIds)) {
      return res.status(400).json({ success: false, error: 'selectedInterestIds must be an array' });
    }

    const updated = updateUserInterests('default_user', selectedInterestIds);
    res.json({ success: true, selectedInterestIds: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/pilots - Sandbox testbeds
apiRouter.get('/pilots', (_req: Request, res: Response) => {
  try {
    const pilots = getPilots();
    res.json({ success: true, count: pilots.length, data: pilots });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
