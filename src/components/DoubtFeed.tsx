import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DoubtCard from './DoubtCard';
import './DoubtFeed.css';

const MOCK_DOUBTS = [
    {
        id: '1',
        user: 'Amit Sharma',
        avatar: 'https://i.pravatar.cc/150?img=12',
        timestamp: '2 hours ago',
        doubt: 'Confused between DSA and Web Dev for placements. Should I focus strictly on Leetcode or build full-stack projects?',
        tags: ['#Tier3College', '#Placement2027', '#DSAvsWebDev'],
        expertName: 'Priya Patel',
        expertRole: 'Senior SDE',
        expertCompany: 'Amazon',
        expertAvatar: 'https://i.pravatar.cc/150?img=47',
        tldr: 'Do both, but sequentially. Master core DSA (Arrays, Strings, Trees) to clear online assessments, then build 2 solid full-stack MERN projects to stand out in interviews.',
        response: "From my experience interviewing hundreds of candidates at Amazon: companies use DSA to filter candidates, but your web dev projects are what get you the actual job offer. Start your day with 1 hour of Leetcode. Spend the rest of your study time building a real-world application. Don't fall into the trap of doing 500+ Leetcode questions without a single project to show.",
        initialUpvotes: 342,
        initialComments: 45
    },
    {
        id: '2',
        user: 'Rahul Singh',
        avatar: 'https://i.pravatar.cc/150?img=33',
        timestamp: '5 hours ago',
        doubt: 'How important is Open Source contribution for a fresher without internship experience?',
        tags: ['#OpenSource', '#Fresher', '#CareerAdvice'],
        expertName: 'Ankit Gupta',
        expertRole: 'Engineering Manager',
        expertCompany: 'Google',
        expertAvatar: 'https://i.pravatar.cc/150?img=68',
        tldr: 'Extremely valuable. It serves as proof of work. Contributing to popular repos shows you can read enterprise code, use git collaboratively, and communicate effectively.',
        response: "When I review resumes of candidates with no internships, open-source contributions are the first thing I look for. It proves you understand complex codebases. Start small: find 'good first issue' tags on GitHub. Fix documentation, write tests, and gradually move to feature implementation. Mentioning a merged PR in a major tool (like React or Vite) is often better than a decent internship.",
        initialUpvotes: 891,
        initialComments: 112
    }
];

const LOCAL_DOUBTS = [
    {
        id: 'local-1',
        user: 'Anjali Desai',
        avatar: 'https://i.pravatar.cc/150?img=42',
        timestamp: '1 hour ago',
        doubt: 'How I cracked a 12 LPA job from a Tier-3 college in MP (Indore/Ujjain region)? What local companies visit?',
        tags: ['#Tier3MP', '#IndoreIT', '#Ujjain', '#OffCampus'],
        expertName: 'Vikram Joshi',
        expertRole: 'SDE II',
        expertCompany: 'TCS Digital',
        expertAvatar: 'https://i.pravatar.cc/150?img=15',
        tldr: 'Focus on off-campus drives for service-based MNCs in Indore (TCS, Infosys) but aim for product-based via remote internships.',
        response: "I graduated from a Tier-3 college near Indore. The secret is that you shouldn't just rely on campus placements. Build a strong GitHub, participate in central India hackathons, and apply for remote internships at startups. Many local companies like Impetus and Yash Technologies look for strong fundamental skills.",
        initialUpvotes: 520,
        initialComments: 88
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

export default function DoubtFeed() {
    const [contextFilter, setContextFilter] = useState<'global' | 'local'>('global');

    const displayDoubts = contextFilter === 'global' ? MOCK_DOUBTS : LOCAL_DOUBTS;

    return (
        <section className="doubt-feed">
            <div className="feed-header">
                <h2>{contextFilter === 'global' ? 'Trending Doubts' : 'Local Context (Ujjain/Tier-3)'}</h2>
                <div className="context-toggles">
                    <button
                        className={`context-toggle-btn ${contextFilter === 'global' ? 'active' : ''}`}
                        onClick={() => setContextFilter('global')}
                    >Global Advice</button>
                    <button
                        className={`context-toggle-btn ${contextFilter === 'local' ? 'active' : ''}`}
                        onClick={() => setContextFilter('local')}
                    >My Local Context</button>
                </div>
            </div>

            <motion.div
                className="feed-list"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={contextFilter}
            >
                {displayDoubts.map(doubt => (
                    <DoubtCard key={doubt.id} data={doubt} />
                ))}
            </motion.div>
        </section>
    );
}
