import React, { useState } from 'react';
import { ShieldCheck, MessageCircle, PlayCircle, Library, Code2, Database, Rocket, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './InteractiveRoadmaps.css';

const ROADMAP_STEPS = [
    {
        id: 'r1',
        title: 'HTML, CSS & JavaScript Fundamentals',
        icon: <Library size={20} />,
        duration: '3 Weeks',
        description: 'Master the core web triad. Build 5 vanilla JS mini-projects.',
        quote: "Don't rush to React. Getting strong at Vanilla JS prototypes will save you months of debugging pain later - Frontend Lead @ Zomato"
    },
    {
        id: 'r2',
        title: 'React.js & State Management',
        icon: <Code2 size={20} />,
        duration: '4 Weeks',
        description: 'Learn component architecture, Hooks, and Redux/Zustand.',
        quote: "I ask about useEffect cleanup and custom hooks in 80% of my UI interviews - SDE @ Amazon"
    },
    {
        id: 'r3',
        title: 'Node.js & Express Architecture',
        icon: <Database size={20} />,
        duration: '3 Weeks',
        description: 'Build REST APIs, handle auth, and structure controllers.',
        quote: "Show me a clean MVC folder structure and handle errors globally. It proves you understand enterprise code - Staff Engineer @ Google"
    },
    {
        id: 'r4',
        title: 'MongoDB & Deployment',
        icon: <Rocket size={20} />,
        duration: '2 Weeks',
        description: 'NoSQL basics, Mongoose schemas, and deploying to Vercel/Render.',
        quote: "Deploying your own DB and Backend proves end-to-end ownership. It's the #1 differentiator for freshers - SDE II @ Microsoft"
    }
];

export default function InteractiveRoadmaps() {
    const [progress, setProgress] = useState(0); // 0 = Not started, 1 = Step 1, 2 = Step 2, etc.

    const handleProgress = () => {
        if (progress < ROADMAP_STEPS.length) {
            setProgress(prev => prev + 1);
        }
    };

    const percentage = Math.round((progress / ROADMAP_STEPS.length) * 100);

    return (
        <div className="interactive-roadmaps">
            <div className="roadmap-header">
                <div className="header-left">
                    <h2>Verified MERN Stack Roadmap</h2>
                    <p>Stop following random YouTube tutorials. This path is curated and vetted by 50+ FAANG engineers.</p>
                </div>
                <div className="header-right">
                    {progress === 0 ? (
                        <button className="start-learning-btn" onClick={handleProgress}>
                            <PlayCircle size={18} /> Start Learning
                        </button>
                    ) : (
                        <div className="progress-tracker">
                            <div className="progress-info">
                                <span>Your Progress</span>
                                <strong>{percentage}% Complete</strong>
                            </div>
                            <div className="progress-bar-bg">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            {progress < ROADMAP_STEPS.length && (
                                <button className="continue-btn" onClick={handleProgress}>
                                    Mark Next Complete
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="roadmap-content">
                <div className="timeline-container">
                    {ROADMAP_STEPS.map((step, index) => {
                        const isCompleted = index < progress;
                        const isCurrent = index === progress;

                        return (
                            <motion.div
                                key={step.id}
                                className={`timeline-node ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.15 }}
                            >
                                <div className="node-line"></div>
                                <div className="node-icon-wrapper">
                                    {isCompleted ? <ShieldCheck size={20} className="check-icon" /> : step.icon}
                                </div>

                                <div className="node-content">
                                    <div className="node-title-row">
                                        <h3>{step.title}</h3>
                                        <div className="node-badges">
                                            <span className="duration-badge">{step.duration}</span>
                                            <span className="vetted-badge">
                                                <ShieldCheck size={14} /> Mentor-Vetted
                                            </span>
                                        </div>
                                    </div>

                                    <p className="node-desc">{step.description}</p>

                                    <div className="expert-quote-container">
                                        <MessageCircle size={18} className="quote-icon pulse-glow" />
                                        <div className="quote-bubble">
                                            "{step.quote}"
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <aside className="local-community-sidebar">
                    <div className="svvv-card">
                        <div className="svvv-header">
                            <Users className="svvv-icon" />
                            <h3>SVVV Community</h3>
                        </div>
                        <p className="svvv-desc">Join 120+ SVVV students following this roadmap right now.</p>

                        <div className="svvv-stats">
                            <div className="stat-item">
                                <strong>42</strong>
                                <span>MERN Projects</span>
                            </div>
                            <div className="stat-item">
                                <strong>15</strong>
                                <span>Local Interviews</span>
                            </div>
                        </div>

                        <div className="svvv-alumni">
                            <h4>Recent Alumni Success</h4>
                            <ul>
                                <li><strong>Rahul (Batch '25)</strong> - Placed at TCS Digital</li>
                                <li><strong>Sneha (Batch '24)</strong> - Yash Technologies</li>
                            </ul>
                        </div>

                        <button className="join-svvv-btn">Join Local Study Group</button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
