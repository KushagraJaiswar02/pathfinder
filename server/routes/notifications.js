const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Notification = require('../models/Notification');

// GET /api/notifications -> get all for user
router.get('/', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ recipientId: req.user.userId })
      .populate('senderId', 'name')
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/notifications/read -> mark all as read
router.patch('/read', auth, async (req, res) => {
  try {
    await Notification.updateMany(
      { recipientId: req.user.userId, isRead: false },
      { $set: { isRead: true } }
    );
    res.json({ message: 'Notifications marked as read' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
