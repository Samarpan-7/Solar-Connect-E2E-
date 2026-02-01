-- Insert sample solar provider companies (after admin approval)
INSERT INTO users (full_name, email, password, phone, user_type, approval_status, is_verified, is_active) VALUES
('SunPower Solutions', 'contact@sunpowersolutions.com', '$2a$10$YourHashedPasswordHere', '+91-9876543210', 'provider', 'approved', TRUE, TRUE),
('Green Energy Systems', 'info@greenenergysystems.com', '$2a$10$YourHashedPasswordHere', '+91-9876543211', 'provider', 'approved', TRUE, TRUE),
('Solar Tech India', 'support@solartechindia.com', '$2a$10$YourHashedPasswordHere', '+91-9876543212', 'provider', 'approved', TRUE, TRUE),
('Bright Solar Solutions', 'hello@brightsolar.com', '$2a$10$YourHashedPasswordHere', '+91-9876543213', 'provider', 'approved', TRUE, TRUE),
('EcoSolar Energy', 'contact@ecosolarenergy.com', '$2a$10$YourHashedPasswordHere', '+91-9876543214', 'provider', 'approved', TRUE, TRUE);

-- Insert solar provider details
INSERT INTO solar_providers (user_id, company_name, company_registration, experience_years, service_areas, rating, total_reviews, installation_cost_range, warranty_years, government_subsidy_support, certifications) VALUES
(3, 'SunPower Solutions', 'REG-SP-2020-001', 8, 'Hyderabad, Warangal, Nizamabad', 4.8, 156, '₹2.5L - ₹5L', 25, TRUE, 'MNRE Certified, ISO 9001:2015, IEC 61215'),
(4, 'Green Energy Systems', 'REG-GES-2019-045', 10, 'Bangalore, Mysore, Hubli', 4.7, 203, '₹2.8L - ₹6L', 25, TRUE, 'MNRE Certified, ISO 14001, BIS Certified'),
(5, 'Solar Tech India', 'REG-STI-2021-089', 5, 'Chennai, Coimbatore, Madurai', 4.6, 98, '₹2.4L - ₹4.8L', 20, TRUE, 'MNRE Certified, ISO 9001'),
(6, 'Bright Solar Solutions', 'REG-BSS-2018-122', 12, 'Mumbai, Pune, Nagpur', 4.9, 287, '₹3L - ₹7L', 30, TRUE, 'MNRE Certified, ISO 9001:2015, TUV Certified'),
(7, 'EcoSolar Energy', 'REG-ESE-2020-067', 7, 'Delhi, Gurgaon, Noida', 4.5, 142, '₹2.6L - ₹5.5L', 25, TRUE, 'MNRE Certified, ISO 9001, BEE Star Rated');
