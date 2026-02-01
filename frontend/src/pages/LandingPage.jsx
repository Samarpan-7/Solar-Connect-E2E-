import { useNavigate } from 'react-router-dom';
import { Sun, Zap, Users, Shield, TrendingUp, Leaf } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-solar-400 to-solar-600 p-2 rounded-xl">
                <Sun className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-solar-600 to-orange-600 bg-clip-text text-transparent">
                Solar Connect
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="text-gray-700 font-semibold hover:text-solar-600 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="btn-primary"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Empowering Your Journey to
                <span className="block bg-gradient-to-r from-solar-500 to-orange-500 bg-clip-text text-transparent">
                  Clean Energy
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with trusted solar panel providers, compare services, and make informed decisions
                for a sustainable future. Your one-stop platform for solar energy adoption.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/signup')}
                  className="btn-primary text-lg"
                >
                  Start Your Solar Journey
                </button>
                <button className="btn-secondary text-lg">
                  Learn More
                </button>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-solar-600">500+</div>
                  <div className="text-sm text-gray-600">Verified Providers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-solar-600">10K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-solar-600">98%</div>
                  <div className="text-sm text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-solar-400 to-orange-400 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 animate-float">
                <img
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop"
                  alt="Solar Panels"
                  className="rounded-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Solar Connect?</h2>
            <p className="text-xl text-gray-600">Your trusted partner in renewable energy adoption</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users className="w-12 h-12" />}
              title="Verified Providers"
              description="Connect with certified and trusted solar panel providers with proven track records"
              color="from-blue-400 to-blue-600"
            />
            <FeatureCard
              icon={<TrendingUp className="w-12 h-12" />}
              title="Compare & Choose"
              description="Compare costs, warranties, subsidies, and ratings to make the best decision"
              color="from-green-400 to-green-600"
            />
            <FeatureCard
              icon={<Shield className="w-12 h-12" />}
              title="Expert Support"
              description="Access licensed electricians and installation partners for safe setup"
              color="from-purple-400 to-purple-600"
            />
            <FeatureCard
              icon={<Zap className="w-12 h-12" />}
              title="Government Subsidies"
              description="Get guidance on available subsidies and financial assistance programs"
              color="from-solar-400 to-solar-600"
            />
            <FeatureCard
              icon={<Leaf className="w-12 h-12" />}
              title="Sustainability Insights"
              description="Track your environmental impact and contribution to clean energy"
              color="from-emerald-400 to-emerald-600"
            />
            <FeatureCard
              icon={<Sun className="w-12 h-12" />}
              title="Long-term Savings"
              description="Calculate your savings and ROI with our advanced energy calculators"
              color="from-orange-400 to-orange-600"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center card bg-gradient-to-br from-solar-500 to-orange-500 text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Go Solar?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who have made the switch to clean, renewable energy
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="bg-white text-solar-600 font-bold py-4 px-10 rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Sun className="w-8 h-8 text-solar-400" />
            <span className="text-2xl font-bold">Solar Connect</span>
          </div>
          <p className="text-gray-400 mb-4">Empowering renewable energy adoption since 2026</p>
          <p className="text-sm text-gray-500">© 2026 Solar Connect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, color }) => {
  return (
    <div className="card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className={`inline-block p-4 rounded-2xl bg-gradient-to-br ${color} text-white mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default LandingPage;
