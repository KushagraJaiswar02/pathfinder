import React, { useState } from 'react';
import { ArrowBigUp, MessageSquare, Share2, ShieldCheck, Sparkles, MoreHorizontal, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DoubtCardProps {
    data: {
        id: string;
        user: string;
        avatar: string;
        timestamp: string;
        doubt: string;
        tags: string[];
        expertName: string;
        expertRole: string;
        expertCompany: string;
        expertAvatar: string;
        tldr: string;
        response: string;
        initialUpvotes: number;
        initialComments: number;
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function DoubtCard({ data }: DoubtCardProps) {
    const [upvotes, setUpvotes] = useState(data.initialUpvotes);
    const [hasUpvoted, setHasUpvoted] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [isAccepted, setIsAccepted] = useState(false);

    const handleUpvote = () => {
        if (hasUpvoted) {
            setUpvotes(prev => prev - 1);
            setHasUpvoted(false);
        } else {
            setUpvotes(prev => prev + 1);
            setHasUpvoted(true);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    const handleAccept = () => {
        setIsAccepted(true);
    };

    return (
        <motion.article
            className={`doubt-card ${isAccepted ? 'accepted-glow' : ''}`}
            variants={itemVariants}
        >
            {/* Upvote Sidebar */}
            <div className="card-sidebar">
                <button
                    className={`upvote-btn ${hasUpvoted ? 'active' : ''}`}
                    onClick={handleUpvote}
                >
                    <ArrowBigUp size={24} className={hasUpvoted ? 'fill-current' : ''} />
                </button>
                <span className={`upvote-count ${hasUpvoted ? 'active' : ''}`}>
                    {upvotes}
                </span>
            </div>

            <AnimatePresence>
                {showToast && (
                    <motion.div
                        className="upvote-toast"
                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    >
                        +1 Karma to Mentor {data.expertCompany}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="card-content">
                <div className="card-header">
                    <div className="user-info">
                        <img src={data.avatar} alt={data.user} className="user-avatar" />
                        <span className="user-name">{data.user}</span>
                        <span className="timestamp">• {data.timestamp}</span>
                    </div>
                    <button className="more-btn">
                        <MoreHorizontal size={18} />
                    </button>
                </div>

                <h3 className="doubt-title">{data.doubt}</h3>

                <div className="tags-list">
                    {data.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>

                {/* Expert Response Area */}
                <div className="expert-response">
                    <div className="expert-header">
                        <img src={data.expertAvatar} alt={data.expertName} className="expert-avatar" />
                        <div className="expert-meta">
                            <div className="expert-name-row">
                                <span className="expert-name">{data.expertName}</span>
                                <span className="verified-badge animate-pulse-glow">
                                    <ShieldCheck size={14} /> Verified Mentor
                                </span>
                            </div>
                            <span className="expert-role">{data.expertRole} @ <span className="expert-company">{data.expertCompany}</span></span>
                        </div>
                    </div>

                    <div className="smart-tldr">
                        <div className="tldr-header">
                            <Sparkles size={14} className="tldr-icon" />
                            <span>Smart TL;DR</span>
                        </div>
                        <p>{data.tldr}</p>
                    </div>

                    <p className="full-response">{data.response}</p>
                </div>

                {/* Card Footer Actions */}
                <div className="card-actions">
                    <button className="action-btn">
                        <MessageSquare size={18} />
                        <span>{data.initialComments} Comments</span>
                    </button>
                    <button className="action-btn">
                        <Share2 size={18} />
                        <span>Share</span>
                    </button>
                    <button
                        className={`action-btn accept-btn ${isAccepted ? 'accepted' : ''}`}
                        onClick={handleAccept}
                    >
                        <CheckCircle2 size={18} className={isAccepted ? 'fill-current' : ''} />
                        <span>{isAccepted ? 'Accepted Solution' : 'Accept Answer'}</span>
                    </button>
                </div>
            </div>
        </motion.article>
    );
}
