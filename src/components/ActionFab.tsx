import React, { useState } from 'react';
import { PenTool, X, Sparkles, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ActionFab.css';

export default function ActionFab() {
    const [isOpen, setIsOpen] = useState(false);
    const [doubtText, setDoubtText] = useState('');

    return (
        <>
            <button
                className="floating-action-btn"
                onClick={() => setIsOpen(true)}
            >
                <PenTool className="fab-icon" />
                <span className="fab-text">Ask a Doubt</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                        <motion.div
                            className="modal-content"
                            onClick={e => e.stopPropagation()}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            <div className="modal-header">
                                <h2>Ask an Expert Mentor</h2>
                                <button className="close-modal" onClick={() => setIsOpen(false)}>
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="ai-context-fill">
                                <Sparkles size={16} className="context-icon" />
                                <p>
                                    <strong>AI Assistant:</strong> I see you are a 3rd Year CS Student at SVVV building a full-stack project. I've automatically attached your current tech stack (MERN) to this doubt for better context.
                                </p>
                            </div>

                            <div className="doubt-input-area">
                                <div className="input-tags">
                                    <span className="context-tag">SVVV College</span>
                                    <span className="context-tag">3rd Year</span>
                                    <span className="context-tag">MERN Stack</span>
                                </div>

                                <textarea
                                    className="doubt-textarea"
                                    placeholder="What's holding you back right now? e.g., 'I've built a React app but I'm struggling to set up my Express server architecture.'"
                                    value={doubtText}
                                    onChange={(e) => setDoubtText(e.target.value)}
                                    autoFocus
                                />
                            </div>

                            <div className="modal-footer">
                                <button className="post-anonymously">Post Anonymously</button>
                                <button
                                    className={`submit-doubt-btn ${doubtText.trim().length > 0 ? 'active' : ''}`}
                                    disabled={doubtText.trim().length === 0}
                                >
                                    <Send size={16} /> Ensure Reach
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
