import React from 'react';
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

export default function DoubtFeed() {
    return (
        <section className="doubt-feed">
            <div className="feed-header">
                <h2>Trending Doubts</h2>
                <div className="feed-filters">
                    <button className="filter-btn active">Hot</button>
                    <button className="filter-btn">New</button>
                    <button className="filter-btn">Unanswered</button>
                </div>
            </div>

            <div className="feed-list">
                {MOCK_DOUBTS.map(doubt => (
                    <DoubtCard key={doubt.id} data={doubt} />
                ))}
            </div>
        </section>
    );
}
