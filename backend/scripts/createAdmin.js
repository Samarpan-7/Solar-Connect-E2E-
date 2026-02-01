const bcrypt = require('bcryptjs');
const db = require('../config/database');

async function createAdmin() {
  try {
    const adminEmail = 'admin@solarconnect.com';
    const adminPassword = 'Admin@123456'; // You can change this
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);
    
    // Check if admin exists
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [adminEmail]);
    
    if (existing.length > 0) {
      console.log('✅ Admin already exists!');
      console.log('Email: admin@solarconnect.com');
      console.log('Password: Admin@123456');
      process.exit(0);
    }
    
    // Create admin
    await db.query(
      'INSERT INTO users (full_name, email, password, user_type, approval_status, is_verified, is_active, survey_completed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      ['Admin', adminEmail, hashedPassword, 'admin', 'approved', true, true, true]
    );
    
    console.log('✅ Admin created successfully!');
    console.log('==========================================');
    console.log('Admin Login Credentials:');
    console.log('Email: admin@solarconnect.com');
    console.log('Password: Admin@123456');
    console.log('==========================================');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
