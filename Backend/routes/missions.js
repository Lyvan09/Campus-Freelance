import express from 'express';
import Mission from '../models/Mission.js';
import Application from '../models/Application.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const missions = await Mission.find({ status: 'Ouverte' }).sort({ createdAt: -1 });
    res.json(missions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
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

router.patch('/:id/status', async (req, res) => {
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

router.post('/:id/apply', async (req, res) => {
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

router.get('/:id/apps', async (req, res) => {
  try {
    const applications = await Application.find({ missionId: req.params.id }).sort({ appliedAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
