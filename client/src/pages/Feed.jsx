import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import QuestionCard from '../components/QuestionCard';
import TagPill from '../components/TagPill';

const Feed = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTag = searchParams.get('tag');
  const { user } = useAuth();
  
  // States for new question form
  const [showForm, setShowForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ title: '', body: '', tags: '', isAnonymous: false });

  // Top tags for sidebar (mock data for now, ideally derived from backend)
  const topTags = ['engineering', 'career', 'internships', 'computer-science', 'advice'];

  const fetchQuestions = async () => {
    try {
      const url = currentTag ? `/api/questions?tag=${currentTag}` : '/api/questions';
      const res = await fetch(url);
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      console.error('Failed to fetch questions', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [currentTag]);

  const handleTagClick = (tag) => {
    if (currentTag === tag) {
      setSearchParams({});
    } else {
      setSearchParams({ tag });
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const tagsArray = newQuestion.tags.split(',').map(t => t.trim()).filter(Boolean);
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ ...newQuestion, tags: tagsArray })
      });

      if (res.ok) {
        setShowForm(false);
        setNewQuestion({ title: '', body: '', tags: '', isAnonymous: false });
        fetchQuestions(); // Refresh feed
      }
    } catch (err) {
      console.error('Failed to post question', err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Main Feed Column */}
      <div className="flex-grow md:w-2/3">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-neutral-900">
            {currentTag ? `Topic: #${currentTag}` : 'Latest Questions'}
          </h1>
          {user && (
            <button 
              onClick={() => setShowForm(!showForm)} 
              className="btn-primary"
            >
              {showForm ? 'Cancel' : 'Ask a Question'}
            </button>
          )}
        </div>

        {/* Ask Question Form */}
        {showForm && (
          <div className="card p-6 mb-8 bg-neutral-50 shadow-sm border-accent-soft">
            <h2 className="text-lg font-bold mb-4">What's on your mind?</h2>
            <form onSubmit={handlePostSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Question Title (e.g., How to prepare for tech interviews?)"
                required
                className="w-full p-3 border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-accent"
                value={newQuestion.title}
                onChange={e => setNewQuestion({...newQuestion, title: e.target.value})}
              />
              <textarea
                placeholder="Elaborate on your question here..."
                required
                rows="4"
                className="w-full p-3 border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-accent"
                value={newQuestion.body}
                onChange={e => setNewQuestion({...newQuestion, body: e.target.value})}
              />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <input
                  type="text"
                  placeholder="Tags (comma separated, e.g., career, tech)"
                  className="w-full sm:w-1/2 p-3 border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-accent text-sm"
                  value={newQuestion.tags}
                  onChange={e => setNewQuestion({...newQuestion, tags: e.target.value})}
                />
                <label className="flex items-center space-x-2 cursor-pointer text-sm text-neutral-600">
                  <input
                    type="checkbox"
                    className="rounded text-accent focus:ring-accent"
                    checked={newQuestion.isAnonymous}
                    onChange={e => setNewQuestion({...newQuestion, isAnonymous: e.target.checked})}
                  />
                  <span>Post Anonymously</span>
                </label>
              </div>
              <div className="flex justify-end pt-2">
                <button type="submit" className="btn-primary px-6">Post</button>
              </div>
            </form>
          </div>
        )}

        {/* Feed List */}
        {loading ? (
          <div className="py-12 text-center text-neutral-500">Loading stories...</div>
        ) : questions.length === 0 ? (
          <div className="py-12 text-center">
            <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-neutral-200 border-dashed">
              <span className="text-neutral-400 font-serif italic text-3xl">?</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-800">No questions found</h3>
            <p className="text-neutral-500 mt-1">Be the first to ask something in this topic!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map(q => (
              <QuestionCard key={q._id} question={q} />
            ))}
          </div>
        )}
      </div>

      {/* Sidebar (Desktop) */}
      <div className="md:w-1/3 flex flex-col gap-6">
        <div className="card p-6">
          <h3 className="text-sm font-bold tracking-wider text-neutral-400 uppercase mb-4">Top Tags</h3>
          <div className="flex flex-wrap gap-2">
            {topTags.map(tag => (
              <TagPill 
                key={tag} 
                tag={tag} 
                active={currentTag === tag}
                onClick={() => handleTagClick(tag)} 
              />
            ))}
          </div>
        </div>

        {!user || user.role !== 'mentor' ? (
          <div className="card p-6 bg-gradient-to-br from-accent-soft to-transparent border-accent-soft border-opacity-50">
            <h3 className="text-lg font-bold text-neutral-900 mb-2">Become a Mentor</h3>
            <p className="text-sm text-neutral-600 mb-4">Share your experience and guide the next generation of students.</p>
            <Link to="/apply-mentor" className="btn-secondary w-full text-center block">
              Apply Now
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Feed;
