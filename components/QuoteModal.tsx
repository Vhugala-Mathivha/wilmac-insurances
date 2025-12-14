import React, { useState } from 'react';
import { X, ChevronRight, Check, ArrowLeft, Printer, FileCheck } from 'lucide-react';
import { Button } from './Button';
import { InsuranceType } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [quoteAmount, setQuoteAmount] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: InsuranceType.AUTO
  });

  if (!isOpen) return null;

  const calculateQuote = (type: InsuranceType) => {
    // Mock calculation logic based on insurance type in RAND
    const baseRates = {
      [InsuranceType.AUTO]: 950,
      [InsuranceType.HOME]: 750,
      [InsuranceType.LIFE]: 350,
      [InsuranceType.BUSINESS]: 1800
    };
    return baseRates[type] || 500;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API calculation delay
    setTimeout(() => {
      const amount = calculateQuote(formData.type);
      setQuoteAmount(amount);
      setLoading(false);
      setStep(3); // Move to result step instead of closing
      onSubmit(); // Trigger the toast notification in parent
    }, 1500);
  };

  const handleClose = () => {
    onClose();
    // Reset form after closing animation would finish
    setTimeout(() => {
      setStep(1);
      setQuoteAmount(null);
      setFormData({ name: '', email: '', phone: '', type: InsuranceType.AUTO });
    }, 300);
  };

  const handlePrint = () => {
    window.print();
  };

  const nextStep = () => {
    if (formData.name && formData.email) setStep(s => s + 1);
  };
  
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in print:absolute print:inset-0 print:bg-white print:z-[100]">
      <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl relative animate-slide-up print:shadow-none print:w-full print:max-w-none">
        
        {/* Hide close button when printing */}
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors print:hidden">
          <X size={24} />
        </button>

        {/* Progress or Header */}
        <div className="mb-8 print:hidden">
            {step < 3 ? (
                <div className="flex items-center space-x-2 text-xs font-bold tracking-wider uppercase text-gray-400 mb-4">
                    <span className={step >= 1 ? "text-olive-600" : ""}>01 Info</span>
                    <ChevronRight size={14} />
                    <span className={step >= 2 ? "text-olive-600" : ""}>02 Coverage</span>
                    <ChevronRight size={14} />
                    <span className={step >= 3 ? "text-olive-600" : ""}>03 Quote</span>
                </div>
            ) : null}
            
            <h2 className="text-3xl font-serif font-bold text-black-rich">
                {step === 3 ? "Your Personalized Quote" : "Get Your Free Quote"}
            </h2>
            <p className="text-gray-500 mt-2">
                {step === 3 ? "Based on the information provided." : "Takes less than 2 minutes."}
            </p>
        </div>

        {/* Printable Header (Visible only when printing) */}
        <div className="hidden print:block mb-8 border-b pb-4">
            <h1 className="text-4xl font-serif font-bold text-olive-600 mb-2">Wilmac Insurances</h1>
            <p className="text-gray-500">Official Quote Estimate</p>
        </div>

        <form onSubmit={handleSubmit}>
            {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                        <input 
                            type="text" 
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-olive-500 outline-none bg-gray-50 focus:bg-white transition-all"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                        <input 
                            type="email" 
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-olive-500 outline-none bg-gray-50 focus:bg-white transition-all"
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number (Optional)</label>
                        <input 
                            type="tel" 
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-olive-500 outline-none bg-gray-50 focus:bg-white transition-all"
                            placeholder="(082) 123-4567"
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                        />
                    </div>
                    <Button type="button" onClick={nextStep} className="w-full mt-4 py-3 justify-between group">
                        Next Step
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                    </Button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">What do you need covered?</label>
                        <div className="grid grid-cols-2 gap-3">
                            {Object.values(InsuranceType).map((type) => (
                                <div 
                                    key={type}
                                    onClick={() => setFormData({...formData, type})}
                                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center text-center gap-2 h-24 ${formData.type === type ? 'border-olive-600 bg-olive-50 text-olive-800' : 'border-gray-100 hover:border-gray-200 text-gray-600'}`}
                                >
                                    <span className="font-bold">{type}</span>
                                    {formData.type === type && <Check size={16} className="text-olive-600" />}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button type="button" onClick={prevStep} className="px-4 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50">
                        <ArrowLeft size={20} />
                      </button>
                      <Button type="submit" className="flex-1 py-3" disabled={loading}>
                          {loading ? 'Calculating...' : 'View My Quote'}
                      </Button>
                    </div>
                </div>
            )}

            {step === 3 && quoteAmount && (
                <div className="animate-fade-in text-center">
                    <div className="w-16 h-16 bg-olive-100 rounded-full flex items-center justify-center mx-auto mb-6 print:hidden">
                        <FileCheck size={32} className="text-olive-600" />
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
                        <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-2">Estimated Monthly Premium</p>
                        <div className="text-5xl font-serif font-bold text-black-rich mb-2">
                            R{quoteAmount}<span className="text-lg text-gray-500 font-sans font-normal">/mo</span>
                        </div>
                        <p className="text-sm text-gray-400">Includes taxes & fees</p>
                    </div>

                    <div className="text-left bg-white border border-gray-100 rounded-lg p-4 mb-8">
                        <h4 className="font-bold text-gray-800 mb-2 border-b border-gray-100 pb-2">Quote Details</h4>
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <span className="text-gray-500">Name:</span>
                            <span className="text-right font-medium">{formData.name}</span>
                            <span className="text-gray-500">Coverage Type:</span>
                            <span className="text-right font-medium">{formData.type} Insurance</span>
                            <span className="text-gray-500">Date:</span>
                            <span className="text-right font-medium">{new Date().toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 print:hidden">
                        <Button type="button" variant="outline" onClick={handlePrint} className="flex-1 justify-center">
                            <Printer size={18} className="mr-2" />
                            Print Quote
                        </Button>
                        <Button type="button" onClick={handleClose} className="flex-1 justify-center">
                            Exit
                        </Button>
                    </div>
                    
                    <div className="hidden print:block text-xs text-gray-400 mt-8 text-center">
                        <p>This is an estimate only. Final rates may vary based on full underwriting.</p>
                        <p>Wilmac Insurances - (800) 555-0123 - hello@wilmacins.com</p>
                    </div>
                </div>
            )}
        </form>
      </div>
    </div>
  );
};