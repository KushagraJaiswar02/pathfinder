import { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const NotificationBell = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const res = await fetch('/api/notifications', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Optional: poll every 30s
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [user]);

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpen = async () => {
    setIsOpen(!isOpen);
    
    const hasUnread = notifications.some(n => !n.isRead);
    if (!isOpen && hasUnread) {
      try {
        await fetch('/api/notifications/read', {
          method: 'PATCH',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        // Optimistically mark all read
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
      } catch (err) {
        console.error('Failed to mark read', err);
      }
    }
  };

  if (!user) return null;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={handleOpen}
        className="p-2 text-neutral-600 hover:text-accent transition-colors relative flex items-center justify-center focus:outline-none"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-neutral-100 z-50 overflow-hidden transform origin-top-right transition-all">
          <div className="p-4 border-b border-neutral-100 flex justify-between items-center bg-neutral-50">
            <h3 className="font-bold text-neutral-900">Notifications</h3>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-neutral-500 text-sm">
                No new notifications.
              </div>
            ) : (
              <div className="divide-y divide-neutral-50">
                {notifications.map(notification => (
                  <Link 
                    key={notification._id}
                    to={`/questions/${notification.questionId}`}
                    onClick={() => setIsOpen(false)}
                    className={`block p-4 hover:bg-neutral-50 transition-colors ${!notification.isRead ? 'bg-accent-soft/30' : ''}`}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-neutral-800">
                        <span className="font-semibold text-accent">{notification.senderId?.name || 'Someone'}</span> replied to your question.
                      </span>
                      <span className="text-xs text-neutral-400">
                        {new Date(notification.createdAt).toLocaleDateString()} at {new Date(notification.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
