import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ArrowLeft, Mail, ArrowUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import TagPill from '../components/TagPill';
import MentorBadge from '../components/MentorBadge';

const MentorProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Review form states
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  const { user } = useAuth();

  const fetchProfile = async () => {
    try {
      const res = await fetch(`/api/mentors/${id}`);
      if (!res.ok) throw new Error('Mentor not found');
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user || user.role !== 'student') return;

    try {
      const res = await fetch(`/api/mentors/${id}/review`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ rating, comment })
      });

      if (res.ok) {
        setShowReviewForm(false);
        setComment('');
        setRating(5);
        fetchProfile(); // Refresh reviews
      } else {
        const errorData = await res.json();
        alert(errorData.message);
      }
    } catch (err) {
      console.error('Failed to post review', err);
    }
  };

  if (loading) return <div className="py-12 text-center text-neutral-500">Loading profile...</div>;
  if (error) return <div className="py-12 text-center text-red-500">{error}</div>;
  if (!data) return null;

  const { mentor, reviews } = data;
  
  const getAvatarColor = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 60%, 85%)`;
  };
  const initials = mentor.name.charAt(0).toUpperCase();
  const avatarBg = getAvatarColor(mentor.name);

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <Link to="/mentors" className="inline-flex items-center space-x-2 text-neutral-500 hover:text-accent mb-6 transition-colors">
        <ArrowLeft size={16} />
        <span className="font-medium text-sm">Back to Mentors</span>
      </Link>

      <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-neutral-100 flex flex-col md:flex-row gap-10 mb-8 items-start">
        <div className="flex-shrink-0 flex flex-col items-center mx-auto md:mx-0">
          <div 
            className="w-32 h-32 rounded-full flex items-center justify-center text-5xl font-bold text-neutral-600 mb-6"
            style={{ backgroundColor: avatarBg }}
          >
            {initials}
          </div>
          
          <div className="flex items-center space-x-1 text-yellow-500 mb-1 bg-yellow-50 px-4 py-2 rounded-full font-bold">
            <Star size={18} fill="currentColor" />
            <span>{(mentor.rating || 0).toFixed(1)}</span>
          </div>

          <div className="flex items-center space-x-1 text-green-600 mb-4 bg-green-50 px-4 py-1.5 rounded-full font-bold text-sm">
            <ArrowUp size={16} />
            <span>{mentor.helpfulVotes || 0} Helpful</span>
          </div>

          <button className="btn-primary flex items-center space-x-2 w-full justify-center">
            <Mail size={18} />
            <span>Message</span>
          </button>
        </div>

        <div className="flex-grow">
          <div className="flex items-center space-x-4 mb-4">
            <h1 className="text-3xl font-bold text-neutral-900">{mentor.name}</h1>
            <MentorBadge level={mentor.mentorBadge} size={20} className="px-3 py-1 text-sm" />
          </div>
          <div className="prose prose-neutral text-neutral-600 leading-relaxed mb-8">
            {mentor.bio || "No bio provided yet."}
          </div>

          <h3 className="text-sm font-bold tracking-wider text-neutral-400 uppercase mb-3">Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {mentor.skills.map(skill => (
              <TagPill key={skill} tag={skill} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 flex items-center space-x-2">
            Reviews 
            <span className="text-neutral-400 font-normal ml-2">({mentor.reviewCount})</span>
          </h2>
          
          {user?.role === 'student' && !showReviewForm && (
            <button onClick={() => setShowReviewForm(true)} className="btn-secondary text-sm">
              Write a Review
            </button>
          )}
        </div>

        {showReviewForm && (
          <form onSubmit={handleReviewSubmit} className="card p-6 mb-8 bg-neutral-50 shadow-sm border-accent-soft">
            <h3 className="text-lg font-bold mb-4">Leave your feedback</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">Rating</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`focus:outline-none transition-colors ${rating >= star ? 'text-yellow-500' : 'text-neutral-300 hover:text-yellow-400'}`}
                  >
                    <Star size={24} fill="currentColor" />
                  </button>
                ))}
              </div>
            </div>
            <textarea
              required
              rows="3"
              className="w-full p-3 border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-accent mb-4 text-sm"
              placeholder="How was your experience?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex justify-end space-x-3">
              <button type="button" onClick={() => setShowReviewForm(false)} className="text-neutral-500 text-sm font-medium">Cancel</button>
              <button type="submit" className="btn-primary py-1.5 px-4 text-sm">Submit Review</button>
            </div>
          </form>
        )}

        <div className="space-y-6">
          {reviews.length === 0 ? (
            <div className="text-center py-10 text-neutral-500 italic">No reviews yet.</div>
          ) : (
            reviews.map(review => (
              <div key={review._id} className="border-b border-neutral-100 pb-6 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-semibold text-neutral-800 text-sm">{review.reviewerId?.name}</span>
                    <span className="text-neutral-400 text-xs ml-2">{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-yellow-500" : "text-neutral-300"} />
                    ))}
                  </div>
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
