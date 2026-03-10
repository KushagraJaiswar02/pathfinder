import React from 'react';
import Header from './components/Header';
import DoubtFeed from './components/DoubtFeed';
import MentorSidebar from './components/MentorSidebar';
import ActionFab from './components/ActionFab';

function App() {
    return (
        <div className="app-container">
            <Header />

            <main className="main-content">
                <DoubtFeed />
                <MentorSidebar />
            </main>

            <ActionFab />
        </div>
    );
}

export default App;
