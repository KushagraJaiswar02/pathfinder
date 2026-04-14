import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import TagPill from '../components/TagPill';
import CommentThread from '../components/CommentThread';

const QuestionDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();

  const fetchQuestionDetails = async () => {
    try {
      const res = await fetch(`/api/questions/${id}`);
      if (!res.ok) throw new Error('Question not found');
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionDetails();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    await postComment(newComment);
    setNewComment('');
  };

  const postComment = async (body, parentId = null) => {
    try {
      const res = await fetch(`/api/questions/${id}/comments`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ body, parentId })
      });

      if (res.ok) {
        fetchQuestionDetails(); // Refresh comments via fetching details
      }
    } catch (err) {
      console.error('Failed to post comment', err);
    }
  };

  const handleUpvote = async (commentId) => {
    try {
      const res = await fetch(`/api/questions/${id}/comments/${commentId}/upvote`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) fetchQuestionDetails();
    } catch (err) {
      console.error('Failed to upvote', err);
    }
  };

  if (loading) return <div className="py-12 text-center text-neutral-500">Loading discussion...</div>;
  if (error) return <div className="py-12 text-center text-red-500">{error}</div>;
  if (!data) return null;

  const { question, comments } = data;
  const authorName = question.isAnonymous ? 'Anonymous' : question.authorId?.name || 'Unknown';
  const getAvatarColor = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 60%, 85%)`;
  };
  const initials = authorName.charAt(0).toUpperCase();
  const avatarBg = question.isAnonymous ? '#E5E7EB' : getAvatarColor(authorName);

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <Link to="/" className="inline-flex items-center space-x-2 text-neutral-500 hover:text-accent mb-6 transition-colors">
        <ArrowLeft size={16} />
        <span className="font-medium text-sm">Back to Feed</span>
      </Link>

      <div className="card p-8 mb-8 border-none shadow-sm ring-1 ring-neutral-200 ring-opacity-50">
        <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-neutral-100">
          <div 
            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-neutral-600 ${question.isAnonymous ? 'italic' : ''}`}
            style={{ backgroundColor: avatarBg }}
          >
            {question.isAnonymous ? '?' : initials}
          </div>
          <div>
            <h3 className={`font-semibold text-lg ${question.isAnonymous ? 'italic text-neutral-500' : 'text-neutral-800'}`}>
              {authorName}
            </h3>
            <div className="flex items-center text-sm text-neutral-400 space-x-2">
              <Clock size={14} />
              <span>{new Date(question.createdAt).toLocaleDateString()} at {new Date(question.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-neutral-900 mb-6 leading-tight">
          {question.title}
        </h1>
        
        <div className="prose prose-neutral max-w-none text-neutral-700 leading-editorial whitespace-pre-wrap mb-8">
          {question.body}
        </div>

        <div className="flex flex-wrap gap-2">
          {question.tags.map(tag => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-8 ring-1 ring-neutral-200 ring-opacity-50">
        {user ? (
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <h3 className="text-lg font-semibold text-neutral-800 mb-3">Add a response</h3>
            <textarea
              required
              rows="3"
              className="w-full p-4 border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-accent bg-neutral-50 text-sm leading-relaxed"
              placeholder="Share your perspective or advice..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="flex justify-end mt-3">
              <button type="submit" className="btn-primary">Post Reply</button>
            </div>
          </form>
        ) : (
          <div className="bg-neutral-50 p-6 rounded-lg text-center mb-8 border border-neutral-200 border-dashed">
            <p className="text-neutral-600 mb-3">Join the community to participate in this discussion.</p>
            <Link to="/login" className="btn-primary inline-block">Log in to Reply</Link>
          </div>
        )}

        <CommentThread comments={comments} onReply={postComment} onUpvote={handleUpvote} questionId={question._id} />
      </div>
    </div>
  );
};

export default QuestionDetail;
