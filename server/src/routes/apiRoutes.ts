import { Router, Request, Response } from 'express';
import {
  getProblems,
  getProblemById,
  getUserInterests,
  updateUserInterests,
  getPilots, registerUser, authenticateUser, createPasswordReset, resetPassword
} from '../db/database.js';

export const apiRouter = Router();

apiRouter.post('/auth/register', (req: Request, res: Response) => { try { const { name, email, password, role = 'citizen' } = req.body; if (!name || !email || typeof password !== 'string' || password.length < 8) return res.status(400).json({ success: false, error: 'Name, email, and an 8-character password are required.' }); res.status(201).json({ success: true, user: registerUser({ name, email, password, role }) }); } catch (err: any) { res.status(400).json({ success: false, error: err.message }); } });
apiRouter.post('/auth/login', (req: Request, res: Response) => { const user = authenticateUser(req.body.email || '', req.body.password || ''); if (!user) return res.status(401).json({ success: false, error: 'Email or password is incorrect.' }); res.json({ success: true, user }); });
apiRouter.post('/auth/request-reset', (req: Request, res: Response) => { createPasswordReset(req.body.email || ''); res.json({ success: true, message: 'If an account exists, a reset code has been sent.' }); });
apiRouter.post('/auth/reset-password', (req: Request, res: Response) => { try { const { email, code, password } = req.body; if (typeof password !== 'string' || password.length < 8) return res.status(400).json({ success: false, error: 'Use a password with at least 8 characters.' }); res.json({ success: true, user: resetPassword(email || '', code || '', password) }); } catch (err: any) { res.status(400).json({ success: false, error: err.message }); } });

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
