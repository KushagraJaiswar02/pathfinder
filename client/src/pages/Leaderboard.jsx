import { useState, useEffect } from 'react';
import { Trophy, Star, ArrowUp } from 'lucide-react';
import MentorBadge from '../components/MentorBadge';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('/api/mentors/leaderboard');
        const data = await res.json();
        setLeaders(data);
      } catch (err) {
        console.error('Failed to fetch leaderboard', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <div className="py-12 text-center text-neutral-500">Loading Leaderboard...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12 mt-8">
        <div className="inline-block p-4 bg-yellow-100 text-yellow-600 rounded-full mb-4">
          <Trophy size={48} />
        </div>
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Top Mentors</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Recognizing the most helpful members of our community. Rankings are calculated based on ratings, reviews, and community upvotes.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-neutral-100 bg-neutral-50 text-xs font-bold text-neutral-500 uppercase tracking-wider">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-5">Mentor</div>
          <div className="col-span-2 text-center">Helpful Votes</div>
          <div className="col-span-2 text-center">Avg Rating</div>
          <div className="col-span-2 text-center">Score</div>
        </div>

        {leaders.length === 0 ? (
          <div className="p-8 text-center text-neutral-500 italic">No mentors on the board yet.</div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {leaders.map((mentor, index) => {
              const hash = mentor.name.charCodeAt(0) + ((mentor.name.charCodeAt(mentor.name.length-1) || 0) << 5);
              const avatarBg = `hsl(${Math.abs(hash) % 360}, 60%, 85%)`;

              return (
                <div key={mentor._id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-neutral-50 transition-colors">
                  <div className="col-span-1 text-center font-bold text-xl text-neutral-400">
                    #{index + 1}
                  </div>
                  
                  <div className="col-span-5 flex items-center space-x-4">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-neutral-600 flex-shrink-0"
                      style={{ backgroundColor: avatarBg }}
                    >
                      {mentor.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <Link to={`/mentors/${mentor._id}`} className="font-bold text-neutral-900 hover:text-accent transition-colors block">
                        {mentor.name}
                      </Link>
                      <MentorBadge level={mentor.mentorBadge} />
                    </div>
                  </div>

                  <div className="col-span-2 text-center font-semibold text-neutral-700 flex items-center justify-center">
                    <ArrowUp size={14} className="text-green-500 mr-1" />
                    {mentor.helpfulVotes || 0}
                  </div>

                  <div className="col-span-2 text-center font-semibold text-neutral-700 flex items-center justify-center">
                    <Star size={14} className="text-yellow-500 mr-1" fill="currentColor" />
                    {(mentor.rating || 0).toFixed(1)}
                  </div>

                  <div className="col-span-2 text-center font-bold text-accent font-mono text-lg space-x-1">
                    {Math.round(mentor.score)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
