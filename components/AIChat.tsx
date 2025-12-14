import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { createInsuranceChat, sendMessageToAgent } from '../services/geminiService';
import { Message } from '../types';
import { Chat } from '@google/genai';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I'm Will, your Wilmac insurance assistant. How can I help you protect what matters today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatInstance = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chatInstance.current) {
      try {
        chatInstance.current = createInsuranceChat();
      } catch (e) {
        console.error("Failed to initialize chat", e);
      }
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatInstance.current) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await sendMessageToAgent(chatInstance.current, userMessage);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting. Please try again later.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105
            ${isOpen ? 'bg-black-rich text-white rotate-90' : 'bg-olive-600 text-white hover:bg-olive-700'}
          `}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col z-50 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-olive-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-white/20 rounded-full">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg">Wilmac Assistant</h3>
                <p className="text-xs text-olive-100 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed
                    ${msg.role === 'user' 
                      ? 'bg-olive-600 text-white rounded-tr-none' 
                      : 'bg-gray-100 text-black-soft border border-gray-200 rounded-tl-none shadow-sm'}
                    ${msg.isError ? 'bg-red-50 text-red-600 border-red-200' : ''}
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm flex items-center space-x-2">
                  <Loader2 size={16} className="animate-spin text-olive-600" />
                  <span className="text-xs text-gray-500">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about quotes or policies..."
                className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-olive-500 focus:ring-1 focus:ring-olive-500 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-olive-600 text-white rounded-full hover:bg-olive-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};