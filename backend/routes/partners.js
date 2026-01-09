const express = require('express');
const router = express.Router();
const Partner = require('../models/Partner');

// GET all partners (admin only - approved)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : { status: 'approved' };
    const partners = await Partner.find(filter).sort({ createdAt: -1 });
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET pending partners (for admin approval)
router.get('/pending', async (req, res) => {
  try {
    const partners = await Partner.find({ status: 'pending' }).sort({ createdAt: -1 });
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single partner by ID
router.get('/:id', async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.json(partner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE new partner
router.post('/', async (req, res) => {
  const partner = new Partner(req.body);
  try {
    const newPartner = await partner.save();
    res.status(201).json(newPartner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE partner
router.put('/:id', async (req, res) => {
  try {
    const partner = await Partner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.json(partner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE partner
router.delete('/:id', async (req, res) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// TOGGLE favorite
router.patch('/:id/favorite', async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    partner.isFavorite = !partner.isFavorite;
    await partner.save();
    res.json(partner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// APPROVE partner
router.patch('/:id/approve', async (req, res) => {
  try {
    const partner = await Partner.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.json(partner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// REJECT partner
router.patch('/:id/reject', async (req, res) => {
  try {
    const partner = await Partner.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.json(partner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUBLIC registration route
router.post('/register', async (req, res) => {
  try {
    const partnerData = {
      ...req.body,
      status: 'pending'
    };
    const partner = new Partner(partnerData);
    const newPartner = await partner.save();
    res.status(201).json({ 
      message: 'Registration submitted! Please wait for approval.',
      partner: newPartner 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ADD memory to partner
router.post('/:id/memories', async (req, res) => {
  try {
    console.log('➕ Adding memory to partner:', req.params.id);
    console.log('Memory data:', req.body);
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    partner.memories.push(req.body);
    await partner.save();
    console.log('✅ Memory added successfully!');
    res.json(partner);
  } catch (error) {
    console.error('❌ Error adding memory:', error);
    res.status(400).json({ message: error.message });
  }
});

// ADD gift to partner
router.post('/:id/gifts', async (req, res) => {
  try {
    console.log('🎁 Adding gift to partner:', req.params.id);
    console.log('Gift data:', req.body);
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    partner.gifts.push(req.body);
    await partner.save();
    console.log('✅ Gift added successfully!');
    res.json(partner);
  } catch (error) {
    console.error('❌ Error adding gift:', error);
    res.status(400).json({ message: error.message });
  }
});

// UPDATE rating
router.patch('/:id/rating', async (req, res) => {
  try {
    const { rating } = req.body;
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    const partner = await Partner.findByIdAndUpdate(
      req.params.id,
      { rating },
      { new: true }
    );
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.json(partner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
