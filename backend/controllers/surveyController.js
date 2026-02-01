const db = require('../config/database');

exports.submitSurvey = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      awareness_level,
      willing_to_adopt,
      budget_range,
      property_type,
      electricity_bill_monthly,
      primary_concern,
      total_score,
      recommendation
    } = req.body;

    // Insert survey response
    await db.query(
      `INSERT INTO survey_responses 
      (user_id, awareness_level, willing_to_adopt, budget_range, property_type, 
       electricity_bill_monthly, primary_concern) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, awareness_level, willing_to_adopt, budget_range, property_type, 
       electricity_bill_monthly, primary_concern]
    );

    // Mark survey as completed for user
    await db.query(
      'UPDATE users SET survey_completed = TRUE WHERE id = ?',
      [userId]
    );

    res.status(200).json({
      success: true,
      message: 'Survey submitted successfully',
      totalScore: total_score,
      recommendation: recommendation
    });
  } catch (error) {
    console.error('Survey submission error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit survey. Please try again.' 
    });
  }
};
