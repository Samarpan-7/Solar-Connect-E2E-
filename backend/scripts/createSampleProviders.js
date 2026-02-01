const bcrypt = require('bcryptjs');
const db = require('../config/database');

const sampleProviders = [
  {
    fullName: 'SunPower Solutions',
    email: 'contact@sunpowersolutions.com',
    phone: '+91-9876543210',
    company: {
      name: 'SunPower Solutions',
      registration: 'REG-SP-2020-001',
      experience: 8,
      serviceAreas: 'Hyderabad, Warangal, Nizamabad',
      rating: 4.8,
      reviews: 156,
      costRange: '₹2.5L - ₹5L',
      warranty: 25,
      subsidySupport: true,
      certifications: 'MNRE Certified, ISO 9001:2015, IEC 61215'
    }
  },
  {
    fullName: 'Green Energy Systems',
    email: 'info@greenenergysystems.com',
    phone: '+91-9876543211',
    company: {
      name: 'Green Energy Systems',
      registration: 'REG-GES-2019-045',
      experience: 10,
      serviceAreas: 'Bangalore, Mysore, Hubli',
      rating: 4.7,
      reviews: 203,
      costRange: '₹2.8L - ₹6L',
      warranty: 25,
      subsidySupport: true,
      certifications: 'MNRE Certified, ISO 14001, BIS Certified'
    }
  },
  {
    fullName: 'Solar Tech India',
    email: 'support@solartechindia.com',
    phone: '+91-9876543212',
    company: {
      name: 'Solar Tech India',
      registration: 'REG-STI-2021-089',
      experience: 5,
      serviceAreas: 'Chennai, Coimbatore, Madurai',
      rating: 4.6,
      reviews: 98,
      costRange: '₹2.4L - ₹4.8L',
      warranty: 20,
      subsidySupport: true,
      certifications: 'MNRE Certified, ISO 9001'
    }
  },
  {
    fullName: 'Bright Solar Solutions',
    email: 'hello@brightsolar.com',
    phone: '+91-9876543213',
    company: {
      name: 'Bright Solar Solutions',
      registration: 'REG-BSS-2018-122',
      experience: 12,
      serviceAreas: 'Mumbai, Pune, Nagpur',
      rating: 4.9,
      reviews: 287,
      costRange: '₹3L - ₹7L',
      warranty: 30,
      subsidySupport: true,
      certifications: 'MNRE Certified, ISO 9001:2015, TUV Certified'
    }
  },
  {
    fullName: 'EcoSolar Energy',
    email: 'contact@ecosolarenergy.com',
    phone: '+91-9876543214',
    company: {
      name: 'EcoSolar Energy',
      registration: 'REG-ESE-2020-067',
      experience: 7,
      serviceAreas: 'Delhi, Gurgaon, Noida',
      rating: 4.5,
      reviews: 142,
      costRange: '₹2.6L - ₹5.5L',
      warranty: 25,
      subsidySupport: true,
      certifications: 'MNRE Certified, ISO 9001, BEE Star Rated'
    }
  }
];

async function createSampleProviders() {
  try {
    const password = 'Provider@123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    for (const provider of sampleProviders) {
      // Check if provider exists
      const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [provider.email]);
      
      if (existing.length > 0) {
        console.log(`✅ ${provider.company.name} already exists`);
        continue;
      }

      // Insert user
      const [userResult] = await db.query(
        'INSERT INTO users (full_name, email, password, phone, user_type, approval_status, is_verified, is_active, survey_completed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [provider.fullName, provider.email, hashedPassword, provider.phone, 'provider', 'approved', true, true, true]
      );

      // Insert provider details
      await db.query(
        `INSERT INTO solar_providers (user_id, company_name, company_registration, experience_years, service_areas, rating, total_reviews, installation_cost_range, warranty_years, government_subsidy_support, certifications) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userResult.insertId,
          provider.company.name,
          provider.company.registration,
          provider.company.experience,
          provider.company.serviceAreas,
          provider.company.rating,
          provider.company.reviews,
          provider.company.costRange,
          provider.company.warranty,
          provider.company.subsidySupport,
          provider.company.certifications
        ]
      );

      // Insert profile
      await db.query('INSERT INTO user_profiles (user_id) VALUES (?)', [userResult.insertId]);

      console.log(`✅ Created ${provider.company.name}`);
    }

    console.log('\n==========================================');
    console.log('✅ All sample solar providers created!');
    console.log('==========================================\n');
    process.exit(0);
  } catch (error) {
    console.error('Error creating providers:', error);
    process.exit(1);
  }
}

createSampleProviders();
