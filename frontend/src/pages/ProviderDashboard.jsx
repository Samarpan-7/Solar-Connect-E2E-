import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, LogOut, User, Package, Star, Mail, Phone, MapPin, Edit2, Save, X } from 'lucide-react';

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    companyName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    experience: '',
    certifications: '',
    serviceAreas: ''
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData || userData.userType !== 'provider') {
      navigate('/login');
      return;
    }
    setUser(userData);
    
    // Load profile data
    setProfile({
      companyName: userData.fullName || '',
      email: userData.email || '',
      phone: userData.phone || '',
      address: '',
      city: '',
      state: '',
      experience: '',
      certifications: '',
      serviceAreas: ''
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    // Here you would typically make an API call to save the profile
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-2 rounded-xl">
                <Sun className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Solar Connect
                </span>
                <div className="text-sm text-gray-600">Provider Portal - Welcome, {user.fullName}!</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-1 overflow-x-auto py-3">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Package className="w-5 h-5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <User className="w-5 h-5" />
              <span>My Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="card bg-gradient-to-br from-orange-500 to-red-500 text-white">
              <Package className="w-12 h-12 mb-4" />
              <h2 className="text-3xl font-bold mb-2">Welcome to Your Provider Dashboard</h2>
              <p className="text-lg opacity-90">Manage your solar panel business and connect with customers</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="card">
                <Star className="w-10 h-10 text-yellow-500 mb-3" />
                <h3 className="text-2xl font-bold mb-2">4.8</h3>
                <p className="text-gray-600">Average Rating</p>
              </div>
              <div className="card">
                <Package className="w-10 h-10 text-blue-500 mb-3" />
                <h3 className="text-2xl font-bold mb-2">24</h3>
                <p className="text-gray-600">Active Projects</p>
              </div>
              <div className="card">
                <User className="w-10 h-10 text-green-500 mb-3" />
                <h3 className="text-2xl font-bold mb-2">156</h3>
                <p className="text-gray-600">Total Customers</p>
              </div>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold mb-4">Recent Inquiries</h3>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold">New customer inquiry from Hyderabad</p>
                  <p className="text-sm text-gray-600">Interested in 5kW residential system - 2 hours ago</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold">Quote request for commercial installation</p>
                  <p className="text-sm text-gray-600">10kW system required - 5 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Company Profile</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={profile.companyName}
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
                      disabled={!isEditing}
                      className="input-field pl-11 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Years of Experience</label>
                  <input
                    type="number"
                    name="experience"
                    value={profile.experience}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="input-field disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <textarea
                      name="address"
                      value={profile.address}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      rows="2"
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
                  <input
                    type="text"
                    name="state"
                    value={profile.state}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="input-field disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Certifications</label>
                  <textarea
                    name="certifications"
                    value={profile.certifications}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    rows="3"
                    placeholder="List your certifications (e.g., MNRE Certified, ISO Trained)"
                    className="input-field disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Service Areas</label>
                  <textarea
                    name="serviceAreas"
                    value={profile.serviceAreas}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    rows="2"
                    placeholder="Enter cities/regions you serve (e.g., Hyderabad, Bangalore, Chennai)"
                    className="input-field disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;
