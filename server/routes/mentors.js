const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Review = require('../models/Review');

// GET /api/mentors/leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const mentors = await User.find({ role: 'mentor' }, 'name bio skills rating reviewCount helpfulVotes mentorBadge');
    
    const mentorsWithScore = mentors.map(m => {
      const score = (m.rating || 0) * 10 + (m.helpfulVotes || 0) * 2 + (m.reviewCount || 0) * 5;
      return { ...m.toObject(), score };
    });

    mentorsWithScore.sort((a, b) => b.score - a.score);

    res.json(mentorsWithScore);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/mentors/apply -> auth required
router.post('/apply', auth, async (req, res) => {
  console.log(`[POST /apply] Start for user: ${req.user.userId}`);
  try {
    const { bio, skills } = req.body;
    console.log(`[POST /apply] Bio: ${bio}, Skills:`, skills);
    
    await User.findByIdAndUpdate(req.user.userId, {
      applicationStatus: 'pending',
      bio,
      skills
    });

    // Simulate async approval after 30s
    setTimeout(async () => {
      try {
        await User.findByIdAndUpdate(req.user.userId, {
          role: 'mentor',
          applicationStatus: 'approved'
        });
        console.log(`User ${req.user.userId} auto-approved as mentor.`);
      } catch (e) {
        console.error('Failed to auto-approve mentor', e);
      }
    }, 30000);

    res.json({ message: 'Application submitted and is pending review.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/mentors -> list with rating, skills
router.get('/', async (req, res) => {
  try {
    const mentors = await User.find({ role: 'mentor' }, 'name bio skills rating reviewCount helpfulVotes mentorBadge');
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/mentors/:id -> full profile + reviews
router.get('/:id', async (req, res) => {
  try {
    const mentor = await User.findOne({ _id: req.params.id, role: 'mentor' }, 'name bio skills rating reviewCount helpfulVotes mentorBadge');
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

    const reviews = await Review.find({ mentorId: req.params.id })
      .populate('reviewerId', 'name')
      .sort({ createdAt: -1 });

    res.json({ mentor, reviews });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/mentors/:id/review -> auth required, student only
router.post('/:id/review', auth, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can leave reviews' });
    }

    const { rating, comment } = req.body;
    const review = new Review({
      mentorId: req.params.id,
      reviewerId: req.user.userId,
      rating,
      comment
    });
    await review.save();

    // Update mentor rating and reviewCount
    const reviews = await Review.find({ mentorId: req.params.id });
    const avgRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

    await User.findByIdAndUpdate(req.params.id, {
      rating: avgRating.toFixed(1),
      $inc: { reviewCount: 1 }
    });

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
