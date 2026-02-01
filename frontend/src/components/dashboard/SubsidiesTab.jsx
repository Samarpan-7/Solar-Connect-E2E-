import { Award, Check, FileText, Phone, ExternalLink, Info, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const SubsidiesTab = () => {
  const [hoveredScheme, setHoveredScheme] = useState(null);

  const centralSchemes = [
    {
      name: 'PM-KUSUM (Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan)',
      authority: 'Ministry of New and Renewable Energy (MNRE)',
      subsidy: 'Up to 30%',
      maxAmount: '₹15 Lakh per farmer',
      eligibility: 'Farmers, Farmer Producer Organizations (FPOs), Panchayats',
      applicableFor: 'Individual Farmers, Cooperative Societies, Farmer Groups, Water User Associations',
      description: 'Financial support for installation of grid-connected solar power plants and standalone solar pumps.',
      benefits: ['30% central subsidy + 30% state subsidy', 'Easy loan availability for 30%', 'Additional state subsidy possible'],
      link: 'https://pmkusum.mnre.gov.in/'
    },
    {
      name: 'Grid Connected Rooftop Solar Programme Phase-II',
      authority: 'MNRE',
      subsidy: '40% for 1-3kW, 20% for 3-10kW',
      maxAmount: '₹87,532 for systems above 10kW',
      eligibility: 'Residential, Institutional, Social Sectors',
      applicableFor: 'House Owners, Residential Societies, Educational Institutions, Hospitals, Religious Places',
      description: 'Central Financial Assistance (CFA) for installing rooftop solar systems up to 500 kW capacity.',
      benefits: ['₹18,000/kW for 1-3 kW', '₹9,000/kW for 3-10 kW', 'Net metering facility', '25-year warranty'],
      link: 'https://pmsuryaghar.gov.in/'
    },
    {
      name: 'National Solar Mission (Jawaharlal Nehru)',
      authority: 'MNRE',
      subsidy: 'Varies by project',
      maxAmount: 'Up to ₹50 Crore for mega projects',
      eligibility: 'All sectors - Commercial, Industrial, Institutional',
      applicableFor: 'Industries, Commercial Establishments, Large Institutions, Power Developers',
      description: 'Aims to establish India as a global leader in solar energy with deployment target of 100 GW by 2026.',
      benefits: ['Low-interest loans at 5-7%', 'Tax incentives & exemptions', 'Accelerated depreciation 40%', 'VGF (Viability Gap Funding)'],
      link: 'https://mnre.gov.in/solar/current-status/'
    },
    {
      name: 'Solar Park Scheme',
      authority: 'MNRE',
      subsidy: '₹20 Lakh/MW',
      maxAmount: '₹20 Crore per Solar Park',
      eligibility: 'Solar Power Developers, State Governments',
      applicableFor: 'Private Developers, PSUs, State Nodal Agencies investing in 50MW+ parks',
      description: 'Facilitates large-scale grid-connected solar power projects by providing land and transmission infrastructure.',
      benefits: ['₹20 lakh per MW or 30% of project cost', 'Ready infrastructure', 'Single-window clearance', 'Transmission evacuation support'],
      link: 'https://mnre.gov.in/solar/schemes/'
    },
    {
      name: 'Atal Jyoti Yojana (AJAY)',
      authority: 'MNRE',
      subsidy: '100% subsidy',
      maxAmount: 'Full project cost for eligible areas',
      eligibility: 'Rural Areas without electricity',
      applicableFor: 'Villages/areas in LWE (Left Wing Extremism) affected districts, tribal areas, remote locations',
      description: 'Installation of solar street lighting systems in areas without grid electricity or with inadequate power supply.',
      benefits: ['100% central financial assistance', 'Free installation & maintenance (5 years)', 'Community lighting solutions'],
      link: 'https://mnre.gov.in/'
    },
    {
      name: 'Solar Energy for Agriculture Use',
      authority: 'MNRE & Ministry of Agriculture',
      subsidy: '60% subsidy',
      maxAmount: '₹4.5 Lakh for 5HP pump',
      eligibility: 'Small & Marginal Farmers',
      applicableFor: 'Farmers with agricultural land, requiring irrigation pumps, farmhouses needing power',
      description: 'Subsidized solar water pumps and solar-powered agriculture equipment for irrigation.',
      benefits: ['60% subsidy (30% central + 30% state)', 'Loan for 30% balance', 'No electricity bills', 'MNRE-approved vendors'],
      link: 'https://pmkusum.mnre.gov.in/'
    },
    {
      name: 'Off-Grid and Decentralized Solar PV Applications',
      authority: 'MNRE',
      subsidy: '30-90% subsidy',
      maxAmount: 'Up to ₹10 Lakh',
      eligibility: 'Schools, Health Centers, Community Centers',
      applicableFor: 'Government Schools, PHCs, Anganwadis, Community Buildings in rural & remote areas',
      description: 'Support for solar installations in off-grid areas including solar home lighting systems, street lights, and power plants.',
      benefits: ['Up to 90% subsidy for social sector', 'Complete power solution', 'Free AMC for 5 years', 'Battery backup included'],
      link: 'https://mnre.gov.in/off-grid-decentralised-solar/'
    },
    {
      name: 'Defence & Paramilitary Solar Scheme',
      authority: 'Ministry of Defence & MNRE',
      subsidy: 'Special rates',
      maxAmount: 'Project-based funding',
      eligibility: 'Defence Establishments, Paramilitary Forces',
      applicableFor: 'Army, Navy, Air Force, BSF, CRPF, CISF establishments and residential complexes',
      description: 'Solarization of defence and paramilitary establishments for energy independence and security.',
      benefits: ['Priority allocation', 'Dedicated funding', 'Strategic installations covered', 'No state approvals needed'],
      link: 'https://www.mod.gov.in/'
    },
    {
      name: 'Solar Study Lamp & Solar Home Lighting',
      authority: 'MNRE',
      subsidy: '50-70% subsidy',
      maxAmount: '₹1,500 per lamp',
      eligibility: 'Students in rural areas, BPL families',
      applicableFor: 'SC/ST students, BPL card holders, families in areas with poor electricity, tribal areas',
      description: 'Distribution of solar study lamps and home lighting systems to students and families without reliable power.',
      benefits: ['50-70% subsidy', 'Free distribution to BPL', '3-year warranty', 'Portable solar lamps'],
      link: 'https://mnre.gov.in/'
    },
    {
      name: 'Canal-Top & Canal-Bank Solar Projects',
      authority: 'MNRE & State Irrigation Departments',
      subsidy: '40% VGF',
      maxAmount: '₹5 Crore per MW',
      eligibility: 'Irrigation Departments, Power Utilities',
      applicableFor: 'State Governments, Irrigation Depts, Private Developers for canal-top installations',
      description: 'Installation of solar panels on irrigation canals to generate power while reducing water evaporation.',
      benefits: ['Viability Gap Funding 40%', 'Dual benefit - power + water conservation', 'No land acquisition cost', 'Priority evacuation'],
      link: 'https://mnre.gov.in/solar/schemes/'
    }
  ];

  const stateSchemes = [
    {
      state: 'Andhra Pradesh',
      scheme: 'AP Solar Policy 2018',
      subsidy: '20-30% additional subsidy',
      website: 'https://nredcap.in/'
    },
    {
      state: 'Telangana',
      scheme: 'Telangana Solar Policy',
      subsidy: '30% capital subsidy for residential',
      website: 'https://www.tsgenco.telangana.gov.in/'
    },
    {
      state: 'Karnataka',
      scheme: 'Karnataka Renewable Energy Policy',
      subsidy: '30% subsidy + ₹10,000/kW',
      website: 'https://kredl.karnataka.gov.in/'
    },
    {
      state: 'Maharashtra',
      scheme: 'Mukhyamantri Saur Krishi Vahini Yojana',
      subsidy: '90% subsidy for farmers',
      website: 'https://www.mahaurja.com/'
    },
    {
      state: 'Gujarat',
      scheme: 'Gujarat Solar Power Policy',
      subsidy: '40% subsidy for residential',
      website: 'https://geda.gujarat.gov.in/'
    },
    {
      state: 'Tamil Nadu',
      scheme: 'TN Solar Policy 2019',
      subsidy: '30% capital subsidy',
      website: 'https://www.tangedco.gov.in/'
    },
    {
      state: 'Rajasthan',
      scheme: 'Rajasthan Solar Energy Policy',
      subsidy: '30% subsidy + ₹15,000/kW',
      website: 'https://energy.rajasthan.gov.in/'
    },
    {
      state: 'Punjab',
      scheme: 'Punjab Solar Power Policy',
      subsidy: '40% subsidy for residential',
      website: 'https://www.pspcl.in/'
    },
    {
      state: 'Haryana',
      scheme: 'Haryana Solar Power Policy',
      subsidy: '30% for rooftop solar',
      website: 'https://hareda.gov.in/'
    },
    {
      state: 'Uttar Pradesh',
      scheme: 'UP Solar Energy Policy',
      subsidy: '30% capital subsidy',
      website: 'https://upneda.org.in/'
    }
  ];

  const taxBenefits = [
    {
      title: 'Accelerated Depreciation',
      description: '40% depreciation in the first year for commercial users',
      icon: '📊'
    },
    {
      title: 'Income Tax Exemption',
      description: '80% exemption on income from solar power generation for 10 years',
      icon: '💰'
    },
    {
      title: 'GST Concession',
      description: 'Reduced GST rate of 5% on solar panels and equipment',
      icon: '🏷️'
    },
    {
      title: 'Custom Duty Exemption',
      description: 'No customs duty on specified solar equipment',
      icon: '🚢'
    }
  ];

  const applicationProcess = [
    { step: 1, title: 'Register on National Portal', description: 'Visit solarrooftop.gov.in and register with details' },
    { step: 2, title: 'Check Eligibility', description: 'Verify your eligibility for subsidy based on system size' },
    { step: 3, title: 'Choose Vendor', description: 'Select from MNRE-approved vendors/installers' },
    { step: 4, title: 'Site Feasibility', description: 'Vendor conducts technical feasibility study' },
    { step: 5, title: 'Submit Application', description: 'Submit online application with required documents' },
    { step: 6, title: 'Installation', description: 'Complete installation after approval' },
    { step: 7, title: 'Inspection', description: 'DISCOM inspects and approves installation' },
    { step: 8, title: 'Receive Subsidy', description: 'Subsidy credited directly to your account' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-br from-purple-500 to-blue-600 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Award className="w-12 h-12" />
          <div>
            <h2 className="text-3xl font-bold">Government Subsidies & Schemes</h2>
            <p className="text-lg opacity-90">Get up to 40% of your installation cost covered!</p>
          </div>
        </div>
      </div>

      {/* Central Government Schemes */}
      <div>
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <span className="bg-gradient-to-r from-orange-500 to-red-500 w-2 h-8 rounded mr-3"></span>
          Central Government Schemes (10 Major Schemes)
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {centralSchemes.map((scheme, index) => (
            <div 
              key={index} 
              className="relative"
            >
              <div
                className={`card transition-all duration-300 border-l-4 border-orange-500 cursor-pointer ${
                  hoveredScheme === index 
                    ? 'shadow-2xl ring-4 ring-orange-400 ring-opacity-60' 
                    : 'hover:shadow-xl'
                }`}
                onMouseEnter={() => setHoveredScheme(index)}
                onMouseLeave={() => setHoveredScheme(null)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold mb-2 text-gray-800 hover:text-orange-600 transition-colors">{scheme.name}</h4>
                    <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                      <Award className="w-3 h-3" />
                      <span>{scheme.authority}</span>
                    </div>
                  </div>
                  <HelpCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                </div>
                
                <div className="flex gap-2 mb-3">
                  <div className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-bold text-sm flex-1 text-center">
                    {scheme.subsidy}
                  </div>
                  <div className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-semibold text-xs flex items-center">
                    Max: {scheme.maxAmount}
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-3">{scheme.description}</p>
                
                <div className="mb-3">
                  <div className="text-xs font-semibold text-gray-700 mb-1.5">Eligibility:</div>
                  <div className="text-gray-600 text-sm bg-gray-50 p-2 rounded">{scheme.eligibility}</div>
                </div>

                <div className="mb-3">
                  <div className="text-xs font-semibold text-gray-700 mb-1.5">Key Benefits:</div>
                  <div className="space-y-1">
                    {scheme.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-gray-700 text-sm">
                        <Check className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={scheme.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold text-sm bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Apply Now / Visit Website</span>
                </a>
              </div>
              
              {/* Hover Tooltip - Beside card */}
              {hoveredScheme === index && (
                <div className={`absolute z-[100] top-0 ${
                  index % 2 === 0 ? 'left-full ml-4' : 'right-full mr-4'
                } w-80 p-4 bg-gradient-to-br from-orange-600 to-red-600 text-white rounded-lg shadow-2xl border-4 border-white animate-fade-in`}>
                  <div className="mb-3">
                    <div className="font-bold text-sm mb-1 flex items-center">
                      <span className="bg-white text-orange-600 px-2 py-0.5 rounded mr-2 text-xs">Applicable For</span>
                    </div>
                    <p className="text-sm">{scheme.applicableFor}</p>
                  </div>
                  <div className="pt-3 border-t border-orange-400">
                    <div className="font-bold text-sm mb-1">💰 Maximum Subsidy Amount</div>
                    <p className="text-xl font-bold">{scheme.maxAmount}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* State Schemes */}
      <div>
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 w-2 h-8 rounded mr-3"></span>
          State Government Schemes (10 Major States)
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stateSchemes.map((scheme, index) => (
            <div key={index} className="card hover:shadow-xl hover:scale-105 transition-all duration-300 border-t-4 border-blue-500">
              <h4 className="text-lg font-bold mb-2 text-blue-800">{scheme.state}</h4>
              <div className="text-gray-700 mb-3 text-sm">{scheme.scheme}</div>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-2 rounded-lg inline-block font-bold text-sm mb-3 shadow-md">
                {scheme.subsidy}
              </div>
              <a
                href={scheme.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  // Ensure link opens properly
                  if (!scheme.website.startsWith('http')) {
                    e.preventDefault();
                    window.open('https://' + scheme.website, '_blank');
                  }
                }}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm font-semibold bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit State Portal</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Tax Benefits */}
      <div>
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <span className="bg-gradient-to-r from-green-500 to-emerald-500 w-2 h-8 rounded mr-3"></span>
          Tax Benefits & Incentives
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {taxBenefits.map((benefit, index) => (
            <div key={index} className="card text-center hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-3">{benefit.icon}</div>
              <h4 className="font-bold mb-2">{benefit.title}</h4>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Application Process */}
      <div className="card">
        <h3 className="text-2xl font-bold mb-6">How to Apply for Subsidy</h3>
        <div className="space-y-4">
          {applicationProcess.map((item) => (
            <div key={item.step} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-solar-500 to-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                {item.step}
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="card bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
        <div className="flex items-start space-x-4">
          <Info className="w-8 h-8 text-blue-600 flex-shrink-0" />
          <div>
            <h4 className="text-lg font-bold mb-2">Need Help with Subsidy Application?</h4>
            <p className="text-gray-700 mb-3">
              Our verified solar agencies can help you navigate the subsidy application process and ensure you receive maximum benefits.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:1800-180-3333"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>1800-180-3333 (MNRE Helpline)</span>
              </a>
              <a
                href="https://pmsuryaghar.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-white text-blue-600 border-2 border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>National Solar Portal</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubsidiesTab;
