import { useState } from 'react';
import { Sun, Zap, TrendingUp } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SolarIrradianceTab = () => {
  const [timeRange, setTimeRange] = useState('daily');

  // Sample data for solar irradiance
  const dailyData = [
    { time: '6 AM', irradiance: 100, power: 0.5 },
    { time: '7 AM', irradiance: 300, power: 1.5 },
    { time: '8 AM', irradiance: 500, power: 2.5 },
    { time: '9 AM', irradiance: 700, power: 3.5 },
    { time: '10 AM', irradiance: 850, power: 4.2 },
    { time: '11 AM', irradiance: 950, power: 4.7 },
    { time: '12 PM', irradiance: 1000, power: 5.0 },
    { time: '1 PM', irradiance: 980, power: 4.9 },
    { time: '2 PM', irradiance: 900, power: 4.5 },
    { time: '3 PM', irradiance: 750, power: 3.7 },
    { time: '4 PM', irradiance: 550, power: 2.7 },
    { time: '5 PM', irradiance: 300, power: 1.5 },
    { time: '6 PM', irradiance: 100, power: 0.5 }
  ];

  const monthlyData = [
    { month: 'Jan', irradiance: 750, power: 3.7 },
    { month: 'Feb', irradiance: 800, power: 4.0 },
    { month: 'Mar', irradiance: 850, power: 4.2 },
    { month: 'Apr', irradiance: 900, power: 4.5 },
    { month: 'May', irradiance: 950, power: 4.7 },
    { month: 'Jun', irradiance: 920, power: 4.6 },
    { month: 'Jul', irradiance: 880, power: 4.4 },
    { month: 'Aug', irradiance: 900, power: 4.5 },
    { month: 'Sep', irradiance: 870, power: 4.3 },
    { month: 'Oct', irradiance: 820, power: 4.1 },
    { month: 'Nov', irradiance: 780, power: 3.9 },
    { month: 'Dec', irradiance: 740, power: 3.7 }
  ];

  const data = timeRange === 'daily' ? dailyData : monthlyData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Solar Irradiance & Power Output</h2>
            <p className="text-gray-600">Real-time analysis of sunlight absorption and energy generation</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeRange('daily')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                timeRange === 'daily'
                  ? 'bg-solar-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setTimeRange('monthly')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                timeRange === 'monthly'
                  ? 'bg-solar-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <StatCard
            icon={<Sun className="w-8 h-8" />}
            title="Peak Irradiance"
            value="1000 W/m²"
            subtitle="Maximum sunlight"
            color="from-yellow-400 to-orange-500"
          />
          <StatCard
            icon={<Zap className="w-8 h-8" />}
            title="Peak Power Output"
            value="5.0 kW"
            subtitle="Maximum generation"
            color="from-blue-400 to-blue-600"
          />
          <StatCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Avg. Efficiency"
            value="18.5%"
            subtitle="System performance"
            color="from-green-400 to-green-600"
          />
        </div>

        {/* Irradiance Chart */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-4">Solar Irradiance (W/m²)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorIrradiance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey={timeRange === 'daily' ? 'time' : 'month'} stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="irradiance" 
                stroke="#f59e0b" 
                fillOpacity={1} 
                fill="url(#colorIrradiance)"
                name="Irradiance (W/m²)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Power Output Chart */}
        <div>
          <h3 className="text-lg font-bold mb-4">Power Output (kW)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey={timeRange === 'daily' ? 'time' : 'month'} stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="power" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
                activeDot={{ r: 7 }}
                name="Power Output (kW)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Information Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard
          title="How Solar Panels Work"
          content="Solar panels absorb sunlight through photovoltaic cells, converting it directly into electricity. Peak production occurs during midday when the sun is at its highest point. The efficiency depends on panel quality, temperature, and angle of installation."
          icon="🌞"
        />
        <InfoCard
          title="Optimal Performance Tips"
          content="Keep panels clean and free from debris. Ensure proper orientation (south-facing in Northern Hemisphere). Regular maintenance checks improve longevity. Monitor performance through our dashboard to identify issues early."
          icon="⚡"
        />
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, subtitle, color }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-4">
    <div className="flex items-center space-x-3">
      <div className={`p-3 rounded-lg bg-gradient-to-br ${color} text-white`}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-gray-600">{title}</div>
        <div className="text-xs text-gray-500">{subtitle}</div>
      </div>
    </div>
  </div>
);

const InfoCard = ({ title, content, icon }) => (
  <div className="card">
    <div className="flex items-start space-x-3">
      <div className="text-4xl">{icon}</div>
      <div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
      </div>
    </div>
  </div>
);

export default SolarIrradianceTab;
