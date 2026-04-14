import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Compass, Users, LogIn, LogOut, UserPlus, Trophy } from 'lucide-react';
import NotificationBell from './NotificationBell';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-neutral-200 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-accent tracking-tight">
          PathFinder
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2 text-neutral-600 hover:text-accent transition-colors">
            <Compass size={20} />
            <span className="font-medium">Feed</span>
          </Link>
          <Link to="/mentors" className="flex items-center space-x-2 text-neutral-600 hover:text-accent transition-colors">
            <Users size={20} />
            <span className="font-medium">Mentors</span>
          </Link>
          <Link to="/leaderboard" className="flex items-center space-x-2 text-neutral-600 hover:text-accent transition-colors">
            <Trophy size={20} />
            <span className="font-medium">Leaderboard</span>
          </Link>
          
          <div className="h-6 w-px bg-neutral-200 mx-2" />
          
          {user ? (
            <div className="flex items-center space-x-4">
              <NotificationBell />
              <div className="h-4 w-px bg-neutral-200 mx-1" />
              <span className="text-sm font-medium text-neutral-500">Hi, {user.name}</span>
              <button 
                onClick={logout}
                className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors font-medium"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="flex items-center space-x-2 text-neutral-600 hover:text-accent transition-colors font-medium">
                <LogIn size={20} />
                <span>Login</span>
              </Link>
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
