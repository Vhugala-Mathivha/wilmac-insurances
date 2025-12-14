import React, { useEffect } from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck, Star } from 'lucide-react';
import { Button } from './Button';

interface PlansPageProps {
  onBack: () => void;
  onGetQuote: () => void;
  onContactAgent: () => void;
}

export const PlansPage: React.FC<PlansPageProps> = ({ onBack, onGetQuote, onContactAgent }) => {
  const plans = [
    {
      type: 'Auto Insurance',
      image: "images/car-logo.png",
      tagline: "Drive with confidence.",
      description: 'Comprehensive protection for you and your vehicle on the road.',
      features: [
        'Collision and Comprehensive',
        'Liability Protection up to R1M',
        '24/7 Roadside Assistance',
        'Rental Car Reimbursement',
        'Safe Driver Discounts'
      ],
      price: '950',
      popular: true
    },
    {
      type: 'Home Insurance',
      image: "images/house-logo.png",
      tagline: "Protect your sanctuary.",
      description: 'Safeguard your biggest investment against the unexpected.',
      features: [
        'Dwelling & Personal Property',
        'Liability Protection',
        'Additional Living Expenses',
        'Flood & Earthquake Add-ons',
        'Smart Home Discounts'
      ],
      price: '750',
      popular: false
    },
    {
      type: 'Life Insurance',
      image: "images/life-logo.png", // Changed to generic family icon for better fit
      tagline: "Secure their future.",
      description: 'Provide financial security for your loved ones when it matters most.',
      features: [
        'Term & Whole Life Options',
        'Fixed Premiums',
        'Tax-Free Death Benefit',
        'Living Benefits Riders',
        'No Medical Exam Options'
      ],
      price: '350',
      popular: false
    },
    {
      type: 'Business Insurance',
      image: "images/business-logo.png",
      tagline: "Risk management for pros.",
      description: 'Tailored solutions to protect your business assets and employees.',
      features: [
        'General Liability',
        'Commercial Property',
        'Workers’ Compensation',
        'Cyber Liability',
        'Business Interruption'
      ],
      price: '1,800',
      popular: false
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50 font-sans text-black-soft animate-fade-in">
      
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 pb-16 pt-8 mb-16 shadow-sm">
        <div className="container mx-auto px-6">
          <button 
            onClick={onBack}
            className="group flex items-center text-gray-500 hover:text-olive-600 transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-olive-50 text-olive-700 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
              Coverage Options
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-black-rich mb-6 leading-tight">
              Plans built for <span className="italic text-olive-600">real life.</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Transparent coverage. Competitive rates. No confusing jargon. Choose the protection that fits your journey.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 mb-24 -mt-8">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`
                relative flex flex-col bg-white rounded-3xl p-6 transition-all duration-300
                ${plan.popular 
                  ? 'shadow-2xl ring-2 ring-olive-500 scale-105 z-10' 
                  : 'shadow-sm hover:shadow-xl border border-gray-100 hover:border-olive-200'
                }
              `}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-olive-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center shadow-lg">
                  <Star size={12} className="mr-1 fill-white" /> Most Popular
                </div>
              )}

              {/* Card Header */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-50 h-50 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100 p-3">
                  <img src={plan.image} alt={plan.type} className="w-full h-full object-contain opacity-90" />
                </div>
                <h3 className="text-xl font-bold text-black-rich mb-1">{plan.type}</h3>
                <p className="text-sm text-olive-600 font-medium">{plan.tagline}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-baseline justify-center text-black-rich">
                  <span className="text-lg font-medium text-gray-400 mr-1">R</span>
                  <span className="text-4xl font-serif font-bold">{plan.price}</span>
                  <span className="text-gray-400 font-medium ml-1">/mo</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Estimated starting price</p>
              </div>
              
              {/* Features */}
              <div className="flex-grow mb-8">
                <p className="text-gray-500 text-sm leading-relaxed mb-6 text-center">
                  {plan.description}
                </p>
                <ul className="space-y-3">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start text-gray-600 text-sm">
                      <CheckCircle2 size={16} className="text-olive-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="flex-1">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <Button 
                onClick={onGetQuote} 
                variant={plan.popular ? 'primary' : 'outline'}
                className="w-full justify-center py-3 text-sm font-semibold"
              >
                Get {plan.type} Quote
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom CTA / Guarantee */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-olive-800 to-olive-600"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
          
          <div className="relative z-10 px-8 py-16 md:p-16 text-center text-white">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
              <ShieldCheck size={32} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Unsure which plan is right for you?</h2>
            <p className="text-olive-100 mb-10 max-w-2xl mx-auto text-lg">
              Insurance isn't one-size-fits-all. Our licensed agents are ready to build a custom package that covers exactly what you need—nothing more, nothing less.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="black" onClick={onContactAgent} className="px-8 py-3 bg-white text-olive-800 hover:bg-gray-100 hover:text-olive-900 border-none">
                Speak to an Agent
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.open('mailto:help@wilmac.com')}
                className="px-8 py-3 text-white border-white hover:bg-white/10"
              >
                Email Support
              </Button>
            </div>
          </div>
        </div>

        {/* Simple Footer Links for this page */}
        <div className="text-center py-12 text-sm text-gray-400">
           <p>Prices shown are estimates based on standard risk profiles. Final quotes may vary.</p>
        </div>

      </div>
    </div>
  );
};