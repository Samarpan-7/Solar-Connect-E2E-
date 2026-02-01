const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

// Signup Controller
exports.signup = async (req, res) => {
  try {
    const { fullName, email, password, phone, userType } = req.body;

    // Validation
    if (!fullName || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid email address' 
      });
    }

    // Password strength validation
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters long' 
      });
    }

    // Check if user already exists
    const [existingUsers] = await db.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already registered' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Determine approval status based on user type
    const approvalStatus = (userType === 'provider' || userType === 'electrician') ? 'pending' : 'approved';

    // Insert new user
    const [result] = await db.query(
      'INSERT INTO users (full_name, email, password, phone, user_type, approval_status) VALUES (?, ?, ?, ?, ?, ?)',
      [fullName, email, hashedPassword, phone || null, userType || 'customer', approvalStatus]
    );

    // Create user profile
    await db.query(
      'INSERT INTO user_profiles (user_id) VALUES (?)',
      [result.insertId]
    );

    // Generate JWT token
    const token = jwt.sign(
      { id: result.insertId, email, userType: userType || 'customer' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const responseMessage = approvalStatus === 'pending' 
      ? 'Account created! Please wait for admin approval before logging in.'
      : 'Account created successfully';

    res.status(201).json({
      success: true,
      message: responseMessage,
      needsApproval: approvalStatus === 'pending',
      token: approvalStatus === 'approved' ? token : null,
      user: approvalStatus === 'approved' ? {
        id: result.insertId,
        fullName,
        email,
        userType: userType || 'customer'
      } : null
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Registration failed. Please try again.' 
    });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide email and password' 
      });
    }

    // Check if user exists
    const [users] = await db.query(
      'SELECT id, full_name, email, password, user_type, is_active, approval_status, survey_completed FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    const user = users[0];

    // Check if account is active
    if (!user.is_active) {
      return res.status(403).json({ 
        success: false, 
        message: 'Account is deactivated. Please contact support.' 
      });
    }

    // Check approval status
    if (user.approval_status === 'pending') {
      return res.status(403).json({ 
        success: false, 
        message: 'Your account is pending admin approval. Please wait for approval.' 
      });
    }

    if (user.approval_status === 'rejected') {
      return res.status(403).json({ 
        success: false, 
        message: 'Your account registration was rejected. Please contact support.' 
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, userType: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        userType: user.user_type,
        surveyCompleted: user.survey_completed || false,
        needsSurvey: user.user_type === 'customer' && !user.survey_completed
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Login failed. Please try again.' 
    });
  }
};
