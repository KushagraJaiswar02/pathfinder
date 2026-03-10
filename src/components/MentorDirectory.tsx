import React, { useState } from 'react';
import { Bot, MapPin, Briefcase, Users, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './MentorDirectory.css';

const MENTORS = [
    {
        id: 'm1',
        name: 'Neha Verma',
        role: 'Staff Engineer',
        company: 'Google',
        companyType: 'FAANG',
        experience: 'Senior',
        skills: ['#SystemDesign', '#DistributedSystems'],
        impactScore: '12.4k',
        avatar: 'https://i.pravatar.cc/150?img=5',
        location: 'Bangalore, India'
    },
    {
        id: 'm2',
        name: 'Simran Kaur',
        role: 'Frontend Lead',
        company: 'Zomato',
        companyType: 'Startup',
        experience: 'Mid-Level',
        skills: ['#React', '#WebPerf'],
        impactScore: '5.6k',
        avatar: 'https://i.pravatar.cc/150?img=9',
        location: 'Gurgaon, India'
    },
    {
        id: 'm3',
        name: 'Karan Ahuja',
        role: 'SDE II',
        company: 'Microsoft',
        companyType: 'FAANG',
        experience: 'Mid-Level',
        skills: ['#DotNet', '#Azure'],
        impactScore: '8.2k',
        avatar: 'https://i.pravatar.cc/150?img=11',
        location: 'Hyderabad, India'
    },
    {
        id: 'm4',
        name: 'Vikram Joshi',
        role: 'SDE II',
        company: 'TCS Digital',
        companyType: 'Service',
        experience: 'Senior',
        skills: ['#Java', '#Spring'],
        impactScore: '3.1k',
        avatar: 'https://i.pravatar.cc/150?img=15',
        location: 'Indore, India'
    },
    {
        id: 'm5',
        name: 'Aditi Rao',
        role: 'Engineering Manager',
        company: 'Swiggy',
        companyType: 'Startup',
        experience: 'Lead',
        skills: ['#EngineeringManagement', '#Backend'],
        impactScore: '9.8k',
        avatar: 'https://i.pravatar.cc/150?img=23',
        location: 'Bangalore, India'
    },
    {
        id: 'm6',
        name: 'Rahul Khanna',
        role: 'Full Stack Dev',
        company: 'Infosys',
        companyType: 'Service',
        experience: 'Entry-Level',
        skills: ['#MERN', '#JavaScript'],
        impactScore: '1.2k',
        avatar: 'https://i.pravatar.cc/150?img=33',
        location: 'Pune, India'
    }
];

export default function MentorDirectory() {
    const [companyFilter, setCompanyFilter] = useState('All');
    const [expFilter, setExpFilter] = useState('All');
    const [activeChatMentor, setActiveChatMentor] = useState<any>(null);
    const [chatInput, setChatInput] = useState('');

    const filteredMentors = MENTORS.filter(m => {
        if (companyFilter !== 'All' && m.companyType !== companyFilter) return false;
        if (expFilter !== 'All' && m.experience !== expFilter) return false;
        return true;
    });

    return (
        <div className="mentor-directory">
            <div className="directory-header">
                <h2>Verified Mentor Network</h2>
                <p>Connect with industry professionals who have vetted our roadmaps and answered student doubts.</p>
            </div>

            <div className="directory-layout">
                <aside className="filters-sidebar">
                    <div className="filter-group">
                        <h3>Company Type</h3>
                        {['All', 'FAANG', 'Startup', 'Service'].map(type => (
                            <label key={type} className="radio-label">
                                <input
                                    type="radio"
                                    name="companyType"
                                    value={type}
                                    checked={companyFilter === type}
                                    onChange={(e) => setCompanyFilter(e.target.value)}
                                />
                                <span>{type}</span>
                            </label>
                        ))}
                    </div>

                    <div className="filter-group">
                        <h3>Experience Level</h3>
                        {['All', 'Entry-Level', 'Mid-Level', 'Senior', 'Lead'].map(exp => (
                            <label key={exp} className="radio-label">
                                <input
                                    type="radio"
                                    name="experience"
                                    value={exp}
                                    checked={expFilter === exp}
                                    onChange={(e) => setExpFilter(e.target.value)}
                                />
                                <span>{exp}</span>
                            </label>
                        ))}
                    </div>
                </aside>

                <div className="mentors-grid">
                    <AnimatePresence mode="popLayout">
                        {filteredMentors.map((mentor) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                key={mentor.id}
                                className="mentor-grid-card"
                            >
                                <div className="card-top">
                                    <div className="avatar-container">
                                        <img src={mentor.avatar} alt={mentor.name} />
                                        <div className="online-indicator"></div>
                                    </div>
                                    <button
                                        className="quick-chat-btn"
                                        onClick={() => setActiveChatMentor(mentor)}
                                    >
                                        <Bot size={16} /> AI-Twin
                                    </button>
                                </div>

                                <h3 className="mentor-name">{mentor.name}</h3>
                                <div className="mentor-role"><Briefcase size={14} /> {mentor.role} @ {mentor.company}</div>
                                <div className="mentor-location"><MapPin size={14} /> {mentor.location}</div>

                                <div className="mentor-skills">
                                    {mentor.skills.map(skill => (
                                        <span key={skill} className="skill-badge">{skill}</span>
                                    ))}
                                </div>

                                <div className="card-bottom">
                                    <div className="impact-stat">
                                        <Users size={14} className="impact-icon" />
                                        <span><strong>{mentor.impactScore}</strong> Students</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {activeChatMentor && (
                    <motion.div
                        className="ai-chat-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveChatMentor(null)}
                    >
                        <motion.div
                            className="ai-chat-modal"
                            initial={{ y: 50, scale: 0.95 }}
                            animate={{ y: 0, scale: 1 }}
                            exit={{ y: 50, scale: 0.95 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="chat-header">
                                <div className="chat-mentor-info">
                                    <img src={activeChatMentor.avatar} alt="Mentor" />
                                    <div>
                                        <h4>{activeChatMentor.name}'s AI-Twin</h4>
                                        <span>Replies instantly</span>
                                    </div>
                                </div>
                                <button className="close-btn" onClick={() => setActiveChatMentor(null)}>
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="chat-messages">
                                <div className="message bot-message">
                                    <div className="message-content">
                                        Hi! I'm {activeChatMentor.name}'s AI-Twin. I'm currently away at work, but my AI-Twin can answer your basic career questions based on my previous 500+ mentorship sessions and technical blogs. What would you like to know?
                                    </div>
                                    <span className="timestamp">Just now</span>
                                </div>
                            </div>

                            <div className="chat-input-area">
                                <input
                                    type="text"
                                    placeholder={`Ask about ${activeChatMentor.skills[0]}...`}
                                    value={chatInput}
                                    onChange={e => setChatInput(e.target.value)}
                                />
                                <button className={`send-btn ${chatInput.trim() ? 'active' : ''}`}>
                                    <Send size={18} />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
