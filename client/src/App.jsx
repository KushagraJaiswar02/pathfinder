import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import QuestionDetail from './pages/QuestionDetail';
import MentorList from './pages/MentorList';
import MentorProfile from './pages/MentorProfile';
import MentorApplication from './pages/MentorApplication';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/questions/:id" element={<QuestionDetail />} />
            <Route path="/mentors" element={<MentorList />} />
            <Route path="/mentors/:id" element={<MentorProfile />} />
            <Route path="/apply-mentor" element={<MentorApplication />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
