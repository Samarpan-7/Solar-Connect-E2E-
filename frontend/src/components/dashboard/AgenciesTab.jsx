import { useState, useEffect } from 'react';
import { Star, Phone, Mail, MapPin, Award, Shield, DollarSign, TrendingUp, X, Check, Building2, Factory, Home, Zap, PhoneCall, PhoneOff } from 'lucide-react';
import axios from 'axios';

// Major Manufacturers & Integrated Providers - Moved outside component to prevent recreation
const majorManufacturers = [
    {
      name: 'Tata Power Solar',
      category: 'Integrated Provider',
      specialization: 'EPC, Rooftop & Utility-Scale',
      description: 'Long-standing trust with strong EPC capabilities, rooftop, and utility-scale solutions. One of India\'s most trusted brands.',
      strengths: ['Tier-1 manufacturer', 'Complete EPC services', '25+ years experience', 'Pan-India presence'],
      website: 'https://www.tatapowersolar.com/',
      phone: '1800 257 7777',
      email: 'care@tatapower.com',
      regions: ['Pan India'],
      projectTypes: ['Residential', 'Commercial', 'Industrial', 'Utility-Scale'],
      costRange: 'Premium'
    },
    {
      name: 'Adani Solar',
      category: 'Integrated Provider',
      specialization: 'Vertically Integrated Manufacturing',
      description: 'Vertically integrated with large-scale manufacturing capabilities. Strong presence in utility projects with world-class infrastructure.',
      strengths: ['4 GW+ capacity', 'Fully integrated', 'High-efficiency modules', 'Global quality standards'],
      website: 'https://www.adanisolar.com/',
      phone: '+91 79 2656 5555',
      email: 'solar.sales@adani.com',
      regions: ['Pan India'],
      projectTypes: ['Commercial', 'Industrial', 'Utility-Scale'],
      costRange: 'Premium'
    },
    {
      name: 'Waaree Energies',
      category: 'Manufacturer',
      specialization: 'India\'s Largest Module Manufacturer',
      description: 'India\'s largest solar panel manufacturer with huge capacity and extensive reach across residential and commercial sectors.',
      strengths: ['5.5 GW+ capacity', '30+ years experience', 'Export to 68+ countries', 'Complete solar solutions'],
      website: 'https://www.waaree.com/',
      phone: '1800 2121 321',
      email: 'waaree@waaree.com',
      regions: ['Pan India'],
      projectTypes: ['Residential', 'Commercial', 'Industrial'],
      costRange: 'Mid-Range'
    },
    {
      name: 'Vikram Solar',
      category: 'Manufacturer',
      specialization: 'R&D-Driven High-Efficiency Modules',
      description: 'Tier-1 manufacturer with strong R&D focus, global presence, and high-efficiency solar modules. Known for quality and innovation.',
      strengths: ['3 GW+ capacity', 'International Tier-1', 'Advanced R&D facility', 'High-performance modules'],
      website: 'https://www.vikramsolar.com/',
      phone: '1800 212 8200',
      email: 'sales@vikramsolar.com',
      regions: ['Pan India'],
      projectTypes: ['Residential', 'Commercial', 'Industrial'],
      costRange: 'Mid-Range'
    },
    {
      name: 'RenewSys',
      category: 'Integrated Manufacturer',
      specialization: 'Cells, Modules & Components',
      description: 'Integrated manufacturer of solar cells and modules with strong presence in components like backsheets and encapsulants.',
      strengths: ['Complete integration', 'Module manufacturing', 'Component expertise', 'Quality focus'],
      website: 'https://www.renewsys.com/',
      phone: '+91 22 6810 0500',
      email: 'renewsys@renewsysindia.com',
      regions: ['Pan India'],
      projectTypes: ['Commercial', 'Industrial'],
      costRange: 'Mid-Range'
    },
    {
      name: 'Goldi Solar',
      category: 'Manufacturer',
      specialization: 'Durable Solar Modules',
      description: 'Known for manufacturing durable and dependable solar modules with focus on reliability and long-term performance.',
      strengths: ['Proven reliability', 'Quality assurance', 'Cost-effective', 'Strong warranty'],
      website: 'https://www.goldisolar.com/',
      phone: '1800 833 5511',
      email: 'info@goldisolar.com',
      regions: ['Pan India'],
      projectTypes: ['Residential', 'Commercial'],
      costRange: 'Affordable'
    },
    {
      name: 'Emmvee',
      category: 'Manufacturer',
      specialization: 'PV Modules & Solar Thermal',
      description: 'Long experience in PV modules and water heating systems with comprehensive solar energy solutions for all sectors.',
      strengths: ['40+ years experience', 'Solar PV & thermal', 'Innovative products', 'Established brand'],
      website: 'https://www.emmvee.com/',
      phone: '+91 80 2217 4328',
      email: 'info@emmvee.in',
      regions: ['Pan India'],
      projectTypes: ['Residential', 'Commercial'],
      costRange: 'Mid-Range'
    }
  ];

