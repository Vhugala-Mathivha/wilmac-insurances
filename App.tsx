import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  CheckCircle,
  ArrowRight,
  Umbrella,
  LogOut,
  User,
  Shield,
  Phone
} from 'lucide-react';
import { Button } from './components/Button';
import { AIChat } from './components/AIChat';
import { Toast } from './components/Toast';
import { LoginModal } from './components/LoginModal';
import { QuoteModal } from './components/QuoteModal';
import { AgentModal } from './components/AgentModal';
import { PlansPage } from './components/PlansPage';
import { InsuranceType } from './types';
import { authService } from './services/authService';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // View State
  const [currentView, setCurrentView] = useState<'home' | 'plans'>('home');

  // Functional State
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null);

  // Constants for Images
  const LOGO_URL = "public/images/wilmac-logo.png"; // Placeholder brand mark

  useEffect(() => {
    // Scroll listener
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Check for existing session
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser.name);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Helper to ensure smooth scrolling & Navigation
  const handleNavigation = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    
    // If it's a section on the home page
    if (target.startsWith('#')) {
      const id = target.substring(1);
      
      if (currentView !== 'home') {
        setCurrentView('home');
        // Wait for render then scroll
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (target === 'plans') {
      setCurrentView('plans');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleLogin = (name: string) => {
    setUser(name);
    setToast({ message: `Welcome back, ${name}!`, type: 'success' });
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setToast({ message: "You have been logged out.", type: 'info' });
  };

  const handleQuoteSubmit = () => {
    setToast({ message: "Quote calculated successfully!", type: 'success' });
  };

  const showFeatureNotAvailable = (e: React.MouseEvent) => {
    e.preventDefault();
    setToast({ message: "This feature is coming soon to the demo!", type: 'info' });
  };

  const products = [
    {
      type: InsuranceType.AUTO,
      title: "Auto Insurance",
      description: "Comprehensive coverage for your vehicles. Drive with confidence knowing Wilmac is your copilot.",
      bgImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800",
      iconUrl: "public/images/car-logo.png",
    },
    {
      type: InsuranceType.HOME,
      title: "Home Insurance",
      description: "Protect your sanctuary. We cover everything from structural damage to personal property.",
      bgImage: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=800",
      iconUrl: "public/images/house-logo.png",
    },
    {
      type: InsuranceType.LIFE,
      title: "Life Insurance",
      description: "Secure your family's future. Flexible term and whole life plans tailored to your needs.",
      bgImage: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800",
      iconUrl: "public/images/life-logo.png",
    },
    {
      type: InsuranceType.BUSINESS,
      title: "Business Insurance",
      description: "Safeguard your enterprise. Liability, property, and workers' compensation solutions.",
      bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
      iconUrl: "public/images/business-logo.png",
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-black-soft">
      {/* Notifications */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleLogin} 
      />
      <QuoteModal 
        isOpen={isQuoteOpen} 
        onClose={() => setIsQuoteOpen(false)} 
        onSubmit={handleQuoteSubmit} 
      />
      <AgentModal 
        isOpen={isAgentOpen}
        onClose={() => setIsAgentOpen(false)}
      />

      {/* Navigation */}
      <nav 
        className={`fixed w-full z-40 transition-all duration-300 bg-white border-b border-olive-100 ${
          scrolled ? 'py-4 shadow-sm' : 'py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={(e) => handleNavigation(e, '#home')}>
            {/* Main Logo Image */}
            <img src={LOGO_URL} alt="Wilmac Logo" className="h-16 w-auto" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" onClick={(e) => handleNavigation(e, '#home')} className="text-black-soft hover:text-olive-600 font-medium transition-colors">Home</a>
            <a href="#" onClick={(e) => handleNavigation(e, 'plans')} className={`font-medium transition-colors ${currentView === 'plans' ? 'text-olive-600 font-bold' : 'text-black-soft hover:text-olive-600'}`}>Products</a>
            <a href="#about" onClick={(e) => handleNavigation(e, '#about')} className="text-black-soft hover:text-olive-600 font-medium transition-colors">About Us</a>
            <a href="#contact" onClick={(e) => handleNavigation(e, '#contact')} className="text-black-soft hover:text-olive-600 font-medium transition-colors">Contact</a>
            
            {user ? (
               <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                  <div className="flex items-center space-x-2 text-olive-800 font-bold">
                    <User size={18} />
                    <span>{user}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut size={18} />
                  </button>
               </div>
            ) : (
              <Button variant="primary" className="py-2 px-4 text-sm" onClick={() => setIsLoginOpen(true)}>
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-black-rich focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg py-6 px-6 flex flex-col space-y-4 md:hidden border-t border-gray-100 animate-fade-in-down">
            <a href="#home" onClick={(e) => handleNavigation(e, '#home')} className="text-lg font-medium text-black-soft">Home</a>
            <a href="#" onClick={(e) => handleNavigation(e, 'plans')} className="text-lg font-medium text-black-soft">Products</a>
            <a href="#about" onClick={(e) => handleNavigation(e, '#about')} className="text-lg font-medium text-black-soft">About Us</a>
            <a href="#contact" onClick={(e) => handleNavigation(e, '#contact')} className="text-lg font-medium text-black-soft">Contact</a>
            {user ? (
              <Button variant="outline" className="w-full justify-center" onClick={() => { handleLogout(); toggleMenu(); }}>
                Sign Out ({user})
              </Button>
            ) : (
              <Button variant="primary" className="w-full justify-center" onClick={() => { setIsLoginOpen(true); toggleMenu(); }}>
                Login
              </Button>
            )}
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      {currentView === 'home' ? (
        <>
          {/* Hero Section */}
          <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center">
            {/* Background Container - Gradient Design */}
            <div 
              className="absolute inset-0 w-full h-full z-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, #ffffff 0%, #cfd6adff 40%, #a9b876ff 100%)'
              }}
            >
                {/* Thin Olive Line at Bottom with Padding (Margins) */}
                <div className="absolute bottom-0 left-6 right-6 md:left-24 md:right-24 h-[1px] bg-olive-600 z-20 shadow-sm opacity-80"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="max-w-4xl mx-auto">
                  <span className="inline-block px-3 py-1 bg-olive-200 border border-olive-300 text-black rounded-full text-sm font-semibold tracking-wide uppercase mb-6 animate-fade-in shadow-sm">
                    Trusted by 50,000+ Families
                  </span>
                  <h1 className="text-5xl lg:text-7xl font-serif font-bold text-black-rich leading-tight mb-6 animate-slide-up">
                    Insurance, <span className="text-olive-600 relative inline-block">
                      simplified
                    </span>
                  </h1>
                  <p className="text-xl text-gray-700 font-medium mb-8 leading-relaxed max-w-2xl mx-auto animate-slide-up" style={{animationDelay: '0.1s'}}>
                    Experience insurance that works for you. Transparent policies, lightning-fast claims, and a dedicated team ready to help 24/7.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center animate-slide-up" style={{animationDelay: '0.2s'}}>
                    <Button variant="primary" className="shadow-lg shadow-olive-200" onClick={() => setIsQuoteOpen(true)}>
                      Start Your Quote
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto bg-white border-2 border-olive-100 hover:border-olive-600 text-olive-700 font-semibold" onClick={(e) => handleNavigation(e, 'plans')}>
                      View Our Plans
                    </Button>
                  </div>
                  <div className="mt-10 flex justify-center items-center space-x-6 text-sm text-gray-600 font-semibold animate-fade-in" style={{animationDelay: '0.4s'}}>
                    <div className="flex items-center">
                      <CheckCircle size={16} className="text-olive-600 mr-2" />
                      Instant Approval
                    </div>
                    <div className="flex items-center">
                      <CheckCircle size={16} className="text-olive-600 mr-2" />
                      No Hidden Fees
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

            {/* Products Section */}
          <section id="products" className="py-20 bg-white scroll-mt-20 relative">
            <div className="container mx-auto px-6">
              {/* Separator line removed */}
              <div className="text-center mb-16">
                <h2 className="text-4xl font-serif font-bold text-black-rich mb-4">Our Insurance Products</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Tailored solutions designed to fit your unique lifestyle and needs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                {products.map((product, index) => (
                  <div key={index} className="flex flex-col h-full group">
                    {/* Icon above card with padding */}
                    <div className="mb-6 pl-2">
                       <img 
                          src={product.iconUrl} 
                          alt={product.title} 
                          className="w-40 h-20 object-contain" 
                        />
                    </div>
                    
                    <div className="relative flex-grow overflow-hidden rounded-2xl hover:shadow-2xl transition-all duration-300">
                      {/* Background Image & Overlay */}
                      <div className="absolute inset-0 z-0">
                          <img src={product.bgImage} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors duration-300"></div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-start p-8 h-full">
                          {/* Title */}
                          <h3 className="text-xl font-bold text-white mb-3">{product.title}</h3>
                          <p className="text-gray-200 mb-6 leading-relaxed flex-grow">
                              {product.description}
                          </p>
                          <button 
                          onClick={() => {
                              setToast({ message: `Viewing details for ${product.title}...`, type: 'info' });
                              setIsQuoteOpen(true);
                          }} 
                          className="inline-flex items-center text-white font-semibold hover:text-olive-300 transition-colors mt-auto"
                          >
                          Get Quote <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                          </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center">
                 <Button variant="outline" onClick={() => setCurrentView('plans')}>
                    See All Coverage Details
                 </Button>
              </div>
            </div>
          </section>

          {/* Feature / About Section */}
          <section id="about" className="py-20 bg-olive-50 text-black-soft scroll-mt-20">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-12 text-black-rich text-center">Why Choose Wilmac?</h2>
                <div className="grid md:grid-cols-3 gap-12">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-olive-600 flex items-center justify-center mb-6 transform hover:scale-110 transition-transform duration-300 shadow-lg shadow-olive-200">
                      <Umbrella size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-black-rich">Comprehensive Coverage</h3>
                    <p className="text-gray-600">We don't believe in gaps. Our policies are designed to cover the unexpected so you never have to worry.</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-olive-600 flex items-center justify-center mb-6 transform hover:scale-110 transition-transform duration-300 shadow-lg shadow-olive-200">
                      <Phone size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-black-rich">24/7 Support</h3>
                    <p className="text-gray-600">Accidents don't keep office hours. Neither do we. Our team is available anytime, anywhere.</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-olive-600 flex items-center justify-center mb-6 transform hover:scale-110 transition-transform duration-300 shadow-lg shadow-olive-200">
                      <Shield size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-black-rich">Financial Strength</h3>
                    <p className="text-gray-600">Rated A++ for financial stability. We have the resources to pay out claims quickly and fairly.</p>
                  </div>
                </div>
                <div className="mt-16 text-center">
                  <Button variant="primary" onClick={() => setIsAgentOpen(true)}>
                    Meet Our Agents
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-20">
            <div className="container mx-auto px-6">
              <div className="bg-gradient-to-br from-olive-600 to-olive-900 rounded-3xl p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
                 {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl -mr-36 -mt-36 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-olive-400 opacity-20 rounded-full blur-3xl -ml-36 -mb-36 pointer-events-none"></div>
                
                <div className="relative z-10 max-w-3xl mx-auto">
                  <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6">Ready to secure your future?</h2>
                  <p className="text-olive-100 text-lg mb-10">
                    Join thousands of satisfied policyholders. Get a personalized quote in less than 5 minutes.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button variant="black" className="px-10 py-4 text-lg" onClick={() => setIsQuoteOpen(true)}>
                      Get Started Now
                    </Button>
                    <Button variant="secondary" className="px-10 py-4 text-lg bg-white text-olive-800 hover:bg-gray-100" onClick={() => setToast({ message: "Calling (800) 555-0123...", type: 'info' })}>
                      Call (800) 555-0123
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Plans Page View */
        <PlansPage 
          onBack={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
          onGetQuote={() => setIsQuoteOpen(true)} 
          onContactAgent={() => setIsAgentOpen(true)}
        />
      )}

      {/* Footer */}
      <footer id="contact" className="bg-white pt-20 pb-10 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img src={LOGO_URL} alt="Wilmac Logo" className="h-8 w-auto" />
              </div>
              <p className="text-gray-500 mb-6">
                Providing peace of mind through reliable, comprehensive insurance solutions since 1985.
              </p>
              <div className="flex space-x-4">
                {/* Social icons placeholders */}
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-olive-600 hover:text-white transition-colors cursor-pointer" onClick={showFeatureNotAvailable}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-olive-600 hover:text-white transition-colors cursor-pointer" onClick={showFeatureNotAvailable}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-black-rich mb-6">Company</h4>
              <ul className="space-y-4 text-gray-500">
                <li><a href="#" onClick={showFeatureNotAvailable} className="hover:text-olive-600 transition-colors">About Us</a></li>
                <li><a href="#" onClick={showFeatureNotAvailable} className="hover:text-olive-600 transition-colors">Careers</a></li>
                <li><a href="#" onClick={showFeatureNotAvailable} className="hover:text-olive-600 transition-colors">Newsroom</a></li>
                <li><a href="#" onClick={showFeatureNotAvailable} className="hover:text-olive-600 transition-colors">Community</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-black-rich mb-6">Insurance</h4>
              <ul className="space-y-4 text-gray-500">
                <li><a href="#" onClick={(e) => handleNavigation(e, 'plans')} className="hover:text-olive-600 transition-colors">Auto</a></li>
                <li><a href="#" onClick={(e) => handleNavigation(e, 'plans')} className="hover:text-olive-600 transition-colors">Homeowners</a></li>
                <li><a href="#" onClick={(e) => handleNavigation(e, 'plans')} className="hover:text-olive-600 transition-colors">Life</a></li>
                <li><a href="#" onClick={(e) => handleNavigation(e, 'plans')} className="hover:text-olive-600 transition-colors">Business</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-black-rich mb-6">Contact</h4>
              <ul className="space-y-4 text-gray-500">
                <li>123 Olive Grove Blvd,<br />Suite 100, Seattle, WA</li>
                <li>hello@wilmacins.com</li>
                <li>(800) 555-0123</li>
                <li>Support Hours: 24/7</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2024 Wilmac Insurances. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" onClick={showFeatureNotAvailable} className="hover:text-olive-600">Privacy Policy</a>
              <a href="#" onClick={showFeatureNotAvailable} className="hover:text-olive-600">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <AIChat />
    </div>
  );
}

export default App;