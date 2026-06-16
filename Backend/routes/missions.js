import express from 'express';
import Mission from '../models/Mission.js';
import Application from '../models/Application.js';
import { verifyToken, isRecruiter } from '../middleware/auth.js';

const router = express.Router();

// Route pour l'historique (Doit être placée avant /:id pour éviter les conflits)
router.get('/history', verifyToken, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // Construire le filtre de date
    const dateFilter = {};
    if (startDate) {
      dateFilter.$gte = new Date(startDate);
    }
    if (endDate) {
      dateFilter.$lte = new Date(endDate);
    }

    const query = { status: 'Pourvue' };
    
    // Si on a des filtres de date, on les applique sur updatedAt (date à laquelle la mission est passée 'Pourvue')
    if (Object.keys(dateFilter).length > 0) {
      query.updatedAt = dateFilter;
    }

    const missions = await Mission.find(query).sort({ updatedAt: -1 });
    res.json(missions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Récupérer toutes les missions ouvertes
router.get('/', async (req, res) => {
  try {
    const missions = await Mission.find({ status: 'Ouverte' }).sort({ createdAt: -1 });
    res.json(missions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Créer une mission (Recruteur uniquement)
router.post('/', verifyToken, isRecruiter, async (req, res) => {
  try {
    const newMission = new Mission({
      title: req.body.title,
      company: req.body.company,
      description: req.body.description,
      tags: req.body.tags || [],
    });
    const savedMission = await newMission.save();
    res.status(201).json(savedMission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Marquer une mission comme pourvue (Recruteur uniquement)
router.patch('/:id/status', verifyToken, isRecruiter, async (req, res) => {
  try {
    const updatedMission = await Mission.findByIdAndUpdate(
      req.params.id,
      { status: 'Pourvue' },
      { new: true }
    );
    if (!updatedMission) {
      return res.status(404).json({ message: 'Mission non trouvée' });
    }
    res.json(updatedMission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Postuler à une mission (Étudiant)
router.post('/:id/apply', verifyToken, async (req, res) => {
  try {
    const newApplication = new Application({
      missionId: req.params.id,
      applicantName: req.body.applicantName,
      applicantEmail: req.body.applicantEmail,
      coverMessage: req.body.coverMessage,
    });
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Récupérer les candidatures pour une mission (Recruteur uniquement)
router.get('/:id/apps', verifyToken, isRecruiter, async (req, res) => {
  try {
    const applications = await Application.find({ missionId: req.params.id }).sort({ appliedAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
