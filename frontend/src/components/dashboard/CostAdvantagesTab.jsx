import { DollarSign, TrendingDown, Leaf, Home, Zap, Shield, Award, Check } from 'lucide-react';
import { useState } from 'react';

const CostAdvantagesTab = ({ onTabChange }) => {
  const [hoveredAdvantage, setHoveredAdvantage] = useState(null);

  const advantages = [
    {
      icon: <TrendingDown className="w-8 h-8" />,
      title: 'Reduce Electricity Bills by 50-90%',
      description: 'Solar panels generate free electricity, dramatically reducing your monthly bills. Most systems pay for themselves within 5-7 years.',
      details: 'With average monthly savings of ₹3,000-₹5,000, a typical 5kW system generates approximately 600-750 units per month. This translates to annual savings of ₹36,000-₹60,000, ensuring complete payback within 5-7 years.',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Environmental Impact',
      description: 'A typical residential solar system offsets 3-4 tons of carbon dioxide annually, equivalent to planting 100 trees every year.',
      details: 'By switching to solar, you prevent approximately 75-100 tons of CO2 emissions over 25 years. This is equivalent to removing 16 cars from the road or planting 2,500 trees. You directly contribute to fighting climate change.',
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: 'Increase Property Value',
      description: 'Homes with solar panels sell 20% faster and for 17% more than homes without solar systems.',
      details: 'Studies show solar installations add ₹3-5 lakhs to property value. Buyers actively seek energy-efficient homes, making your property more attractive. Real estate experts confirm solar homes spend 30% less time on market.',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Energy Independence',
      description: 'Generate your own clean energy and reduce dependence on the grid. Battery storage ensures power during outages.',
      details: 'With solar + battery backup, you gain complete energy autonomy. During grid failures, your home remains powered. Net metering allows selling excess power back to the grid, further reducing costs by 20-30%.',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Low Maintenance',
      description: 'Solar panels require minimal maintenance - just occasional cleaning. Most come with 25-year warranties.',
      details: 'Annual maintenance cost is under ₹2,000. Panels are self-cleaning in rain. No moving parts means minimal wear. Performance warranty guarantees 80% efficiency after 25 years. Inverter needs replacement once in 10-12 years (₹40,000).',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Government Incentives',
      description: 'Take advantage of tax credits, rebates, and subsidies that can cover 30-40% of installation costs.',
      details: 'MNRE provides 40% subsidy for 1-3kW systems (₹18,000/kW) and 20% for 3-10kW (₹9,000/kW). Additional state subsidies up to 30%. Accelerated depreciation for commercial users saves 40% in first year. Zero customs duty on equipment.',
      color: 'from-orange-400 to-orange-600'
    }
  ];

  const costBreakdown = [
    { item: 'Solar Panels (5kW system)', cost: '₹2,00,000', percentage: 40 },
    { item: 'Inverter & Battery', cost: '₹1,50,000', percentage: 30 },
    { item: 'Installation & Labor', cost: '₹80,000', percentage: 16 },
    { item: 'Wiring & Accessories', cost: '₹40,000', percentage: 8 },
    { item: 'Permits & Documentation', cost: '₹30,000', percentage: 6 }
  ];

  const savings = [
    { year: 'Year 1', cost: 300000, savings: 45000, netCost: 255000 },
    { year: 'Year 2', cost: 300000, savings: 90000, netCost: 210000 },
    { year: 'Year 3', cost: 300000, savings: 135000, netCost: 165000 },
    { year: 'Year 4', cost: 300000, savings: 180000, netCost: 120000 },
    { year: 'Year 5', cost: 300000, savings: 225000, netCost: 75000 },
    { year: 'Year 6', cost: 300000, savings: 270000, netCost: 30000 },
    { year: 'Year 7', cost: 300000, savings: 315000, netCost: -15000 },
    { year: 'Year 10', cost: 300000, savings: 450000, netCost: -150000 },
    { year: 'Year 15', cost: 300000, savings: 675000, netCost: -375000 },
    { year: 'Year 25', cost: 300000, savings: 1125000, netCost: -825000 }
  ];

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="card bg-gradient-to-br from-solar-500 to-orange-500 text-white">
        <h2 className="text-3xl font-bold mb-4">One-Time Investment, Lifetime Benefits</h2>
        <p className="text-lg opacity-90 mb-6">
          Solar energy is not an expense - it's an investment that pays you back with free electricity for 25+ years!
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl font-bold">₹3 Lakh</div>
            <div className="text-sm opacity-90">Average Installation Cost (5kW)</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl font-bold">5-7 Years</div>
            <div className="text-sm opacity-90">Payback Period</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl font-bold">25+ Years</div>
            <div className="text-sm opacity-90">System Lifespan</div>
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="card">
        <h3 className="text-2xl font-bold mb-6">Investment Breakdown (5kW Residential System)</h3>
        <div className="space-y-4">
          {costBreakdown.map((item, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{item.item}</span>
                <span className="text-lg font-bold text-solar-600">{item.cost}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-solar-400 to-solar-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 mt-1">{item.percentage}% of total cost</div>
            </div>
          ))}
          <div className="bg-solar-50 border-2 border-solar-500 rounded-lg p-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">Total Investment</span>
              <span className="text-2xl font-bold text-solar-600">₹3,00,000</span>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              * After 30% government subsidy: <span className="font-bold text-green-600">₹2,10,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Return on Investment */}
      <div className="card">
        <h3 className="text-2xl font-bold mb-6">Return on Investment Over Time</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left font-semibold">Timeline</th>
                <th className="px-4 py-3 text-right font-semibold">Initial Cost</th>
                <th className="px-4 py-3 text-right font-semibold">Electricity Savings</th>
                <th className="px-4 py-3 text-right font-semibold">Net Cost</th>
                <th className="px-4 py-3 text-center font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {savings.map((row, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold">{row.year}</td>
                  <td className="px-4 py-3 text-right">₹{row.cost.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-green-600 font-semibold">
                    +₹{row.savings.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right font-bold">
                    <span className={row.netCost > 0 ? 'text-orange-600' : 'text-green-600'}>
                      ₹{Math.abs(row.netCost).toLocaleString()}
                      {row.netCost < 0 && ' profit'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {row.netCost <= 0 ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        ✓ Paid Off
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                        Paying Back
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-semibold">
            💡 Breakeven Point: Year 7 - After this, every rupee saved is pure profit for the next 18+ years! Total lifetime savings: ₹8.25 Lakhs+
          </p>
        </div>
      </div>

      {/* Advantages Grid */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Key Advantages of Solar Energy</h3>
        <p className="text-gray-600 mb-4 text-sm">💡 Hover over each card to see detailed benefits</p>
        <div className="grid md:grid-cols-2 gap-8">
          {advantages.map((advantage, index) => (
            <div 
              key={index} 
              className="relative"
            >
              <div
                className={`card transition-all duration-300 relative ${
                  hoveredAdvantage === index 
                    ? 'shadow-2xl ring-4 ring-blue-500 ring-opacity-60' 
                    : 'hover:shadow-xl'
                }`}
                onMouseEnter={() => setHoveredAdvantage(index)}
                onMouseLeave={() => setHoveredAdvantage(null)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${advantage.color} text-white flex-shrink-0`}>
                    {advantage.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold mb-2">{advantage.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{advantage.description}</p>
                  </div>
                </div>
              </div>
              
              {/* Expanded Details on Hover - Absolutely Positioned Below */}
              {hoveredAdvantage === index && (
                <div className="absolute left-0 right-0 top-full mt-2 z-[100] animate-fade-in">
                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-lg shadow-2xl border-4 border-white">
                    <div className="flex items-center space-x-2 mb-2">
                      <Check className="w-5 h-5 text-white" />
                      <span className="font-bold text-white">Detailed Benefits:</span>
                    </div>
                    <p className="text-white text-sm leading-relaxed">
                      {advantage.details}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="card bg-gradient-to-br from-blue-500 to-purple-600 text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Ready to Start Saving?</h3>
        <p className="text-lg opacity-90 mb-6">
          Explore verified solar agencies and licensed electricians to begin your journey to clean, affordable energy!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => onTabChange('agencies')}
            className="bg-white text-blue-600 font-bold px-8 py-3 rounded-full hover:shadow-xl hover:scale-105 transition-all"
          >
            View Solar Agencies
          </button>
          <button 
            onClick={() => onTabChange('electricians')}
            className="bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-3 rounded-full hover:bg-white/30 hover:scale-105 transition-all border-2 border-white"
          >
            View Electricians
          </button>
        </div>
      </div>
    </div>
  );
};

export default CostAdvantagesTab;
