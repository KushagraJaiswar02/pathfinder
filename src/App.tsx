import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import DoubtFeed from './components/DoubtFeed';
import MentorSidebar from './components/MentorSidebar';
import ActionFab from './components/ActionFab';
import MentorDirectory from './components/MentorDirectory';
import InteractiveRoadmaps from './components/InteractiveRoadmaps';

function App() {
    const [activeTab, setActiveTab] = useState<'feed' | 'mentors' | 'roadmaps'>('feed');

    const tabVariants = {
        initial: { opacity: 0, x: -20 },
        in: { opacity: 1, x: 0 },
        out: { opacity: 0, x: 20 }
    };

    const tabTransition = {
        type: 'tween',
        ease: 'anticipate',
        duration: 0.3
    };

    return (
        <div className="app-container">
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="main-content-wrapper" style={{ flex: 1, position: 'relative' }}>
                <AnimatePresence mode="wait">
                    {activeTab === 'feed' && (
                        <motion.main
                            key="feed"
                            initial="initial" animate="in" exit="out"
                            variants={tabVariants} transition={tabTransition}
                            className="main-content"
                        >
                            <DoubtFeed />
                            <MentorSidebar />
                        </motion.main>
                    )}

                    {activeTab === 'mentors' && (
                        <motion.main
                            key="mentors"
                            initial="initial" animate="in" exit="out"
                            variants={tabVariants} transition={tabTransition}
                            className="full-width-content"
                        >
                            <MentorDirectory />
                        </motion.main>
                    )}

                    {activeTab === 'roadmaps' && (
                        <motion.main
                            key="roadmaps"
                            initial="initial" animate="in" exit="out"
                            variants={tabVariants} transition={tabTransition}
                            className="full-width-content"
                        >
                            <InteractiveRoadmaps />
                        </motion.main>
                    )}
                </AnimatePresence>
            </div>

            <ActionFab />
        </div>
    );
}

export default App;
