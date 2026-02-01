import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, LogOut, TrendingUp, Zap, DollarSign, Users, Phone, Calendar, Award, BarChart3, User, Calculator } from 'lucide-react';
import SolarIrradianceTab from '../components/dashboard/SolarIrradianceTab';
import CostAdvantagesTab from '../components/dashboard/CostAdvantagesTab';
import SubsidiesTab from '../components/dashboard/SubsidiesTab';
import AgenciesTab from '../components/dashboard/AgenciesTab';
import ElectriciansTab from '../components/dashboard/ElectriciansTab';
import ComparisonTab from '../components/dashboard/ComparisonTab';
import ProfileTab from '../components/dashboard/ProfileTab';
import SolarCalculatorTab from '../components/dashboard/SolarCalculatorTab';
import FloatingChatbot from '../components/FloatingChatbot';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('irradiance');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData || userData.userType !== 'customer') {
      navigate('/login');
      return;
    }
    setUser(userData);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const [showProfile, setShowProfile] = useState(false);

  const tabs = [
    { id: 'calculator', name: 'Savings Calculator', icon: <Calculator className="w-5 h-5" />, color: 'from-indigo-500 to-indigo-600' },
    { id: 'irradiance', name: 'Solar Insights', icon: <TrendingUp className="w-5 h-5" />, color: 'from-blue-500 to-blue-600' },
    { id: 'advantages', name: 'Cost & Benefits', icon: <DollarSign className="w-5 h-5" />, color: 'from-green-500 to-green-600' },
    { id: 'subsidies', name: 'Subsidies & Schemes', icon: <Award className="w-5 h-5" />, color: 'from-purple-500 to-purple-600' },
    { id: 'agencies', name: 'Solar Agencies', icon: <Users className="w-5 h-5" />, color: 'from-orange-500 to-orange-600' },
    { id: 'electricians', name: 'Electricians', icon: <Zap className="w-5 h-5" />, color: 'from-yellow-500 to-yellow-600' },
    { id: 'comparison', name: 'Solar vs Electricity', icon: <BarChart3 className="w-5 h-5" />, color: 'from-red-500 to-red-600' }
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-solar-400 to-solar-600 p-2 rounded-xl">
                <Sun className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-solar-600 to-orange-600 bg-clip-text text-transparent">
                  Solar Connect
                </span>
                <div className="text-sm text-gray-600">Welcome, {user.fullName}!</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
                <span>My Profile</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-1 py-3">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowProfile(false);
                }}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id && !showProfile
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg transform scale-105`
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {showProfile ? (
          <ProfileTab />
        ) : (
          <>
            {activeTab === 'calculator' && <SolarCalculatorTab />}
            {activeTab === 'irradiance' && <SolarIrradianceTab />}
            {activeTab === 'advantages' && <CostAdvantagesTab onTabChange={(tabId) => {
              setActiveTab(tabId);
              setShowProfile(false);
            }} />}
            {activeTab === 'subsidies' && <SubsidiesTab />}
            {activeTab === 'agencies' && <AgenciesTab />}
            {activeTab === 'electricians' && <ElectriciansTab />}
            {activeTab === 'comparison' && <ComparisonTab />}
          </>
        )}
      </div>

      {/* Floating Chatbot - Always Visible */}
      <FloatingChatbot />
    </div>
  );
};

export default CustomerDashboard;
