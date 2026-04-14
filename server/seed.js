const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Question = require('./models/Question');
const Comment = require('./models/Comment');
const Review = require('./models/Review');

const seedDatabase = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in the environment variables.");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // 1. Drop existing collections cleanly
    console.log('Clearing database...');
    // Note: The prompt mentioned roadmaps and sessions, but those models do not exist yet. 
    // We clear what we have correctly modelled.
    await User.deleteMany({});
    await Question.deleteMany({});
    await Comment.deleteMany({});
    await Review.deleteMany({});

    // 2. Create standard data structures
    const defaultPassword = await bcrypt.hash('password123', 10);

    const mentorsData = [
      {
        name: 'Arjun Mehta',
        email: 'arjun@example.com',
        passwordHash: defaultPassword,
        role: 'mentor',
        skills: ['System Design', 'DSA', 'Competitive Programming'],
        bio: 'SDE-2 at Google Bangalore. Cracked FAANG after 3 attempts. Happy to help.',
        rating: 4.8,
        reviewCount: 34
      },
      {
        name: 'Priya Sharma',
        email: 'priya@example.com',
        passwordHash: defaultPassword,
        role: 'mentor',
        skills: ['Product Management', 'UX Research', 'Career Pivots'],
        bio: 'PM at Flipkart. Previously engineer. Love helping engineers transition to PM roles.',
        rating: 4.6,
        reviewCount: 21
      },
      {
        name: 'Rahul Nair',
        email: 'rahul@example.com',
        passwordHash: defaultPassword,
        role: 'mentor',
        skills: ['Finance', 'CFA Prep', 'Investment Banking'],
        bio: 'Associate at JP Morgan Mumbai. CFA Level 3 cleared. Guiding finance aspirants.',
        rating: 4.9,
        reviewCount: 47
      }
    ];

    const studentsData = [
      { name: 'Aarav Patel', email: 'aarav@example.com', passwordHash: defaultPassword, role: 'student', bio: 'IIT Bombay 3rd yr CSE' },
      { name: 'Sneha Reddy', email: 'sneha@example.com', passwordHash: defaultPassword, role: 'student', bio: 'Delhi Univ BCom' },
      { name: 'Karan Singh', email: 'karan@example.com', passwordHash: defaultPassword, role: 'student', bio: 'NIT Trichy ECE' },
      { name: 'Meera Joshi', email: 'meera@example.com', passwordHash: defaultPassword, role: 'student', bio: 'Christ College Bengaluru' },
      { name: 'Rohan Das', email: 'rohan@example.com', passwordHash: defaultPassword, role: 'student', bio: 'BITS Pilani' },
      { name: 'Ananya Iyer', email: 'ananya@example.com', passwordHash: defaultPassword, role: 'student', bio: 'Symbiosis Pune MBA aspirant' },
      { name: 'Dev Malhotra', email: 'dev@example.com', passwordHash: defaultPassword, role: 'student', bio: 'Jadavpur Univ' }
    ];

    const mentors = await User.insertMany(mentorsData);
    const students = await User.insertMany(studentsData);
    const allUsers = [...mentors, ...students];
    const totalUsers = allUsers.length;

    // 3. Create Questions (12 total, 4 anonymous)
    const questionsData = [
      {
        authorId: students[0]._id,
        title: 'How do I start DSA from scratch in 6 months for placements?',
        body: 'I am a 3rd yr CSE student and I feel hopelessly behind. What topics should I prioritize to clear OAs for product based companies?',
        tags: ['dsa', 'campus', 'engineering'],
        isAnonymous: false,
        commentCount: 4 
      },
      {
        authorId: students[1]._id,
        title: 'Is BCom + CA still worth it in 2025 or should I pivot to data analytics?',
        body: 'Seeing the tech boom, Im questioning my path. Is CA still a solid future-proof career, or should I start learning SQL and Python?',
        tags: ['finance', 'career-switch'],
        isAnonymous: false,
        commentCount: 2
      },
      {
        authorId: students[2]._id,
        title: 'How did you deal with rejection after 40+ interview failures?',
        body: 'I have been trying for off-campus roles but cracking the final round seems impossible. My morale is rock bottom.',
        tags: ['campus', 'engineering'],
        isAnonymous: true,
        commentCount: 3
      },
      {
        authorId: students[3]._id,
        title: 'What\'s the difference between on-campus and off-campus placements?',
        body: 'My college doesn\'t have great companies visiting. How much harder is the off-campus route? Any particular hack to get referrals?',
        tags: ['campus', 'internship'],
        isAnonymous: false,
        commentCount: 2
      },
      {
        authorId: students[4]._id,
        title: 'Should I do an MBA right after BTech or get 2 years of experience first?',
        body: 'Professors say study now, alumni say work first. What actually holds more value in top IIMs and during MBA placements?',
        tags: ['mba', 'engineering'],
        isAnonymous: false,
        commentCount: 1
      },
      {
        authorId: students[5]._id,
        title: 'Profile evaluation for Symbiosis/NMIMS - converting waitlists?',
        body: 'I have an 8/8/7 profile with 1 year work exp. Anyone who converted similar stats?',
        tags: ['mba', 'campus'],
        isAnonymous: false,
        commentCount: 0
      },
      {
        authorId: students[6]._id,
        title: 'How to transition from Core ECE to Product Management?',
        body: 'I like managing things more than coding. Do I necessarily need an MBA or can I crack APM roles off-campus directly?',
        tags: ['product', 'career-switch', 'engineering'],
        isAnonymous: true,
        commentCount: 2
      },
      {
        authorId: students[0]._id,
        title: 'Is Leetcode medium enough or should I do Codeforces?',
        body: 'Everyone is doing CP nowadays. Will standard Leetcode patterns be enough for FAANG interviews in 2025?',
        tags: ['dsa', 'engineering'],
        isAnonymous: false,
        commentCount: 3
      },
      {
        authorId: students[1]._id,
        title: 'Best resources for CFA Level 1 preparation?',
        body: 'Working full time and trying to study for CFA Level 1 in August. Any specific material that helps cut down reading time?',
        tags: ['finance'],
        isAnonymous: true,
        commentCount: 1
      },
      {
        authorId: students[2]._id,
        title: 'How to score a summer internship in 2nd year?',
        body: 'Most companies only hire 3rd year students. What kind of startups should I target right now?',
        tags: ['internship', 'campus'],
        isAnonymous: false,
        commentCount: 0
      },
      {
        authorId: students[3]._id,
        title: 'Is a Master\'s abroad worth taking a massive education loan?',
        body: 'Getting admits from state universities in the US but the loan amount is terrifying given the current job market. Should I reconsider?',
        tags: ['engineering', 'finance'],
        isAnonymous: true,
        commentCount: 2
      },
      {
        authorId: students[4]._id,
        title: 'Resume tailoring - should I have 5 different resumes?',
        body: 'Applied to 200+ companies but getting zero callbacks. Is it because my resume is hitting multiple domains (Frontend, Backend, Data)?',
        tags: ['engineering', 'career-switch'],
        isAnonymous: false,
        commentCount: 0
      }
    ];

    const questions = await Question.insertMany(questionsData);
    let totalQuestions = questions.length;

    // 4. Create Comments (20 total, 5 with replies)
    const commentsData = [
      // Q1: DSA (4 comments)
      { questionId: questions[0]._id, authorId: mentors[0]._id, body: 'Start with mastering basic patterns (Two Pointers, Sliding Window, DFS/BFS, Binary Search). Don\'t just solve random problems. Consistency is key - 2 problems a day for 6 months will get you further than cramming.' },
      { questionId: questions[0]._id, authorId: students[5]._id, body: 'Check out Neetcode 150, it helped me build a great foundation!' },
      { questionId: questions[0]._id, authorId: mentors[0]._id, body: 'Agreed, Neetcode is an excellent structured resource. After that, pick up company-specific tags on Leetcode about a month before interviews.' }, // Reply to 2nd comment (we'll structure parentId below)
      { questionId: questions[0]._id, authorId: students[2]._id, body: 'I am struggling with DP specifically, any tips?' },
      
      // Q2: BCom + CA vs Data (2 comments)
      { questionId: questions[1]._id, authorId: mentors[2]._id, body: 'CA is incredibly robust, but it\'s a long journey. The convergence of Finance and Data is huge right now. A BCom graduate who understands SQL and Python can easily crack Financial Analyst roles.' },
      { questionId: questions[1]._id, authorId: students[1]._id, body: 'Thanks, this gives me some clarity. I\'ll start with some basic Python weekends.' },

      // Q3: Deal with rejection (3 comments)
      { questionId: questions[2]._id, authorId: mentors[1]._id, body: 'Rejection is redirection. Every "no" is data. Were you failing technical rounds? System design? Behavioral? Isolate the specific weakness, fix it, and go again. We\'ve all been there.' },
      { questionId: questions[2]._id, authorId: students[0]._id, body: 'Happened to me last year. Just take a 1 week break entirely away from screens. It does wonders.' },
      { questionId: questions[2]._id, authorId: students[4]._id, body: 'I second this. Burnout is real. You need to detach your self-worth from the interview outcomes.' },

      // Q4: On vs Off Campus (2 comments)
      { questionId: questions[3]._id, authorId: mentors[0]._id, body: 'Off-campus is definitely harder because the applicant pool is much wider. Referrals are your best bet. Build projects that stand out, and engage thoughtfully on LinkedIn to organically get noticed by recruiters.' },
      { questionId: questions[3]._id, authorId: students[6]._id, body: 'Cold emailing directly to startup founders also has a very high success rate for off-campus. Skip the HR queue.' },

      // Q5: MBA now or later (1 comment)
      { questionId: questions[4]._id, authorId: mentors[1]._id, body: 'If it\'s a top IIM, go immediately as campus placements don\'t heavily penalize freshers. If you want a global MBA later, you absolutely need 3-5 years of solid experience first.' },

      // Q7: ECE to PM (2 comments)
      { questionId: questions[6]._id, authorId: mentors[1]._id, body: 'You don\'t NEED an MBA! I made the transition internally. The best way is to start acting like a PM in your current engineering projects. Document requirements, talk to users, and write good PRDs.' },
      { questionId: questions[6]._id, authorId: students[5]._id, body: 'Are there any specific APM programs that hire freshers?' },

      // Q8: Leetcode vs Codeforces (3 comments)
      { questionId: questions[7]._id, authorId: mentors[0]._id, body: 'For 95% of FAANG interviews, Leetcode Medium/Hard is more than enough. Codeforces is great for competitive programming, but interviews are about communicating your thought process, not just blazing fast math.' },
      { questionId: questions[7]._id, authorId: students[3]._id, body: 'Good to know. It feels like everyone is a Master on Codeforces lately.' },
      { questionId: questions[7]._id, authorId: mentors[0]._id, body: 'Don\'t let the vocal minority intimidate you. Most placed candidates aren\'t doing CP.' },

      // Q9: CFA Level 1 (1 comment)
      { questionId: questions[8]._id, authorId: mentors[2]._id, body: 'Kaplan Schweser notes are your best friend here. The official CFAI material is too dense if you\'re working full time. Focus heavily on Ethics and FRA - those make or break Level 1.' },

      // Q11: Master's abroad loan (2 comments)
      { questionId: questions[10]._id, authorId: mentors[1]._id, body: 'It\'s incredibly risky right now. If your goal is just to settle there, know that H1B lotteries are crowded. If your goal is strictly education, consider strong EU programs which are significantly cheaper.' },
      { questionId: questions[10]._id, authorId: students[6]._id, body: 'Agreed, I dropped my US plans and ended up getting a great role in Bangalore instead. No regrets.' }
    ];

    // Insert top-level comments first
    const insertedComments = await Comment.insertMany(commentsData);
    let totalComments = insertedComments.length;

    // Apply parent relationships (simulating 5 replies)
    // 1. Reply to "Check out Neetcode"
    insertedComments[2].parentId = insertedComments[1]._id;
    await insertedComments[2].save();
    
    // 2. Reply to "CA is robust"
    insertedComments[5].parentId = insertedComments[4]._id;
    await insertedComments[5].save();

    // 3. Reply to "Take a 1 week break"
    insertedComments[8].parentId = insertedComments[7]._id;
    await insertedComments[8].save();

    // 4. Reply to "Cold emailing"
    insertedComments[10].parentId = insertedComments[9]._id;
    await insertedComments[10].save();

    // 5. Reply to "Codeforces vs Leetcode"
    insertedComments[16].parentId = insertedComments[15]._id;
    await insertedComments[16].save();
    
    // 6. Review Data (6 total, 2 per mentor)
    const reviewsData = [
      { mentorId: mentors[0]._id, reviewerId: students[0]._id, rating: 5, comment: 'Arjun helped me crack my Google L4 interview in just 3 sessions. His mock interviews are incredibly close to the real thing!' },
      { mentorId: mentors[0]._id, reviewerId: students[2]._id, rating: 4, comment: 'Really solid system design advice. Pointed out flaws in my caching strategy I never would have noticed.' },
      { mentorId: mentors[1]._id, reviewerId: students[4]._id, rating: 5, comment: 'Priya completely revamped my resume and narrative. I shifted from Frontend to PM smoothly thanks to her insights.' },
      { mentorId: mentors[1]._id, reviewerId: students[5]._id, rating: 4, comment: 'Great session, very candid feedback on my MBA profile and alternatives.' },
      { mentorId: mentors[2]._id, reviewerId: students[1]._id, rating: 5, comment: 'Rahul\'s study schedule for CFA Level 1 saved me so much time. Highly recommend his 1-on-1 prep strategy.' },
      { mentorId: mentors[2]._id, reviewerId: students[6]._id, rating: 5, comment: 'The best mentor for anyone eyeing Investment Banking in India.' }
    ];

    await Review.insertMany(reviewsData);

    console.log(`Seeded ${totalUsers} users, ${totalQuestions} questions, ${totalComments} comments`);
    process.exit(0);

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
