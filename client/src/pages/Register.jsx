import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      authLogin(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="card p-8">
        <div className="flex justify-center mb-6 text-accent">
          <UserPlus size={48} />
        </div>
        <h1 className="text-2xl font-bold text-center text-neutral-900 mb-2">Create an Account</h1>
        <p className="text-center text-neutral-500 mb-8">Join the PathFinder community</p>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full p-3 border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-accent focus:border-accent"
              placeholder="Jane Doe"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              required
              className="w-full p-3 border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-accent focus:border-accent"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full p-3 border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-accent focus:border-accent"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Role</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={formData.role === 'student'}
                  onChange={handleChange}
                  className="text-accent focus:ring-accent"
                />
                <span className="text-neutral-700 font-medium">Student</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="mentor"
                  checked={formData.role === 'mentor'}
                  onChange={handleChange}
                  className="text-accent focus:ring-accent"
                />
                <span className="text-neutral-700 font-medium">Mentor</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 flex justify-center items-center space-x-2 mt-4"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-neutral-500">
          Already have an account?{' '}
          <Link to="/login" className="text-accent font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
