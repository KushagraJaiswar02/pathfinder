import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, CheckCircle, Clock } from 'lucide-react';

const MentorApplication = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [status, setStatus] = useState('none'); // none, loading, pending, approved

  const handleSubmit = async () => {
    setStatus('loading');
    try {
      const skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean);
      const res = await fetch('/api/mentors/apply', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ bio, skills: skillsArray })
      });
      
      if (res.ok) {
        setStatus('pending');
        // Simulated polling or user waits. The backend does this in 30s async.
        // We will just show a "pending" screen that updates if we naively wait.
        setTimeout(() => {
          setStatus('approved');
        }, 30000);
      } else {
        const errData = await res.json();
        alert('Application Failed: ' + (errData.message || res.statusText));
        setStatus('none');
      }
    } catch (error) {
      console.error('Failed to submit application', error);
      alert('Network Error. Failed to submit application.');
      setStatus('none');
    }
  };

  if (!user) {
    return <div className="text-center py-12">Please log in to apply.</div>;
  }

  if (status === 'pending') {
    return (
      <div className="max-w-xl mx-auto mt-10 card p-10 text-center">
        <Clock size={48} className="text-accent mx-auto mb-4 animate-pulse" />
        <h2 className="text-2xl font-bold mb-2 text-neutral-900">Application Under Review</h2>
        <p className="text-neutral-500 mb-6">Administrators are reviewing your application asynchronously. This usually takes about 30 seconds.</p>
        <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
          <div className="bg-accent h-full animate-[pulse_2s_ease-in-out_infinite]" style={{ width: '100%' }}></div>
        </div>
      </div>
    );
  }

  if (status === 'approved') {
    return (
      <div className="max-w-xl mx-auto mt-10 card p-10 text-center">
        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-neutral-900">You're Approved!</h2>
        <p className="text-neutral-500 mb-6">Congratulations! You are now a Pathfinder mentor.</p>
        <p className="text-sm text-neutral-400 mb-6">(Please log out and log back in to refresh your role across the application seamlessly)</p>
        <button onClick={() => navigate('/')} className="btn-primary">Return to Feed</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="mb-8 pl-8 border-l-4 border-accent">
        <h1 className="text-3xl font-bold text-neutral-900">Become a Mentor</h1>
        <p className="text-neutral-500 mt-2">Guide the next generation and unlock exclusive badges.</p>
      </div>

      <div className="card p-8 bg-white">
        <div className="flex border-b border-neutral-100 mb-8 pb-4">
          <div className={`flex-1 text-center font-bold text-sm uppercase tracking-wider ${step >= 1 ? 'text-accent' : 'text-neutral-400'}`}>1. Background</div>
          <div className={`flex-1 text-center font-bold text-sm uppercase tracking-wider ${step >= 2 ? 'text-accent' : 'text-neutral-400'}`}>2. Expertise</div>
          <div className={`flex-1 text-center font-bold text-sm uppercase tracking-wider ${step >= 3 ? 'text-accent' : 'text-neutral-400'}`}>3. Review</div>
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-neutral-900">Tell us about your background</h2>
            <p className="text-sm text-neutral-500">What is your current role and what have you achieved?</p>
            <textarea
              className="w-full p-4 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent outline-none"
              rows="5"
              placeholder="e.g., Senior Engineer at XYZ. Cracked FAANG after multiple tries..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <div className="flex justify-end">
              <button disabled={bio.length < 10} onClick={() => setStep(2)} className="btn-primary px-8">Next Step</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-neutral-900">Your Areas of Help</h2>
            <p className="text-sm text-neutral-500">List specific skills or topics you can guide students on (comma separated)</p>
            <input
              type="text"
              className="w-full p-4 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent outline-none"
              placeholder="e.g., System Design, Resume Review, Product Management"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="btn-secondary px-8">Back</button>
              <button disabled={skills.length < 3} onClick={() => setStep(3)} className="btn-primary px-8">Next Step</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-neutral-900">Review & Submit</h2>
            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200 mb-6">
              <h3 className="font-bold text-neutral-700 text-sm mb-2 uppercase">Background</h3>
              <p className="text-neutral-600 mb-6">{bio}</p>
              
              <h3 className="font-bold text-neutral-700 text-sm mb-2 uppercase">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.split(',').map(s => s.trim()).filter(Boolean).map(skill => (
                  <span key={skill} className="bg-accent-soft text-accent px-2 py-1 rounded-full text-xs font-medium">{skill}</span>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button onClick={() => setStep(2)} className="text-neutral-500 font-medium hover:text-neutral-800">Back</button>
              <button 
                onClick={handleSubmit} 
                disabled={status === 'loading'}
                className="btn-primary px-8 flex items-center space-x-2"
              >
                <Briefcase size={18} />
                <span>Submit Application</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MentorApplication;
