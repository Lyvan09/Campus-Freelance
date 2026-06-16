import express from 'express';
import User from '../models/User.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Récupérer tous les recruteurs (en attente ou approuvés)
router.get('/recruiters', verifyToken, isAdmin, async (req, res) => {
  try {
    const recruiters = await User.find({ role: 'recruiter' }).select('-password');
    res.json(recruiters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approuver un recruteur
router.patch('/recruiters/:id/approve', verifyToken, isAdmin, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    ).select('-password');
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'Recruteur non trouvé' });
    }
    
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
