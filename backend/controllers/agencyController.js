const db = require('../config/database');

// Get all approved providers
exports.getProviders = async (req, res) => {
  try {
    const [providers] = await db.query(
      `SELECT u.id, u.full_name, u.email, u.phone, 
              sp.company_name, sp.experience_years, sp.rating, sp.total_reviews,
              sp.installation_cost_range, sp.warranty_years, sp.government_subsidy_support,
              sp.certifications, sp.service_areas
       FROM users u
       INNER JOIN solar_providers sp ON u.id = sp.user_id
       WHERE u.user_type = 'provider' AND u.approval_status = 'approved' AND u.is_active = TRUE
       ORDER BY sp.rating DESC`
    );

    res.status(200).json({
      success: true,
      providers
    });
  } catch (error) {
    console.error('Get providers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch providers'
    });
  }
};

// Contact provider
exports.contactProvider = async (req, res) => {
  try {
    const { providerId } = req.params;
    const { customerName, customerEmail, customerPhone, message } = req.body;

    // Get provider details
    const [providers] = await db.query(
      'SELECT u.email, u.phone, sp.company_name FROM users u INNER JOIN solar_providers sp ON u.id = sp.user_id WHERE u.id = ?',
      [providerId]
    );

    if (providers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Provider not found'
      });
    }

    // In a real application, you would send an email/SMS notification here
    console.log('Contact request:', {
      provider: providers[0],
      customer: { customerName, customerEmail, customerPhone, message }
    });

    res.status(200).json({
      success: true,
      message: 'Contact request sent successfully',
      providerContact: {
        email: providers[0].email,
        phone: providers[0].phone,
        company: providers[0].company_name
      }
    });
  } catch (error) {
    console.error('Contact provider error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send contact request'
    });
  }
};
