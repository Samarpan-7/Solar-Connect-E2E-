import { useState } from 'react';
import { Calculator, Sun, Zap, TrendingUp, Home, Building2, DollarSign, Leaf, Globe } from 'lucide-react';

const SolarCalculatorTab = () => {
  const [language, setLanguage] = useState('en');
  const [showCalculator, setShowCalculator] = useState(false);
  const [inputs, setInputs] = useState({
    monthlyBill: '',
    consumerType: 'Residential',
    roofType: 'Flat Roof',
    state: 'Telangana'
  });
  const [results, setResults] = useState(null);

  const translations = {
    en: {
      title: 'Solar Savings Calculator',
      subtitle: 'Calculate Your Solar Investment Returns',
      introTitle: 'Want to Know Your Actual Solar Savings?',
      introText: 'Discover how much you can save by switching to solar energy! Get personalized estimates for system costs, government subsidies, monthly savings, and payback period.',
      startButton: 'Calculate My Savings',
      monthlyBill: 'Monthly Electricity Bill (₹)',
      consumerType: 'Consumer Type',
      residential: 'Residential',
      commercial: 'Commercial / Industrial',
      roofType: 'Roof Type',
      flatRoof: 'Flat Roof',
      slopedRoof: 'Sloped Roof',
      state: 'State / Location',
      calculateBtn: 'Calculate Savings',
      results: 'Your Solar Investment Report',
      systemSize: 'Recommended Solar System Size',
      panelsRequired: 'Number of Solar Panels Required',
      systemCost: 'Estimated System Cost',
      subsidy: 'Maximum Government Subsidy',
      finalCost: 'Final Cost After Subsidy',
      monthlySavings: 'Monthly Electricity Savings',
      yearlySavings: 'Yearly Electricity Savings',
      paybackPeriod: 'Investment Payback Period',
      lifetimeSavings: '25-Year Total Savings',
      eligible: '✓ You are eligible for government subsidy',
      notEligible: '✗ Government subsidy is not applicable for commercial users',
      environmental: '🌱 Clean energy for a sustainable future',
      years: 'years',
      panels: 'panels',
      recalculate: 'Recalculate with Different Values'
    },
    te: {
      title: 'సౌర పొదుపు లెక్కింపు యంత్రం',
      subtitle: 'మీ సౌర పెట్టుబడి రాబడులను లెక్కించండి',
      introTitle: 'మీ వాస్తవ సౌర పొదుపును తెలుసుకోవాలనుకుంటున్నారా?',
      introText: 'సౌర శక్తికి మారడం ద్వారా మీరు ఎంత ఆదా చేయవచ్చో కనుగొనండి! వ్యవస్థ ఖర్చులు, ప్రభుత్వ సబ్సిడీలు, నెలవారీ పొదుపు మరియు పెట్టుబడి రాబడి కాలం కోసం వ్యక్తిగత అంచనాలను పొందండి.',
      startButton: 'నా పొదుపును లెక్కించండి',
      monthlyBill: 'నెలవారీ విద్యుత్ బిల్లు (₹)',
      consumerType: 'వినియోగదారుని రకం',
      residential: 'నివాస గృహం',
      commercial: 'వాణిజ్య / పరిశ్రమ',
      roofType: 'పైకప్పు రకం',
      flatRoof: 'చదును పైకప్పు',
      slopedRoof: 'వాలు పైకప్పు',
      state: 'రాష్ట్రం / ప్రాంతం',
      calculateBtn: 'పొదుపును లెక్కించండి',
      results: 'మీ సౌర పెట్టుబడి నివేదిక',
      systemSize: 'సౌర వ్యవస్థ సామర్థ్యం',
      panelsRequired: 'అవసరమైన సౌర ప్యానెల్స్',
      systemCost: 'అంచనా వ్యవస్థ ఖర్చు',
      subsidy: 'ప్రభుత్వ సబ్సిడీ',
      finalCost: 'సబ్సిడీ తర్వాత ఖర్చు',
      monthlySavings: 'నెలవారీ విద్యుత్ పొదుపు',
      yearlySavings: 'వార్షిక విద్యుత్ పొదుపు',
      paybackPeriod: 'పెట్టుబడి తిరిగి వచ్చే కాలం',
      lifetimeSavings: '25 సంవత్సరాల మొత్తం పొదుపు',
      eligible: '✓ మీరు ప్రభుత్వ సబ్సిడీకి అర్హులు',
      notEligible: '✗ వాణిజ్య వినియోగదారులకు ప్రభుత్వ సబ్సిడీ వర్తించదు',
      environmental: '🌱 స్థిరమైన భవిష్యత్తు కోసం స్వచ్ఛమైన శక్తి',
      years: 'సంవత్సరాలు',
      panels: 'ప్యానెల్స్',
      recalculate: 'వేరే విలువలతో తిరిగి లెక్కించండి'
    }
  };

  const t = translations[language];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const calculateSavings = () => {
    const monthlyBill = parseFloat(inputs.monthlyBill);
    if (!monthlyBill || monthlyBill <= 0) {
      alert(language === 'en' ? 'Please enter a valid monthly bill amount' : 'దయచేసి చెల్లుబాటు అయ్యే నెలవారీ బిల్లు మొత్తాన్ని నమోదు చేయండి');
      return;
    }

    // Calculation constants
    const tariffPerUnit = 6;
    const unitsPerKwPerMonth = 120;
    const panelWattage = 540; // 540W panels
    const costPerKw = 50000;

    // Calculate monthly units consumed
    const monthlyUnits = monthlyBill / tariffPerUnit;

    // Calculate required solar capacity
    const requiredKw = Math.ceil(monthlyUnits / unitsPerKwPerMonth);

    // Calculate number of panels
    const numberOfPanels = Math.round(requiredKw / 0.54);

    // Calculate total system cost
    const totalSystemCost = requiredKw * costPerKw;

    // Calculate subsidy (only for residential)
    let totalSubsidy = 0;
    if (inputs.consumerType === 'Residential') {
      if (requiredKw <= 3) {
        totalSubsidy = requiredKw * 18000;
      } else if (requiredKw <= 10) {
        // First 3 kW at ₹18,000, rest at ₹9,000
        totalSubsidy = (3 * 18000) + ((requiredKw - 3) * 9000);
      }
      // Above 10 kW, no subsidy
    }

    // Calculate final cost after subsidy
    const finalCost = totalSystemCost - totalSubsidy;

    // Calculate savings - Solar system generates electricity, reducing grid dependency
    // Assuming system offsets 90-95% of electricity consumption (accounting for night usage from grid)
    const solarOffsetPercentage = 0.90; // 90% offset with net metering
    const gridElectricityAfterSolar = monthlyUnits * (1 - solarOffsetPercentage);
    const monthlyBillAfterSolar = gridElectricityAfterSolar * tariffPerUnit;
    
    // Monthly savings = current bill - bill after solar installation
    const monthlySavings = monthlyBill - monthlyBillAfterSolar;
    const yearlySavings = monthlySavings * 12;
    const paybackPeriod = (finalCost / yearlySavings).toFixed(1);
    const lifetimeSavings = yearlySavings * 25;

    setResults({
      systemSize: requiredKw,
      numberOfPanels,
      totalSystemCost,
      totalSubsidy,
      finalCost,
      monthlySavings,
      yearlySavings,
      paybackPeriod,
      lifetimeSavings,
      monthlyUnits: monthlyUnits.toFixed(0),
      isEligibleForSubsidy: inputs.consumerType === 'Residential' && requiredKw <= 10
    });

    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (!showCalculator) {
    return (
      <div className="space-y-6">
        {/* Language Toggle */}
        <div className="flex justify-end">
          <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                language === 'en'
                  ? 'bg-solar-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                language === 'te'
                  ? 'bg-solar-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              తెలుగు
            </button>
          </div>
        </div>

        {/* Introduction Card */}
        <div className="card bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 border-2 border-orange-200">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-solar-400 to-orange-500 p-6 rounded-full shadow-xl">
                <Calculator className="w-16 h-16 text-white" />
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-solar-600 to-orange-600 bg-clip-text text-transparent mb-3">
                {t.introTitle}
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                {t.introText}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-4">
              <div className="bg-white rounded-xl p-4 shadow-md">
                <Sun className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-700">
                  {language === 'en' ? 'System Sizing' : 'వ్యవస్థ పరిమాణం'}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <DollarSign className="w-10 h-10 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-700">
                  {language === 'en' ? 'Subsidy Calculation' : 'సబ్సిడీ లెక్కింపు'}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <TrendingUp className="w-10 h-10 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-700">
                  {language === 'en' ? 'Savings Estimate' : 'పొదుపు అంచనా'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowCalculator(true)}
              className="btn-primary text-xl px-12 py-4 inline-flex items-center space-x-3 transform hover:scale-105"
            >
              <Calculator className="w-6 h-6" />
              <span>{t.startButton}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Language Toggle */}
      <div className="flex justify-end">
        <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
              language === 'en'
                ? 'bg-solar-500 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('te')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
              language === 'te'
                ? 'bg-solar-500 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            తెలుగు
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="card bg-gradient-to-r from-solar-500 to-orange-500 text-white">
        <div className="flex items-center space-x-4">
          <Calculator className="w-12 h-12" />
          <div>
            <h2 className="text-3xl font-bold">{t.title}</h2>
            <p className="text-solar-100 text-lg">{t.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="card">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">{language === 'en' ? 'Enter Your Details' : 'మీ వివరాలను నమోదు చేయండి'}</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Monthly Bill */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              {t.monthlyBill} *
            </label>
            <div className="relative">
              <Zap className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="number"
                name="monthlyBill"
                value={inputs.monthlyBill}
                onChange={handleInputChange}
                className="input-field pl-11"
                placeholder={language === 'en' ? 'e.g., 3000' : 'ఉదా., 3000'}
                required
              />
            </div>
          </div>

          {/* Consumer Type */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              {t.consumerType} *
            </label>
            <div className="relative">
              <Home className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                name="consumerType"
                value={inputs.consumerType}
                onChange={handleInputChange}
                className="input-field pl-11"
              >
                <option value="Residential">{t.residential}</option>
                <option value="Commercial">{t.commercial}</option>
              </select>
            </div>
          </div>

          {/* Roof Type */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              {t.roofType}
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                name="roofType"
                value={inputs.roofType}
                onChange={handleInputChange}
                className="input-field pl-11"
              >
                <option value="Flat Roof">{t.flatRoof}</option>
                <option value="Sloped Roof">{t.slopedRoof}</option>
              </select>
            </div>
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              {t.state}
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                name="state"
                value={inputs.state}
                onChange={handleInputChange}
                className="input-field pl-11"
              >
                <option value="Telangana">Telangana</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Maharashtra">Maharashtra</option>
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={calculateSavings}
          className="btn-primary mt-6 w-full text-lg py-4 flex items-center justify-center space-x-3"
        >
          <Calculator className="w-6 h-6" />
          <span>{t.calculateBtn}</span>
        </button>
      </div>

      {/* Results Section */}
      {results && (
        <div id="results-section" className="space-y-6 animate-fade-in">
          {/* Results Header */}
          <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <h3 className="text-3xl font-bold text-green-800 mb-4 flex items-center space-x-3">
              <TrendingUp className="w-8 h-8" />
              <span>{t.results}</span>
            </h3>
            <p className={`text-lg font-semibold ${results.isEligibleForSubsidy ? 'text-green-700' : 'text-orange-700'}`}>
              {results.isEligibleForSubsidy ? t.eligible : t.notEligible}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* System Size */}
            <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white transform hover:scale-105 transition-transform">
              <Sun className="w-12 h-12 mb-3 opacity-90" />
              <h4 className="text-sm opacity-90 mb-2">{t.systemSize}</h4>
              <p className="text-4xl font-bold">{results.systemSize} kW</p>
            </div>

            {/* Panels Required */}
            <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white transform hover:scale-105 transition-transform">
              <Zap className="w-12 h-12 mb-3 opacity-90" />
              <h4 className="text-sm opacity-90 mb-2">{t.panelsRequired}</h4>
              <p className="text-4xl font-bold">{results.numberOfPanels} {t.panels}</p>
            </div>

            {/* Monthly Units */}
            <div className="card bg-gradient-to-br from-yellow-500 to-orange-500 text-white transform hover:scale-105 transition-transform">
              <TrendingUp className="w-12 h-12 mb-3 opacity-90" />
              <h4 className="text-sm opacity-90 mb-2">{language === 'en' ? 'Monthly Consumption' : 'నెలవారీ వినియోగం'}</h4>
              <p className="text-4xl font-bold">{results.monthlyUnits} kWh</p>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* System Cost */}
            <div className="card border-l-4 border-blue-500">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">{t.systemCost}</h4>
              <p className="text-3xl font-bold text-blue-600">{formatCurrency(results.totalSystemCost)}</p>
            </div>

            {/* Subsidy */}
            <div className="card border-l-4 border-green-500">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">{t.subsidy}</h4>
              <p className="text-3xl font-bold text-green-600">
                {results.totalSubsidy > 0 ? `- ${formatCurrency(results.totalSubsidy)}` : formatCurrency(0)}
              </p>
            </div>

            {/* Final Cost */}
            <div className="card border-l-4 border-purple-500 md:col-span-2 bg-gradient-to-br from-purple-50 to-indigo-50">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">{t.finalCost}</h4>
              <p className="text-4xl font-bold text-purple-600">{formatCurrency(results.finalCost)}</p>
            </div>
          </div>

          {/* Savings */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card border-l-4 border-green-500">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">{t.monthlySavings}</h4>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(results.monthlySavings)}</p>
            </div>

            <div className="card border-l-4 border-green-600">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">{t.yearlySavings}</h4>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(results.yearlySavings)}</p>
            </div>
          </div>

          {/* Payback & Lifetime */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card bg-gradient-to-br from-orange-50 to-red-50 border-l-4 border-orange-500">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">{t.paybackPeriod}</h4>
              <p className="text-4xl font-bold text-orange-600">{results.paybackPeriod} {t.years}</p>
            </div>

            <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-green-500">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">{t.lifetimeSavings}</h4>
              <p className="text-4xl font-bold text-green-600">{formatCurrency(results.lifetimeSavings)}</p>
            </div>
          </div>

          {/* Environmental Message */}
          <div className="card bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center">
            <Leaf className="w-12 h-12 mx-auto mb-3" />
            <p className="text-xl font-semibold">{t.environmental}</p>
          </div>

          {/* Recalculate Button */}
          <button
            onClick={() => {
              setResults(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-secondary w-full text-lg py-4"
          >
            {t.recalculate}
          </button>
        </div>
      )}
    </div>
  );
};

export default SolarCalculatorTab;