// Top EPC & Developers - Moved outside component
const epcDevelopers = [
    {
      name: 'L&T Solar (Larsen & Toubro)',
      category: 'EPC Giant',
      specialization: 'Large-Scale Projects',
      description: 'Major EPC player for large infrastructure projects with extensive experience in utility-scale solar installations.',
      strengths: ['10+ GW executed', 'Turnkey solutions', 'Project management', 'Global experience'],
      website: 'https://www.larsentoubro.com/',
      phone: '1800 209 4545',
      email: 'infodesk@larsentoubro.com',
      regions: ['Pan India'],
      projectTypes: ['Industrial', 'Utility-Scale'],
      costRange: 'Premium'
    },
    {
      name: 'Sterling & Wilson Solar',
      category: 'Global EPC Leader',
      specialization: 'Solar EPC Projects',
      description: 'World leader in solar EPC with presence across 26+ countries. Specialized in utility-scale solar power projects.',
      strengths: ['Global leader', '15+ GW installed', 'End-to-end EPC', 'O&M services'],
      website: 'https://www.sterling-wilson.com/',
      phone: '+91 22 2548 5300',
      email: 'info@sterlingwilson.com',
      regions: ['Pan India'],
      projectTypes: ['Industrial', 'Utility-Scale'],
      costRange: 'Premium'
    },
    {
      name: 'Azure Power',
      category: 'Developer',
      specialization: 'Utility-Scale Solar',
      description: 'Major clean energy company focused on large-scale utility solar projects with significant portfolio in India.',
      strengths: ['2+ GW portfolio', 'Utility focus', 'Strong financials', 'Government projects'],
      website: 'https://www.azurepower.com/',
      phone: '1800 102 6969',
      email: 'info@azurepower.com',
      regions: ['Pan India'],
      projectTypes: ['Utility-Scale', 'Industrial'],
      costRange: 'Premium'
    },
    {
      name: 'ReNew Power',
      category: 'Clean Energy Leader',
      specialization: 'Solar, Wind & Hydro',
      description: 'India\'s leading clean energy company with comprehensive renewable portfolio including solar, wind, and hydro projects.',
      strengths: ['10+ GW capacity', 'Diversified portfolio', 'IPP expertise', 'Listed company'],
      website: 'https://www.renew.com/',
      phone: '+91 124 489 6670',
      email: 'info@renew.com',
      regions: ['Pan India'],
      projectTypes: ['Utility-Scale', 'Industrial'],
      costRange: 'Premium'
    }
  ];

// Residential & Small Business Specialists - Moved outside component
const residentialProviders = [
    {
      name: 'Loom Solar',
      category: 'Residential Specialist',
      specialization: 'Home & Small Commercial',
      description: 'Most popular choice for residential and small commercial solar needs with direct-to-customer approach and modern solutions.',
      strengths: ['Customer-first', 'Online platform', 'Affordable pricing', 'Quick installation'],
      website: 'https://www.loomsolar.com/',
      phone: '8750 77 88 00',
      email: 'sales@loomsolar.com',
      regions: ['Pan India'],
      projectTypes: ['Residential', 'Commercial'],
      costRange: 'Affordable'
    },
    {
      name: 'Saatvik Green Energy',
      category: 'Residential Provider',
      specialization: 'High-Wattage Modules',
      description: 'Offers high-wattage solar modules suitable for various scales from residential to small commercial applications.',
      strengths: ['High efficiency', 'Multiple scales', 'Good pricing', 'Quality products'],
      website: 'https://saatvikgreenenergyindia.com/',
      phone: '1800 547 1151',
      email: 'info@saatvikgroup.com',
      regions: ['Pan India'],
      projectTypes: ['Residential', 'Commercial'],
      costRange: 'Affordable'
    }
  ];

