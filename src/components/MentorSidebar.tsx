import React from 'react';
import { Award, Briefcase, TrendingUp } from 'lucide-react';
import './MentorSidebar.css';

const TOP_MENTORS = [
    {
        id: 1,
        name: 'Neha Verma',
        role: 'Staff Engineer',
        company: 'Google',
        companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
        impactScore: '12.4k',
        avatar: 'https://i.pravatar.cc/150?img=5',
    },
    {
        id: 2,
        name: 'Karan Ahuja',
        role: 'SDE II',
        company: 'Microsoft',
        companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
        impactScore: '8.2k',
        avatar: 'https://i.pravatar.cc/150?img=11',
    },
    {
        id: 3,
        name: 'Simran Kaur',
        role: 'Frontend Lead',
        company: 'Zomato',
        companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/b/cb/Zomato_logo.png',
        impactScore: '5.6k',
        avatar: 'https://i.pravatar.cc/150?img=9',
    }
];

export default function MentorSidebar() {
    return (
        <aside className="mentor-sidebar">
            <div className="sidebar-widget mentor-spotlight">
                <div className="widget-header">
                    <Award className="widget-icon" />
                    <h3>Mentor Spotlight</h3>
                </div>

                <div className="mentor-list">
                    {TOP_MENTORS.map(mentor => (
                        <div key={mentor.id} className="mentor-list-item">
                            <div className="avatar-wrapper">
                                <img src={mentor.avatar} alt={mentor.name} className="sidebar-avatar" />
                                <div className="online-indicator animate-pulse-glow-green"></div>
                            </div>
                            <div className="mentor-info">
                                <h4>{mentor.name}</h4>
                                <div className="mentor-work">
                                    <span className="mentor-role">{mentor.role}</span>
                                    <span className="dot">•</span>
                                    <span className="mentor-company">
                                        <img src={mentor.companyLogo} alt={mentor.company} className="company-tiny-logo" />
                                        {mentor.company}
                                    </span>
                                </div>
                            </div>
                            <div className="impact-score">
                                <TrendingUp size={14} className="impact-icon" />
                                <span>{mentor.impactScore}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="view-all-mentors">View All Mentors</button>

                <div className="active-mentors-counter">
                    <div className="pulse-dot-green"></div>
                    <span>42 Mentors from FAANG currently answering doubts</span>
                </div>
            </div>

            <div className="sidebar-widget career-stats">
                <div className="widget-header">
                    <Briefcase className="widget-icon" />
                    <h3>Your Career Path</h3>
                </div>
                <div className="stats-content">
                    <div className="stat-row">
                        <span className="stat-label">Goal</span>
                        <span className="stat-value">Full-Stack Dev</span>
                    </div>
                    <div className="stat-row">
                        <span className="stat-label">Readiness</span>
                        <div className="progress-bar-container">
                            <div className="progress-fill" style={{ width: '65%' }}></div>
                        </div>
                        <span className="stat-percent">65%</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
