const db = require('../config/database');

// Get pending users
exports.getPendingUsers = async (req, res) => {
  try {
    const [users] = await db.query(
      `SELECT id, full_name, email, phone, user_type, created_at 
       FROM users 
       WHERE approval_status = 'pending' 
       ORDER BY created_at DESC`
    );

    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    console.error('Get pending users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pending users'
    });
  }
};

// Approve user
exports.approveUser = async (req, res) => {
  try {
    const { userId } = req.params;

    await db.query(
      'UPDATE users SET approval_status = ? WHERE id = ?',
      ['approved', userId]
    );

    res.status(200).json({
      success: true,
      message: 'User approved successfully'
    });
  } catch (error) {
    console.error('Approve user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to approve user'
    });
  }
};

// Reject user
exports.rejectUser = async (req, res) => {
  try {
    const { userId } = req.params;

    await db.query(
      'UPDATE users SET approval_status = ? WHERE id = ?',
      ['rejected', userId]
    );

    res.status(200).json({
      success: true,
      message: 'User rejected successfully'
    });
  } catch (error) {
    console.error('Reject user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reject user'
    });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query(
      `SELECT id, full_name, email, phone, user_type, approval_status, 
              survey_completed, is_active, created_at 
       FROM users 
       WHERE user_type != 'admin'
       ORDER BY created_at DESC`
    );

    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
};

// Get survey statistics
exports.getSurveyStats = async (req, res) => {
  try {
    const [totalUsers] = await db.query(
      'SELECT COUNT(*) as count FROM users WHERE user_type = "customer"'
    );
    
    const [surveysCompleted] = await db.query(
      'SELECT COUNT(*) as count FROM users WHERE user_type = "customer" AND survey_completed = TRUE'
    );
    
    const [awarenesStats] = await db.query(
      'SELECT awareness_level, COUNT(*) as count FROM survey_responses GROUP BY awareness_level'
    );
    
    const [willingnessStats] = await db.query(
      'SELECT willing_to_adopt, COUNT(*) as count FROM survey_responses GROUP BY willing_to_adopt'
    );

    res.status(200).json({
      success: true,
      stats: {
        totalCustomers: totalUsers[0].count,
        surveysCompleted: surveysCompleted[0].count,
        awarenessBreakdown: awarenesStats,
        willingnessBreakdown: willingnessStats
      }
    });
  } catch (error) {
    console.error('Get survey stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch survey statistics'
    });
  }
};
