'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WaitlistPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-red-700 pt-32 pb-20">
      <Navbar />
      
      <div className="container mx-auto px-4 max-w-xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">Early Access</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">JOIN THE INNER CIRCLE.</h1>
          <p className="text-lg text-white/60 leading-relaxed">
            We are building the future of publishing. Be the first to get access to
            Agent Matchmaking, the Campfire social feed, and advanced AI Editing tools.
          </p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">YOU ARE ON THE LIST.</h2>
              <p className="text-white/40">Watch your inbox. We will be in touch soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Enter your name"
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-brand-purple outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Email Address</label>
                  <input 
                    required
                    type="email" 
                    placeholder="you@awesome.com"
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-brand-purple outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">What are you writing?</label>
                  <select 
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-brand-purple outline-none transition-colors appearance-none"
                  >
                    <option value="fiction">Fiction (Fantasy, Sci-Fi, etc.)</option>
                    <option value="nonfiction">Non-Fiction (Business, Self-Help)</option>
                    <option value="memoir">Memoir / Biography</option>
                    <option value="poetry">Poetry</option>
                    <option value="other">Something else</option>
                  </select>
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                isLoading={loading}
                className="w-full h-16 text-lg font-black group"
              >
                SECURE MY SPOT <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          )}
        </div>

        <div className="mt-12 text-center text-white/20 text-xs">
          By joining, you agree to our Terms of Service and Privacy Policy. 
          No spam, ever. Just book-writing fuel.
        </div>
      </div>
    </main>
  );
}
