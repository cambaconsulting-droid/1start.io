// services/service-identity/src/http/routes.ts

import { Router } from 'express';
import { execute as registerUser } from '../core/use-cases/register-user';

export const router = Router();

router.post('/api/auth/register', async (req, res) => {
  try {
    const user = await registerUser(req.body);
    return res.status(201).json({ message: 'User created successfully', user });
  } catch (error: any) {
    // Manejar errores específicos del caso de uso
    if (error.message.includes('already exists')) {
      return res.status(409).json({ message: error.message });
    }
    if (error.message.includes('are required')) {
      return res.status(400).json({ message: error.message });
    }
    // Error genérico
    console.error('Registration controller error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});