import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

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
          <LogIn size={48} />
        </div>
        <h1 className="text-2xl font-bold text-center text-neutral-900 mb-2">Welcome Back</h1>
        <p className="text-center text-neutral-500 mb-8">Sign in to continue to PathFinder</p>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full p-3 border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-accent focus:border-accent"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full p-3 border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-accent focus:border-accent"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 flex justify-center items-center space-x-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-neutral-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-accent font-semibold hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
