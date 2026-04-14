import { useState, useEffect } from 'react';
import MentorCard from '../components/MentorCard';

const MentorList = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await fetch('/api/mentors');
        const data = await res.json();
        setMentors(data);
      } catch (err) {
        console.error('Failed to fetch mentors', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12 mt-8">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Find Your Mentor</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Connect with experienced peers and professionals who have navigated the path you're on. Get advice, resume reviews, and career guidance.
        </p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-neutral-500">Loading mentors...</div>
      ) : mentors.length === 0 ? (
        <div className="bg-neutral-50 py-16 text-center rounded-xl border border-neutral-200 border-dashed">
          <p className="text-neutral-500 text-lg">No mentors available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map(mentor => (
            <MentorCard key={mentor._id} mentor={mentor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MentorList;
