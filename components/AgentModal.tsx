import React from 'react';
import { X, Phone, Mail, Award, Calendar } from 'lucide-react';
import { Button } from './Button';

interface AgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AgentModal: React.FC<AgentModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative animate-slide-up flex flex-col md:flex-row">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-gray-500 hover:text-black bg-white/80 md:bg-transparent rounded-full p-1 transition-colors">
          <X size={24} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-5/12 h-72 md:h-auto relative">
          <img 
            src="images/Gemini_Generated_Image_ihtg7gihtg7gihtg.png" 
            alt="Vhugala Mathivha" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden flex items-end p-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-white">Vhugala Mathivha</h2>
              <p className="text-olive-200 font-medium">Senior Insurance Consultant</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-7/12 p-8 md:p-10 flex flex-col justify-center bg-white">
          <div className="hidden md:block mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-3xl font-serif font-bold text-black-rich mb-1">Vhugala Mathivha</h2>
            <p className="text-olive-600 font-medium text-lg">Senior Insurance Consultant</p>
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">
            "My passion is helping families and businesses navigate the complex world of insurance with clarity and confidence. With over a decade of experience, I ensure every policy is as unique as the person it protects."
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center text-gray-700 bg-olive-50 p-3 rounded-lg">
              <Award className="text-olive-600 mr-3 min-w-[20px]" size={20} />
              <span className="font-medium">Top Performing Agent 2023</span>
            </div>
            <div className="flex items-center text-gray-700 bg-olive-50 p-3 rounded-lg">
              <Calendar className="text-olive-600 mr-3 min-w-[20px]" size={20} />
              <span className="font-medium">12+ Years Industry Experience</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
             <Button className="flex-1 flex items-center justify-center space-x-2" onClick={() => window.location.href = 'tel:8005550123'}>
               <Phone size={18} />
               <span>Call Vhugala</span>
             </Button>
             <Button variant="secondary" className="flex-1 flex items-center justify-center space-x-2" onClick={() => window.location.href = 'mailto:vhugala.m@wilmacins.com'}>
               <Mail size={18} />
               <span>Email Agent</span>
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
};