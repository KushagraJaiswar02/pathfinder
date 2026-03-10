import React, { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, Map, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';

interface HeaderProps {
    activeTab: 'feed' | 'mentors' | 'roadmaps';
    setActiveTab: (tab: 'feed' | 'mentors' | 'roadmaps') => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [scanning, setScanning] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);
        if (val.toLowerCase().includes('mern')) {
            setScanning(true);
            setTimeout(() => setScanning(false), 1500);
        }
    };

    const showDropdown = isFocused && query.length > 0;

    return (
        <header className="site-header">
            <div className="header-container">
                <div className="logo-area">
                    <div className="logo-icon">
                        <Map className="icon-map" />
                    </div>
                    <span className="logo-text">Pathfinder</span>
                </div>

                <nav className="main-nav">
                    <button
                        className={`nav-link ${activeTab === 'feed' ? 'active' : ''}`}
                        onClick={() => setActiveTab('feed')}
                    >Feed</button>
                    <button
                        className={`nav-link ${activeTab === 'mentors' ? 'active' : ''}`}
                        onClick={() => setActiveTab('mentors')}
                    >Mentors</button>
                    <button
                        className={`nav-link ${activeTab === 'roadmaps' ? 'active' : ''}`}
                        onClick={() => setActiveTab('roadmaps')}
                    >Roadmaps</button>
                </nav>

                <div className="search-wrapper" ref={dropdownRef}>
                    <div className={`search-bar ${isFocused ? 'focused' : ''}`}>
                        <Sparkles className="search-icon-left" size={18} />
                        <input
                            type="text"
                            placeholder="Ask anything... 'How to learn MERN?'"
                            value={query}
                            onChange={handleInput}
                            onFocus={() => setIsFocused(true)}
                            className="search-input"
                        />
                        {query && (
                            <button className="clear-btn" onClick={() => setQuery('')}>
                                <X size={16} />
                            </button>
                        )}
                        {!query && <Search className="search-icon-right" size={18} />}
                    </div>

                    <AnimatePresence>
                        {showDropdown && (
                            <motion.div
                                className="search-dropdown"
                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                            >
                                {scanning ? (
                                    <div className="scanning-state">
                                        <div className="spinner"></div>
                                        <p>Scanning 1,200 Mentor Responses...</p>
                                    </div>
                                ) : (
                                    <div className="results-state">
                                        <div className="match-header">
                                            <Sparkles size={16} className="match-icon" />
                                            <span>Match Found!</span>
                                        </div>

                                        <div className="preview-card">
                                            <div className="preview-card-header">
                                                <h4>MERN Stack Full Roadmap 2026</h4>
                                                <span className="preview-badge">Trending</span>
                                            </div>
                                            <p className="preview-desc">Curated by Senior SDE @ Amazon. Includes 4 phases: Frontend, Backend, Database, and Deployment.</p>

                                            <button className="view-roadmap-btn">
                                                View Roadmap <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="user-profile">
                    <img src="https://i.pravatar.cc/100?img=11" alt="Profile" className="avatar" />
                </div>
            </div>
        </header>
    );
}
