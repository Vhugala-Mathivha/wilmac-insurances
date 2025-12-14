import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { authService } from '../services/authService';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic validation & Sanitization
    const cleanEmail = email.trim();
    const cleanName = name.trim();

    try {
      let user;
      if (isRegistering) {
        if (!cleanName) throw new Error("Name is required.");
        if (!cleanEmail) throw new Error("Email is required.");
        if (!password) throw new Error("Password is required.");
        
        user = await authService.register(cleanName, cleanEmail, password);
      } else {
        if (!cleanEmail) throw new Error("Email is required.");
        if (!password) throw new Error("Password is required.");

        user = await authService.login(cleanEmail, password);
      }
      
      onLogin(user.name);
      onClose();
      // Reset form
      setTimeout(() => {
        setEmail('');
        setPassword('');
        setName('');
        setError(null);
      }, 300);
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl relative animate-slide-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <X size={24} />
        </button>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-black-rich mb-2">
            {isRegistering ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-500">
            {isRegistering 
              ? 'Enter your details to get started.' 
              : 'Please enter your details to sign in.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-600 text-sm">
            <AlertCircle size={16} className="mr-2 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegistering && (
            <div className="animate-fade-in">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-olive-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-olive-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-olive-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
              placeholder="••••••••"
            />
          </div>
          
          <Button variant="primary" className="w-full py-3 text-lg" disabled={isLoading}>
            {isLoading 
              ? 'Processing...' 
              : (isRegistering ? 'Create Account' : 'Sign In')}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button 
            onClick={toggleMode}
            className="text-olive-600 font-semibold hover:underline"
          >
            {isRegistering ? 'Sign In' : 'Register'}
          </button>
        </div>
      </div>
    </div>
  );
};