import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sun, Mail, Lock, ArrowLeft, Zap } from 'lucide-react';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirect based on user type and survey status
        if (response.data.user.userType === 'admin') {
          navigate('/admin');
        } else if (response.data.user.userType === 'provider') {
          navigate('/provider-dashboard');
        } else if (response.data.user.userType === 'electrician') {
          navigate('/electrician-dashboard');
        } else if (response.data.user.userType === 'customer' && response.data.user.needsSurvey) {
          navigate('/survey');
        } else if (response.data.user.userType === 'customer') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Login failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-solar-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      </div>

      <div className="relative w-full max-w-5xl">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-solar-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Login Form */}
          <div className="card">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-solar-400 to-solar-600 p-3 rounded-xl">
                  <Sun className="w-8 h-8 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-solar-600 to-orange-600 bg-clip-text text-transparent">
                  Solar Connect
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
              <p className="text-gray-600">Login to continue your solar journey</p>
            </div>

            {errors.submit && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input-field pl-11 ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`input-field pl-11 ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-solar-600 border-gray-300 rounded focus:ring-solar-500" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-solar-600 hover:text-solar-700 font-semibold">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-solar-600 font-semibold hover:text-solar-700">
                  Sign up now
                </Link>
              </p>
            </div>
          </div>

          {/* Right Side - Benefits */}
          <div className="hidden lg:block">
            <div className="space-y-6">
              <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white transform hover:scale-105 transition-transform">
                <Zap className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Quick Access</h3>
                <p className="opacity-90">Instantly connect with verified solar providers and get quotes</p>
              </div>
              
              <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white transform hover:scale-105 transition-transform">
                <Sun className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Track Progress</h3>
                <p className="opacity-90">Monitor your solar adoption journey and savings in real-time</p>
              </div>

              <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white transform hover:scale-105 transition-transform">
                <Lock className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Secure Platform</h3>
                <p className="opacity-90">Your data is protected with enterprise-level security</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
