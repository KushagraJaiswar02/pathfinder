import { Link } from 'react-router-dom';
import { MessageSquare, Clock } from 'lucide-react';
import TagPill from './TagPill';

const QuestionCard = ({ question }) => {
  const getAvatarColor = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 60%, 85%)`;
  };

  const authorName = question.isAnonymous ? 'Anonymous' : question.authorId?.name || 'Unknown';
  const initials = authorName.charAt(0).toUpperCase();
  const avatarBg = question.isAnonymous ? '#E5E7EB' : getAvatarColor(authorName);
  const timeAgo = new Date(question.createdAt).toLocaleDateString();

  return (
    <div className="card p-6 mb-4">
      <div className="flex items-start space-x-4 mb-4">
        <div 
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-neutral-600 ${question.isAnonymous ? 'italic' : ''}`}
          style={{ backgroundColor: avatarBg }}
        >
          {question.isAnonymous ? '?' : initials}
        </div>
        <div>
          <h3 className={`font-semibold ${question.isAnonymous ? 'italic text-neutral-500' : 'text-neutral-800'}`}>
            {authorName}
          </h3>
          <div className="flex items-center text-xs text-neutral-400 space-x-2">
            <Clock size={12} />
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
      
      <Link to={`/questions/${question._id}`}>
        <h2 className="text-xl font-bold text-neutral-900 mb-2 hover:text-accent transition-colors">
          {question.title}
        </h2>
      </Link>
      
      <p className="text-neutral-600 line-clamp-2 mb-4">
        {question.body}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {question.tags.map(tag => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
        
        <div className="flex items-center space-x-1 text-neutral-400 font-medium">
          <MessageSquare size={18} />
          <span className="text-sm">{question.commentCount}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
