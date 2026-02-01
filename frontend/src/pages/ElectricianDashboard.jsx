import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, LogOut, User, Zap, Calendar, Star, Mail, Phone, MapPin, Edit2, Save, X, Award, CheckCircle, XCircle } from 'lucide-react';

const ElectricianDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      customer: 'Ramesh Kumar',
      service: 'Solar Panel Installation - Residential',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      time: '10:00 AM',
      location: 'Banjara Hills, Hyderabad',
      status: 'Confirmed'
    },
    {
      id: 2,
      customer: 'Priya Sharma',
      service: 'Inverter Setup & Testing',
      date: '2026-01-20',
      time: '2:00 PM',
      location: 'Jubilee Hills, Hyderabad',
      status: 'Scheduled'
    },
    {
      id: 3,
      customer: 'Vijay Reddy',
      service: 'Maintenance check',
      date: '2026-01-22',
      time: '11:00 AM',
      location: 'Madhapur, Hyderabad',
      status: 'Pending'
    }
  ]);

  const showNotification = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleCancelAppointment = (appointmentId) => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (window.confirm(`Cancel appointment with ${appointment.customer} on ${appointment.date}?`)) {
      setAppointments(appointments.filter(apt => apt.id !== appointmentId));
      showNotification(`❌ Appointment with ${appointment.customer} has been cancelled.`, 'error');
    }
  };

  const handleConfirmAppointment = (appointmentId) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: 'Confirmed' } : apt
    ));
    const appointment = appointments.find(apt => apt.id === appointmentId);
    showNotification(`✅ Appointment with ${appointment.customer} confirmed!`, 'success');
  };
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    experience: '',
    specialization: '',
    certifications: '',
    availability: ''
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData || userData.userType !== 'electrician') {
      navigate('/login');
      return;
    }
    setUser(userData);
    
    // Load profile data
    setProfile({
      fullName: userData.fullName || '',
      email: userData.email || '',
      phone: userData.phone || '',
      address: '',
      city: '',
      state: '',
      experience: '',
      specialization: '',
      certifications: '',
      availability: ''
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
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-2 rounded-xl">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Solar Connect
                </span>
                <div className="text-sm text-gray-600">Electrician Portal - Welcome, {user.fullName}!</div>
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
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Zap className="w-5 h-5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg transform scale-105'
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
            <div className="card bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
              <Zap className="w-12 h-12 mb-4" />
              <h2 className="text-3xl font-bold mb-2">Welcome to Your Electrician Dashboard</h2>
              <p className="text-lg opacity-90">Manage your appointments and grow your solar installation business</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="card">
                <Star className="w-10 h-10 text-yellow-500 mb-3" />
                <h3 className="text-2xl font-bold mb-2">4.9</h3>
                <p className="text-gray-600">Average Rating</p>
              </div>
              <div className="card">
                <Calendar className="w-10 h-10 text-blue-500 mb-3" />
                <h3 className="text-2xl font-bold mb-2">{appointments.length}</h3>
                <p className="text-gray-600">Total Appointments</p>
              </div>
              <div className="card">
                <User className="w-10 h-10 text-green-500 mb-3" />
                <h3 className="text-2xl font-bold mb-2">{appointments.filter(a => a.status === 'Confirmed').length}</h3>
                <p className="text-gray-600">Confirmed Bookings</p>
              </div>
            </div>

            {/* Toast Notification */}
            {showToast && (
              <div className={`fixed top-24 right-6 z-50 animate-slide-in-right ${
                toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
              } text-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-3 max-w-md`}>
                <span className="text-lg font-semibold">{toastMessage}</span>
                <button onClick={() => setShowToast(false)} className="ml-4">
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            <div className="card">
              <h3 className="text-2xl font-bold mb-4">Appointment Management</h3>
              <div className="space-y-3">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className={`p-4 rounded-lg border-l-4 ${
                    appointment.status === 'Confirmed' ? 'bg-green-50 border-green-500' :
                    appointment.status === 'Scheduled' ? 'bg-blue-50 border-blue-500' :
                    'bg-yellow-50 border-yellow-500'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-lg">{appointment.customer}</p>
                        <p className="font-medium text-gray-700 mt-1">{appointment.service}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          {new Date(appointment.date).toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}, {appointment.time}
                        </p>
                        <p className="text-sm text-gray-600">
                          <MapPin className="w-4 h-4 inline mr-1" />
                          {appointment.location}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          appointment.status === 'Confirmed' ? 'bg-green-500 text-white' :
                          appointment.status === 'Scheduled' ? 'bg-blue-500 text-white' :
                          'bg-yellow-500 text-white'
                        }`}>
                          {appointment.status}
                        </span>
                        {appointment.status === 'Pending' && (
                          <button
                            onClick={() => handleConfirmAppointment(appointment.id)}
                            className="px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-1"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Confirm</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-1"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Professional Profile</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    value={profile.specialization}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    placeholder="e.g., Solar Panel Installation, Rooftop Solar, Commercial Systems"
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Award className="w-5 h-5 inline mr-2" />
                    Certifications
                  </label>
                  <textarea
                    name="certifications"
                    value={profile.certifications}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    rows="3"
                    placeholder="List your certifications (e.g., Licensed Electrician, MNRE Certified Installer, Solar PV Specialist)"
                    className="input-field disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-5 h-5 inline mr-2" />
                    Availability
                  </label>
                  <input
                    type="text"
                    name="availability"
                    value={profile.availability}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    placeholder="e.g., Mon-Sat, 9 AM - 6 PM"
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

export default ElectricianDashboard;
