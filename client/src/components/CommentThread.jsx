import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Reply, ArrowUp } from 'lucide-react';

const CommentThread = ({ comments, onReply, onUpvote, questionId }) => {
  const { user } = useAuth();
  
  // Group comments into top-level and replies
  const topLevel = comments.filter(c => !c.parentId);
  const getReplies = (parentId) => comments.filter(c => c.parentId === parentId);

  const CommentItem = ({ comment, isReply = false }) => {
    const [isReplying, setIsReplying] = useState(false);
    const [replyBody, setReplyBody] = useState('');

    const handleReply = async () => {
      if (!replyBody.trim()) return;
      await onReply(replyBody, comment._id);
      setReplyBody('');
      setIsReplying(false);
    };

    const hasUpvoted = user && comment.upvotedBy?.includes(user.id);

    return (
      <div className={`mb-4 ${isReply ? 'ml-12 border-l-2 border-neutral-100 pl-4' : ''}`}>
        <div className="flex items-start space-x-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-accent-soft text-accent flex items-center justify-center font-bold text-xs">
            {comment.authorId?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-neutral-800 text-sm">{comment.authorId?.name}</span>
              <span className="text-xs text-neutral-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-neutral-600 text-sm mt-1">{comment.body}</p>
            
            {!isReply && user && (
              <div className="flex items-center space-x-4 mt-2">
                <button 
                  onClick={() => onUpvote(comment._id)}
                  className={`flex items-center space-x-1 text-xs font-semibold hover:text-accent transition-colors ${hasUpvoted ? 'text-accent' : 'text-neutral-400'}`}
                >
                  <ArrowUp size={14} />
                  <span>{comment.helpfulVotes || 0} Helpful</span>
                </button>
                <button 
                  onClick={() => setIsReplying(!isReplying)}
                  className="flex items-center space-x-1 text-xs text-neutral-400 hover:text-accent transition-colors font-semibold"
                >
                  <Reply size={14} />
                  <span>Reply</span>
                </button>
              </div>
            )}

            {isReplying && (
              <div className="mt-3">
                <textarea
                  className="w-full p-2 border border-neutral-200 rounded-lg text-sm focus:ring-1 focus:ring-accent focus:border-accent outline-none"
                  placeholder="Write a reply..."
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  rows="2"
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button onClick={() => setIsReplying(false)} className="text-xs text-neutral-500">Cancel</button>
                  <button onClick={handleReply} className="btn-primary text-xs py-1 px-3">Reply</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {!isReply && getReplies(comment._id).map(reply => (
          <CommentItem key={reply._id} comment={reply} isReply={true} />
        ))}
      </div>
    );
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold text-neutral-900 mb-6 flex items-center space-x-2">
        <MessageSquare size={20} className="text-neutral-400" />
        <span>Discussion ({comments.length})</span>
      </h3>
      
      {topLevel.length === 0 ? (
        <div className="text-center py-10 bg-neutral-50 rounded-xl border border-dashed border-neutral-200">
          <p className="text-neutral-400 italic">No comments yet. Start the conversation!</p>
        </div>
      ) : (
        topLevel.map(comment => <CommentItem key={comment._id} comment={comment} />)
      )}
    </div>
  );
};

export default CommentThread;
