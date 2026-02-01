import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingDown, Zap, DollarSign, Calendar } from 'lucide-react';

const ComparisonTab = () => {
  const [viewMode, setViewMode] = useState('1month'); // 1month, 6months, 1year

  // Data for 1 month comparison (daily)
  const monthlyData = [
    { day: 'Week 1', solar: 150, traditional: 1200 },
    { day: 'Week 2', solar: 180, traditional: 1180 },
    { day: 'Week 3', solar: 200, traditional: 1250 },
    { day: 'Week 4', solar: 170, traditional: 1220 }
  ];

  // Data for 6 months comparison
  const sixMonthsData = [
    { month: 'Month 1', solar: 700, traditional: 4850, savings: 4150 },
    { month: 'Month 2', solar: 650, traditional: 4900, savings: 4250 },
    { month: 'Month 3', solar: 500, traditional: 5200, savings: 4700 },
    { month: 'Month 4', solar: 550, traditional: 4800, savings: 4250 },
    { month: 'Month 5', solar: 600, traditional: 4950, savings: 4350 },
    { month: 'Month 6', solar: 800, traditional: 5100, savings: 4300 }
  ];

  // Data for 1 year comparison
  const yearlyData = [
    { month: 'Jan', solar: 800, traditional: 4850 },
    { month: 'Feb', solar: 750, traditional: 4900 },
    { month: 'Mar', solar: 500, traditional: 5200 },
    { month: 'Apr', solar: 450, traditional: 4800 },
    { month: 'May', solar: 400, traditional: 4950 },
    { month: 'Jun', solar: 650, traditional: 5100 },
    { month: 'Jul', solar: 850, traditional: 5300 },
    { month: 'Aug', solar: 900, traditional: 5150 },
    { month: 'Sep', solar: 700, traditional: 5050 },
    { month: 'Oct', solar: 600, traditional: 4900 },
    { month: 'Nov', solar: 700, traditional: 4850 },
    { month: 'Dec', solar: 800, traditional: 5200 }
  ];

  const getCurrentData = () => {
    switch (viewMode) {
      case '1month':
        return monthlyData;
      case '6months':
        return sixMonthsData;
      case '1year':
        return yearlyData;
      default:
        return monthlyData;
    }
  };

  const calculateTotals = () => {
    const data = getCurrentData();
    const solarTotal = data.reduce((sum, item) => sum + item.solar, 0);
    const traditionalTotal = data.reduce((sum, item) => sum + item.traditional, 0);
    const savings = traditionalTotal - solarTotal;
    const savingsPercent = ((savings / traditionalTotal) * 100).toFixed(1);

    return { solarTotal, traditionalTotal, savings, savingsPercent };
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-br from-green-500 to-teal-500 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <TrendingDown className="w-12 h-12" />
          <div>
            <h2 className="text-3xl font-bold">Cost Comparison Analysis</h2>
            <p className="text-lg opacity-90">Solar vs Traditional Electricity Bills</p>
          </div>
        </div>
      </div>

      {/* View Mode Selector */}
      <div className="flex space-x-4">
        <button
          onClick={() => setViewMode('1month')}
          className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${
            viewMode === '1month'
              ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg'
              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-green-500'
          }`}
        >
          <Calendar className="w-5 h-5 inline mr-2" />
          1 Month
        </button>
        <button
          onClick={() => setViewMode('6months')}
          className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${
            viewMode === '6months'
              ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg'
              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-green-500'
          }`}
        >
          <Calendar className="w-5 h-5 inline mr-2" />
          6 Months
        </button>
        <button
          onClick={() => setViewMode('1year')}
          className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${
            viewMode === '1year'
              ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg'
              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-green-500'
          }`}
        >
          <Calendar className="w-5 h-5 inline mr-2" />
          1 Year
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
          <Zap className="w-8 h-8 mb-2" />
          <p className="text-sm opacity-90">Solar Energy Bill</p>
          <p className="text-3xl font-bold">₹{totals.solarTotal.toLocaleString()}</p>
        </div>

        <div className="card bg-gradient-to-br from-red-500 to-pink-500 text-white">
          <Zap className="w-8 h-8 mb-2" />
          <p className="text-sm opacity-90">Traditional Electricity</p>
          <p className="text-3xl font-bold">₹{totals.traditionalTotal.toLocaleString()}</p>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-teal-500 text-white">
          <DollarSign className="w-8 h-8 mb-2" />
          <p className="text-sm opacity-90">Your Savings</p>
          <p className="text-3xl font-bold">₹{totals.savings.toLocaleString()}</p>
          <p className="text-sm opacity-90">{totals.savingsPercent}% reduction</p>
        </div>
      </div>

      {/* Bar Chart Comparison */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">
          {viewMode === '1month' && 'Monthly Bill Comparison (Weekly Breakdown)'}
          {viewMode === '6months' && '6-Month Bill Comparison'}
          {viewMode === '1year' && 'Annual Bill Comparison'}
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={getCurrentData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey={viewMode === '1month' ? 'day' : 'month'} 
              style={{ fontSize: '14px' }}
            />
            <YAxis 
              label={{ value: 'Cost (₹)', angle: -90, position: 'insideLeft' }}
              style={{ fontSize: '14px' }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px' }}
              formatter={(value) => [`₹${value}`, '']}
            />
            <Legend />
            <Bar dataKey="solar" fill="#F59E0B" name="Solar Energy" radius={[8, 8, 0, 0]} />
            <Bar dataKey="traditional" fill="#EF4444" name="Traditional Electricity" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart - Cumulative Savings (for 6 months and 1 year) */}
      {(viewMode === '6months' || viewMode === '1year') && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Cumulative Savings Over Time</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={getCurrentData().map((item, index, arr) => {
              const cumulativeSavings = arr.slice(0, index + 1).reduce((sum, d) => sum + (d.traditional - d.solar), 0);
              return {
                ...item,
                cumulativeSavings
              };
            })}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" style={{ fontSize: '14px' }} />
              <YAxis 
                label={{ value: 'Cumulative Savings (₹)', angle: -90, position: 'insideLeft' }}
                style={{ fontSize: '14px' }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px' }}
                formatter={(value) => [`₹${value.toLocaleString()}`, 'Total Savings']}
              />
              <Line 
                type="monotone" 
                dataKey="cumulativeSavings" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Key Insights */}
      <div className="card bg-gradient-to-br from-blue-50 to-indigo-50">
        <h3 className="text-xl font-bold mb-4 text-blue-900">Key Insights</h3>
        <div className="grid gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <p className="font-semibold text-gray-800">Average Monthly Savings</p>
              <p className="text-gray-600">
                {viewMode === '1month' && 'You save approximately ₹4,100 per month with solar energy'}
                {viewMode === '6months' && 'Average savings of ₹4,333 per month over 6 months'}
                {viewMode === '1year' && 'Average savings of ₹4,233 per month throughout the year'}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div>
              <p className="font-semibold text-gray-800">Cost Reduction</p>
              <p className="text-gray-600">
                Solar energy reduces your electricity bill by {totals.savingsPercent}% on average
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <p className="font-semibold text-gray-800">Annual Projection</p>
              <p className="text-gray-600">
                Based on current data, you could save approximately ₹{(totals.savings * (12 / getCurrentData().length)).toFixed(0).toLocaleString()} annually
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <div>
              <p className="font-semibold text-gray-800">Break-Even Timeline</p>
              <p className="text-gray-600">
                With an average initial investment of ₹1,60,000 (after subsidy for 3-5kW system), you'll break even in approximately 3-4 years
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTab;