const AgenciesTab = () => {
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [callStatus, setCallStatus] = useState('dialing'); // dialing, ringing, connected, ended
  const [callDuration, setCallDuration] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [sortBy, setSortBy] = useState('rating');
  const [filters, setFilters] = useState({
    projectType: 'All',
    costRange: 'All',
    companyType: 'All'
  });
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  // Fetch agencies on component mount
  useEffect(() => {
    fetchAgencies();
  }, []);

  // Apply filters whenever filters change
  useEffect(() => {
    let allCompanies = [...majorManufacturers, ...epcDevelopers, ...residentialProviders];
    
    let filtered = allCompanies.filter(company => {
      // Project Type Filter
      if (filters.projectType !== 'All' && !company.projectTypes.includes(filters.projectType)) {
        return false;
      }
      
      // Cost Range Filter
      if (filters.costRange !== 'All' && company.costRange !== filters.costRange) {
        return false;
      }
      
      // Company Type Filter
      if (filters.companyType !== 'All') {
        if (filters.companyType === 'Manufacturer' && !['Manufacturer', 'Integrated Provider', 'Integrated Manufacturer'].includes(company.category)) {
          return false;
        }
        if (filters.companyType === 'EPC' && !['EPC Giant', 'Global EPC Leader', 'Developer', 'Clean Energy Leader'].includes(company.category)) {
          return false;
        }
        if (filters.companyType === 'Residential' && !['Residential Specialist', 'Residential Provider'].includes(company.category)) {
          return false;
        }
      }
      
      return true;
    });
    
    setFilteredCompanies(filtered);
  }, [filters]);


  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const clearFilters = () => {
    setFilters({
      projectType: 'All',
      costRange: 'All',
      companyType: 'All'
    });
  };

  const fetchAgencies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/agencies/providers');
      setAgencies(response.data.providers);
    } catch (error) {
      console.error('Failed to fetch agencies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (criteria) => {
    setSortBy(criteria);
    const sorted = [...agencies].sort((a, b) => {
      if (criteria === 'rating') return b.rating - a.rating;
      if (criteria === 'reviews') return b.total_reviews - a.total_reviews;
      if (criteria === 'experience') return b.experience_years - a.experience_years;
      return 0;
    });
    setAgencies(sorted);
  };

  const handleContact = (agency) => {
    setSelectedAgency(agency);
    setShowContactModal(true);
  };

  const handleCall = (company) => {
    setSelectedAgency(company);
    setShowCallModal(true);
    setCallStatus('dialing');
    setCallDuration(0);

    // Simulate call progression for demo
    setTimeout(() => setCallStatus('ringing'), 1500);
    setTimeout(() => {
      setCallStatus('connected');
      // Start call duration timer
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      
      // Store timer to clear it later
      window.callTimer = timer;
    }, 3000);
  };

  const handleEndCall = () => {
    if (window.callTimer) {
      clearInterval(window.callTimer);
      window.callTimer = null;
    }
    setCallStatus('ended');
    setTimeout(() => {
      setShowCallModal(false);
      setCallDuration(0);
    }, 1500);
  };

  const handleEmailClick = (company) => {
    const subject = encodeURIComponent(`Solar Installation Inquiry - ${company.name}`);
    const body = encodeURIComponent(
      `Hello ${company.name} Team,\n\n` +
      `I am interested in learning more about your solar installation services.\n\n` +
      `Please provide information about:\n` +
      `- System sizing and recommendations\n` +
      `- Installation costs and timeline\n` +
      `- Government subsidies and financing options\n` +
      `- Warranty and maintenance support\n\n` +
      `Looking forward to hearing from you.\n\n` +
      `Best regards`
    );
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
  };

  const formatCallDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const submitContact = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/agencies/contact/${selectedAgency.id}`,
        contactForm
      );
      
      if (response.data.success) {
        alert(`Contact request sent! You can also reach them at:\nPhone: ${response.data.providerContact.phone}\nEmail: ${response.data.providerContact.email}`);
        setShowContactModal(false);
        setContactForm({ name: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      alert('Failed to send contact request. Please try calling directly.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl font-semibold">Loading agencies...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-br from-orange-500 to-red-500 text-white">
        <h2 className="text-3xl font-bold mb-2">India's Leading Solar Companies</h2>
        <p className="text-lg opacity-90">Choose from trusted manufacturers, EPC providers, and installers</p>
      </div>

      {/* Filter Section */}
      <div className="card bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Shield className="w-6 h-6 text-blue-600 mr-2" />
          Filter Companies by Your Requirements
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {/* Project Type Filter */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Project Type</label>
            <select
              value={filters.projectType}
              onChange={(e) => handleFilterChange('projectType', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="All">All Types</option>
              <option value="Residential">Residential / Home</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
              <option value="Utility-Scale">Utility-Scale</option>
            </select>
          </div>

          {/* Cost Range Filter */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Budget Range</label>
            <select
              value={filters.costRange}
              onChange={(e) => handleFilterChange('costRange', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="All">All Budgets</option>
              <option value="Affordable">Affordable (Budget-Friendly)</option>
              <option value="Mid-Range">Mid-Range (Best Value)</option>
              <option value="Premium">Premium (High-End)</option>
            </select>
          </div>

          {/* Company Type Filter */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Company Type</label>
            <select
              value={filters.companyType}
              onChange={(e) => handleFilterChange('companyType', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="All">All Companies</option>
              <option value="Manufacturer">Manufacturers</option>
              <option value="EPC">EPC / Developers</option>
              <option value="Residential">Residential Specialists</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
        
        {/* Active Filters Display */}
        {(filters.projectType !== 'All' || filters.costRange !== 'All' || filters.companyType !== 'All') && (
          <div className="mt-4 pt-4 border-t border-blue-200">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-semibold text-gray-700">Active Filters:</span>
              {filters.projectType !== 'All' && (
                <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">
                  {filters.projectType}
                </span>
              )}
              {filters.costRange !== 'All' && (
                <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-semibold">
                  {filters.costRange}
                </span>
              )}
              {filters.companyType !== 'All' && (
                <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-semibold">
                  {filters.companyType}
                </span>
              )}
              <span className="text-sm font-semibold text-gray-700 ml-2">
                ({filteredCompanies.length} companies found)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Major Manufacturers & Integrated Providers */}
      {filteredCompanies.filter(c => ['Manufacturer', 'Integrated Provider', 'Integrated Manufacturer'].includes(c.category)).length > 0 && (
        <div>
          <div className="flex items-center mb-4">
            <Factory className="w-6 h-6 text-orange-600 mr-2" />
            <h3 className="text-2xl font-bold">Major Manufacturers & Integrated Providers</h3>
            <span className="ml-3 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-bold">
              {filteredCompanies.filter(c => ['Manufacturer', 'Integrated Provider', 'Integrated Manufacturer'].includes(c.category)).length} found
            </span>
          </div>
          <p className="text-gray-600 mb-4 text-sm">Leading solar panel manufacturers with proven track record and large-scale capabilities</p>
          <div className="grid md:grid-cols-2 gap-4">
            {filteredCompanies.filter(c => ['Manufacturer', 'Integrated Provider', 'Integrated Manufacturer'].includes(c.category)).map((company, index) => (
            <div key={index} className="card border-l-4 border-orange-500 hover:shadow-xl transition-all">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-bold text-gray-800">{company.name}</h4>
                  <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full mt-1">
                    {company.category}
                  </span>
                </div>
              </div>
              <div className="mb-3">
                <div className="text-sm font-semibold text-blue-600 mb-1">{company.specialization}</div>
                <p className="text-sm text-gray-700">{company.description}</p>
              </div>
              <div className="mb-3">
                <div className="text-xs font-semibold text-gray-700 mb-2">Key Strengths:</div>
                <div className="grid grid-cols-2 gap-2">
                  {company.strengths.map((strength, idx) => (
                    <div key={idx} className="flex items-center space-x-1 text-xs">
                      <Check className="w-3 h-3 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-3 border-t">
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-3 rounded-lg text-sm font-semibold transition-colors"
                >
                  Website
                </a>
                <button
                  onClick={() => handleCall(company)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 px-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center space-x-1"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </button>
                <button
                  onClick={() => handleEmailClick(company)}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-center py-2 px-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center space-x-1"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </button>
              </div>
              <div className="text-xs text-gray-600 mt-2 pt-2 border-t">
                <div className="flex items-center space-x-1 mb-1">
                  <Phone className="w-3 h-3" />
                  <span>{company.phone}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail className="w-3 h-3" />
                  <span>{company.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* Top EPC & Developers */}
      {filteredCompanies.filter(c => ['EPC Giant', 'Global EPC Leader', 'Developer', 'Clean Energy Leader'].includes(c.category)).length > 0 && (
        <div>
          <div className="flex items-center mb-4">
            <Building2 className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-2xl font-bold">Top EPC (Engineering, Procurement, Construction) & Developers</h3>
            <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
              {filteredCompanies.filter(c => ['EPC Giant', 'Global EPC Leader', 'Developer', 'Clean Energy Leader'].includes(c.category)).length} found
            </span>
          </div>
          <p className="text-gray-600 mb-4 text-sm">Expert project developers for large-scale solar installations</p>
          <div className="grid md:grid-cols-2 gap-4">
            {filteredCompanies.filter(c => ['EPC Giant', 'Global EPC Leader', 'Developer', 'Clean Energy Leader'].includes(c.category)).map((company, index) => (
            <div key={index} className="card border-l-4 border-blue-500 hover:shadow-xl transition-all">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-bold text-gray-800">{company.name}</h4>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mt-1">
                    {company.category}
                  </span>
                </div>
              </div>
              <div className="mb-3">
                <div className="text-sm font-semibold text-blue-600 mb-1">{company.specialization}</div>
                <p className="text-sm text-gray-700">{company.description}</p>
              </div>
              <div className="mb-3">
                <div className="text-xs font-semibold text-gray-700 mb-2">Key Strengths:</div>
                <div className="grid grid-cols-2 gap-2">
                  {company.strengths.map((strength, idx) => (
                    <div key={idx} className="flex items-center space-x-1 text-xs">
                      <Check className="w-3 h-3 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-3 border-t">
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-3 rounded-lg text-sm font-semibold transition-colors"
                >
                  Website
                </a>
                <button
                  onClick={() => handleCall(company)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 px-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center space-x-1"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </button>
                <button
                  onClick={() => handleEmailClick(company)}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-center py-2 px-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center space-x-1"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </button>
              </div>
              <div className="text-xs text-gray-600 mt-2 pt-2 border-t">
                <div className="flex items-center space-x-1 mb-1">
                  <Phone className="w-3 h-3" />
                  <span>{company.phone}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail className="w-3 h-3" />
                  <span>{company.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* Residential & Small Business */}
      {filteredCompanies.filter(c => ['Residential Specialist', 'Residential Provider'].includes(c.category)).length > 0 && (
        <div>
          <div className="flex items-center mb-4">
            <Home className="w-6 h-6 text-green-600 mr-2" />
            <h3 className="text-2xl font-bold">For Home & Small Businesses</h3>
            <span className="ml-3 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
              {filteredCompanies.filter(c => ['Residential Specialist', 'Residential Provider'].includes(c.category)).length} found
            </span>
          </div>
          <p className="text-gray-600 mb-4 text-sm">Specialized providers for residential and small commercial solar installations</p>
          <div className="grid md:grid-cols-2 gap-4">
            {filteredCompanies.filter(c => ['Residential Specialist', 'Residential Provider'].includes(c.category)).map((company, index) => (
            <div key={index} className="card border-l-4 border-green-500 hover:shadow-xl transition-all">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-bold text-gray-800">{company.name}</h4>
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mt-1">
                    {company.category}
                  </span>
                </div>
              </div>
              <div className="mb-3">
                <div className="text-sm font-semibold text-green-600 mb-1">{company.specialization}</div>
                <p className="text-sm text-gray-700">{company.description}</p>
              </div>
              <div className="mb-3">
                <div className="text-xs font-semibold text-gray-700 mb-2">Key Strengths:</div>
                <div className="grid grid-cols-2 gap-2">
                  {company.strengths.map((strength, idx) => (
                    <div key={idx} className="flex items-center space-x-1 text-xs">
                      <Check className="w-3 h-3 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-3 border-t">
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-3 rounded-lg text-sm font-semibold transition-colors"
                >
                  Website
                </a>
                <button
                  onClick={() => handleCall(company)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 px-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center space-x-1"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </button>
                <button
                  onClick={() => handleEmailClick(company)}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-center py-2 px-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center space-x-1"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </button>
              </div>
              <div className="text-xs text-gray-600 mt-2 pt-2 border-t">
                <div className="flex items-center space-x-1 mb-1">
                  <Phone className="w-3 h-3" />
                  <span>{company.phone}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail className="w-3 h-3" />
                  <span>{company.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* No Results Message */}
      {filteredCompanies.length === 0 && (
        <div className="card text-center py-12 bg-yellow-50 border-2 border-yellow-200">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Companies Found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
          <button
            onClick={clearFilters}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* How to Choose Section */}
      <div className="card bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Zap className="w-6 h-6 text-purple-600 mr-2" />
          How to Choose the Right Solar Company
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold text-purple-900 mb-2">For Manufacturing Quality</h4>
            <p className="text-sm text-gray-700 mb-2">Choose established manufacturers with proven track record:</p>
            <div className="text-sm space-y-1">
              <div>• Tata Power Solar</div>
              <div>• Adani Solar</div>
              <div>• Waaree Energies</div>
              <div>• Vikram Solar</div>
              <div>• RenewSys</div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-blue-900 mb-2">For Large Projects</h4>
            <p className="text-sm text-gray-700 mb-2">Go with experienced EPC providers:</p>
            <div className="text-sm space-y-1">
              <div>• L&T Solar</div>
              <div>• Sterling & Wilson</div>
              <div>• Azure Power</div>
              <div>• ReNew Power</div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-green-900 mb-2">For Home & Small Business</h4>
            <p className="text-sm text-gray-700 mb-2">Select customer-focused residential specialists:</p>
            <div className="text-sm space-y-1">
              <div>• Loom Solar</div>
              <div>• Saatvik Green Energy</div>
              <div>• Waaree Energies</div>
              <div>• Tata Power Solar</div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t-4 border-dashed border-gray-300 my-8"></div>

      {/* Local Verified Agencies Header */}
      <div className="card bg-gradient-to-br from-solar-500 to-orange-500 text-white">
        <h2 className="text-2xl font-bold mb-2">Local Verified Solar Installers</h2>
        <p className="text-lg opacity-90">Compare and connect with approved installers in your area</p>
      </div>

      {/* Sort Options */}
      <div className="flex items-center space-x-3">
        <span className="font-semibold text-gray-700">Sort by:</span>
        <button
          onClick={() => handleSort('rating')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            sortBy === 'rating'
              ? 'bg-solar-500 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Star className="w-4 h-4 inline mr-1" />
          Rating
        </button>
        <button
          onClick={() => handleSort('reviews')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            sortBy === 'reviews'
              ? 'bg-solar-500 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Reviews
        </button>
        <button
          onClick={() => handleSort('experience')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            sortBy === 'experience'
              ? 'bg-solar-500 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Experience
        </button>
      </div>

      {/* Agencies Grid */}
      {agencies.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600">No solar agencies available at the moment.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {agencies.map((agency) => (
            <div key={agency.id} className="card hover:shadow-2xl transition-all duration-300 border-l-4 border-solar-500">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Company Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{agency.company_name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{agency.service_areas?.split(',')[0]}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>{agency.experience_years} years exp.</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-2 rounded-lg">
                      <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                      <span className="text-lg font-bold">{agency.rating}</span>
                      <span className="text-sm text-gray-600">({agency.total_reviews})</span>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <FeatureItem
                      icon={<DollarSign className="w-5 h-5" />}
                      label="Installation Cost"
                      value={agency.installation_cost_range}
                    />
                    <FeatureItem
                      icon={<Shield className="w-5 h-5" />}
                      label="Warranty"
                      value={`${agency.warranty_years} years`}
                    />
                    <FeatureItem
                      icon={<Award className="w-5 h-5" />}
                      label="Subsidy Support"
                      value={agency.government_subsidy_support ? 'Yes' : 'No'}
                      highlight={agency.government_subsidy_support}
                    />
                    <FeatureItem
                      icon={<MapPin className="w-5 h-5" />}
                      label="Service Areas"
                      value={agency.service_areas?.split(',').length + ' cities'}
                    />
                  </div>

                  {/* Certifications */}
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Certifications:</div>
                    <div className="flex flex-wrap gap-2">
                      {agency.certifications?.split(',').map((cert, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold"
                        >
                          {cert.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Service Areas */}
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Service Areas: </span>
                    {agency.service_areas}
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="flex-shrink-0 md:w-64 flex flex-col justify-center space-y-3">
                  <button
                    onClick={() => handleEmailClick(agency)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Send Email</span>
                  </button>
                  <button
                    onClick={() => handleCall(agency)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call Now</span>
                  </button>
                  <button
                    onClick={() => handleContact(agency)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Send Inquiry Form</span>
                  </button>
                  <div className="text-center text-sm text-gray-600">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Phone className="w-3 h-3" />
                      <span>{agency.phone}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <Mail className="w-3 h-3" />
                      <span className="text-xs">{agency.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative">
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-bold mb-6">Contact {selectedAgency?.company_name}</h3>

            <form onSubmit={submitContact} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Your Name *</label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Phone *</label>
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="input-field h-24"
                  placeholder="Tell them about your requirements..."
                />
              </div>

              <button type="submit" className="w-full btn-primary">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Professional Call Modal */}
      {showCallModal && selectedAgency && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 relative shadow-2xl">
            {/* Call Status Indicator */}
            <div className="text-center">
              {/* Animated Phone Icon */}
              <div className="relative inline-block mb-6">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
                  callStatus === 'dialing' ? 'bg-yellow-100 animate-pulse' :
                  callStatus === 'ringing' ? 'bg-blue-100 animate-bounce' :
                  callStatus === 'connected' ? 'bg-green-100' :
                  'bg-gray-100'
                }`}>
                  <PhoneCall className={`w-12 h-12 ${
                    callStatus === 'dialing' ? 'text-yellow-600' :
                    callStatus === 'ringing' ? 'text-blue-600' :
                    callStatus === 'connected' ? 'text-green-600' :
                    'text-gray-600'
                  }`} />
                </div>
                {/* Ripple Effect for Active Call */}
                {(callStatus === 'ringing' || callStatus === 'connected') && (
                  <>
                    <div className={`absolute inset-0 rounded-full ${
                      callStatus === 'connected' ? 'bg-green-400' : 'bg-blue-400'
                    } opacity-25 animate-ping`}></div>
                    <div className={`absolute inset-0 rounded-full ${
                      callStatus === 'connected' ? 'bg-green-400' : 'bg-blue-400'
                    } opacity-25 animate-ping animation-delay-150`}></div>
                  </>
                )}
              </div>

              {/* Company Name */}
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedAgency.name || selectedAgency.company_name}
              </h3>

              {/* Phone Number */}
              <div className="flex items-center justify-center space-x-2 text-gray-600 mb-4">
                <Phone className="w-4 h-4" />
                <span className="text-lg">{selectedAgency.phone}</span>
              </div>

              {/* Call Status Text */}
              <div className="mb-6">
                {callStatus === 'dialing' && (
                  <div className="text-yellow-600 font-semibold text-lg animate-pulse">
                    Dialing...
                  </div>
                )}
                {callStatus === 'ringing' && (
                  <div className="text-blue-600 font-semibold text-lg">
                    Ringing...
                  </div>
                )}
                {callStatus === 'connected' && (
                  <div>
                    <div className="text-green-600 font-semibold text-lg mb-2">
                      Connected
                    </div>
                    <div className="text-3xl font-bold text-gray-800 font-mono">
                      {formatCallDuration(callDuration)}
                    </div>
                  </div>
                )}
                {callStatus === 'ended' && (
                  <div className="text-gray-600 font-semibold text-lg">
                    Call Ended
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                {callStatus !== 'ended' && (
                  <button
                    onClick={handleEndCall}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center space-x-2"
                  >
                    <PhoneOff className="w-6 h-6" />
                    <span>End Call</span>
                  </button>
                )}
                {callStatus === 'ended' && (
                  <button
                    onClick={() => setShowCallModal(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all"
                  >
                    Close
                  </button>
                )}
              </div>

              {/* Call Info */}
              {callStatus === 'connected' && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    📞 You are now speaking with {selectedAgency.name || selectedAgency.company_name}
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    Discuss your solar installation requirements
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FeatureItem = ({ icon, label, value, highlight }) => (
  <div className="flex items-center space-x-2">
    <div className={`p-2 rounded-lg ${highlight ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
      {icon}
    </div>
    <div>
      <div className="text-xs text-gray-600">{label}</div>
      <div className="font-semibold text-sm">{value}</div>
    </div>
  </div>
);

export default AgenciesTab;
