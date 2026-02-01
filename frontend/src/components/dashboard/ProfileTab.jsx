import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, X, Home } from 'lucide-react';

const ProfileTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    propertyType: ''
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setProfile({
        fullName: userData.fullName || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        propertyType: ''
      });
    }
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    // Here you would typically make an API call to save the profile
    const userData = JSON.parse(localStorage.getItem('user'));
    const updatedUser = { ...userData, fullName: profile.fullName, phone: profile.phone };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="card bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <User className="w-12 h-12" />
          <div>
            <h2 className="text-3xl font-bold">My Profile</h2>
            <p className="text-lg opacity-90">Manage your personal information</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Personal Information</h3>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Edit2 className="w-5 h-5" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSaveProfile}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Save className="w-5 h-5" />
                <span>Save</span>
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleProfileChange}
              disabled={!isEditing}
              className="input-field disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                disabled={true}
                className="input-field pl-11 bg-gray-100 cursor-not-allowed"
                title="Email cannot be changed"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                disabled={!isEditing}
                className="input-field pl-11 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type</label>
            <select
              name="propertyType"
              value={profile.propertyType}
              onChange={handleProfileChange}
              disabled={!isEditing}
              className="input-field disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">Select property type</option>
              <option value="independent-house">Independent House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="farmhouse">Farmhouse</option>
              <option value="commercial">Commercial Building</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Home className="w-5 h-5 inline mr-2" />
              Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <textarea
                name="address"
                value={profile.address}
                onChange={handleProfileChange}
                disabled={!isEditing}
                rows="2"
                placeholder="Enter your complete address"
                className="input-field pl-11 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
            <input
              type="text"
              name="city"
              value={profile.city}
              onChange={handleProfileChange}
              disabled={!isEditing}
              className="input-field disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
            <select
              name="state"
              value={profile.state}
              onChange={handleProfileChange}
              disabled={!isEditing}
              className="input-field disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">Select state</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Telangana">Telangana</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={profile.pincode}
              onChange={handleProfileChange}
              disabled={!isEditing}
              maxLength="6"
              pattern="[0-9]{6}"
              placeholder="Enter 6-digit pincode"
              className="input-field disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Account Security */}
      <div className="card">
        <h3 className="text-2xl font-bold mb-4">Account Security</h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">Change Password</h4>
            <p className="text-sm text-gray-600 mb-3">Keep your account secure by using a strong password</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
              Update Password
            </button>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold mb-2">Account Status</h4>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">Active</span>
              <span className="text-sm text-gray-600">Your account is verified and active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
