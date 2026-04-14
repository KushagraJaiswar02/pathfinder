import { Link } from 'react-router-dom';
import { Star, MessageCircle, ArrowUp } from 'lucide-react';
import TagPill from './TagPill';
import MentorBadge from './MentorBadge';

const MentorCard = ({ mentor }) => {
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
    <div className="card p-6 flex flex-col items-center text-center">
      <div 
        className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-neutral-600 mb-4"
        style={{ backgroundColor: avatarBg }}
      >
        {initials}
      </div>
      
      <div className="flex items-center justify-center space-x-2 mb-1">
        <h3 className="text-xl font-bold text-neutral-900">{mentor.name}</h3>
      </div>
      <div className="mb-3">
        <MentorBadge level={mentor.mentorBadge} />
      </div>

      <p className="text-sm text-neutral-500 mb-4 line-clamp-2">{mentor.bio}</p>
      
      <div className="flex items-center space-x-4 mb-4 text-sm">
        <div className="flex items-center space-x-1 text-yellow-500">
          <Star size={16} fill="currentColor" />
          <span className="font-bold text-neutral-800">{(mentor.rating || 0).toFixed(1)}</span>
        </div>
        <div className="flex items-center space-x-1 text-green-500 font-medium">
          <ArrowUp size={16} />
          <span className="text-neutral-800">{mentor.helpfulVotes || 0} Helpful</span>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {mentor.skills.slice(0, 4).map(skill => (
          <TagPill key={skill} tag={skill} />
        ))}
      </div>
      
      <Link to={`/mentors/${mentor._id}`} className="btn-primary w-full">
        View Profile
      </Link>
    </div>
  );
};

export default MentorCard;
