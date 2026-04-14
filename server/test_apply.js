(async () => {
  try {
    // 1. Login to get token
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'priya@example.com', password: 'password123' })
    });
    
    if (!loginRes.ok) throw new Error('Login failed: ' + loginRes.statusText);
    
    const loginData = await loginRes.json();
    const token = loginData.token;
    console.log('Logged in, got token.');

    // 2. Apply to be a mentor
    const applyRes = await fetch('http://localhost:5000/api/mentors/apply', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ bio: 'Test bio over 10 chars', skills: ['react', 'node'] })
    });

    console.log('Apply Status:', applyRes.status);
    const applyData = await applyRes.json();
    console.log('Apply Response:', applyData);
  } catch (err) {
    console.error('Error:', err);
  }
})();
