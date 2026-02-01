const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Miniminnu#89723',
  database: 'solar_connect_db',
  authPlugins: {
    mysql_native_password: () => () => Buffer.from(require('crypto').randomBytes(20))
  }
});

async function createSampleUsers() {
  try {
    console.log('Creating sample users...\n');

    // Sample Provider User
    const providerPassword = await bcrypt.hash('Provider@123', 10);
    await pool.execute(
      `INSERT INTO users (full_name, email, password, phone, user_type, approval_status, is_verified, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE email=email`,
      ['TechSolar Systems', 'provider@techsolar.com', providerPassword, '+91-9876543210', 'provider', 'approved', 1, 1]
    );
    console.log('✅ Created provider user: provider@techsolar.com / Provider@123');

    // Sample Electrician User
    const electricianPassword = await bcrypt.hash('Electrician@123', 10);
    await pool.execute(
      `INSERT INTO users (full_name, email, password, phone, user_type, approval_status, is_verified, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE email=email`,
      ['Arun Kumar', 'electrician@solartech.com', electricianPassword, '+91-9876543211', 'electrician', 'approved', 1, 1]
    );
    console.log('✅ Created electrician user: electrician@solartech.com / Electrician@123');

    // Sample Customer User
    const customerPassword = await bcrypt.hash('Customer@123', 10);
    await pool.execute(
      `INSERT INTO users (full_name, email, password, phone, user_type, approval_status, survey_completed, is_verified, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE email=email`,
      ['Rajesh Sharma', 'customer@example.com', customerPassword, '+91-9876543212', 'customer', 'approved', 1, 1, 1]
    );
    console.log('✅ Created customer user: customer@example.com / Customer@123');

    console.log('\n🎉 All sample users created successfully!\n');
    console.log('Login Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin: admin@solarconnect.com / Admin@123456');
    console.log('Provider: provider@techsolar.com / Provider@123');
    console.log('Electrician: electrician@solartech.com / Electrician@123');
    console.log('Customer: customer@example.com / Customer@123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    await pool.end();
  } catch (error) {
    console.error('Error creating sample users:', error.message);
    process.exit(1);
  }
}

createSampleUsers();
