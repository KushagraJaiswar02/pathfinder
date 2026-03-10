import React, { useState } from 'react';
import { ArrowBigUp, MessageSquare, Share2, ShieldCheck, Sparkles, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

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

export default function DoubtCard({ data }: DoubtCardProps) {
    const [upvotes, setUpvotes] = useState(data.initialUpvotes);
    const [hasUpvoted, setHasUpvoted] = useState(false);

    const handleUpvote = () => {
        if (hasUpvoted) {
            setUpvotes(prev => prev - 1);
            setHasUpvoted(false);
        } else {
            setUpvotes(prev => prev + 1);
            setHasUpvoted(true);
        }
    };

    return (
        <motion.article
            className="doubt-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
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
                </div>
            </div>
        </motion.article>
    );
}
