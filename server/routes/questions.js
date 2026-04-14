const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Question = require('../models/Question');
const Comment = require('../models/Comment');

// GET /api/questions -> latest, optional ?tag=
router.get('/', async (req, res) => {
  try {
    const { tag } = req.query;
    const query = tag ? { tags: tag } : {};
    const questions = await Question.find(query)
      .populate('authorId', 'name')
      .sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/questions -> auth required
router.post('/', auth, async (req, res) => {
  try {
    const { title, body, tags, isAnonymous } = req.body;
    const question = new Question({
      authorId: req.user.userId,
      title,
      body,
      tags,
      isAnonymous
    });
    await question.save();
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/questions/:id -> with comments
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('authorId', 'name');
    if (!question) return res.status(404).json({ message: 'Question not found' });

    const comments = await Comment.find({ questionId: req.params.id })
      .populate('authorId', 'name')
      .sort({ createdAt: 1 });
    
    res.json({ question, comments });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/questions/:id/comments -> auth required
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const { body, parentId } = req.body;
    const comment = new Comment({
      questionId: req.params.id,
      authorId: req.user.userId,
      body,
      parentId: parentId || null
    });
    await comment.save();

    const question = await Question.findByIdAndUpdate(req.params.id, { $inc: { commentCount: 1 } });

    if (question && question.authorId.toString() !== req.user.userId) {
      const Notification = require('../models/Notification');
      await Notification.create({
        recipientId: question.authorId,
        senderId: req.user.userId,
        questionId: question._id,
        type: 'reply'
      });
    }

    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/questions/:id/comments/:commentId/upvote -> auth required
router.post('/:id/comments/:commentId/upvote', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    const hasVoted = comment.upvotedBy.includes(req.user.userId);
    
    if (hasVoted) {
      comment.upvotedBy = comment.upvotedBy.filter(id => id.toString() !== req.user.userId);
      comment.helpfulVotes -= 1;
    } else {
      comment.upvotedBy.push(req.user.userId);
      comment.helpfulVotes += 1;
    }
    
    await comment.save();

    const User = require('../models/User');
    const author = await User.findById(comment.authorId);
    if (author) {
      author.helpfulVotes += hasVoted ? -1 : 1;
      
      if (author.helpfulVotes >= 30) author.mentorBadge = 'gold';
      else if (author.helpfulVotes >= 15) author.mentorBadge = 'silver';
      else if (author.helpfulVotes >= 5) author.mentorBadge = 'bronze';
      else author.mentorBadge = 'none';

      await author.save();
    }

    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
