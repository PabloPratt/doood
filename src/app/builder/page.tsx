'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, Check, Sparkles, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_KEY, type SavedProject } from '@/lib/storage';

const STEPS = [
  { id: 'type', title: 'The Vision', description: 'What are we building?' },
  { id: 'details', title: 'The DNA', description: 'Who is it for and what is the vibe?' },
  { id: 'idea', title: 'The Core', description: 'What is the big idea?' },
  { id: 'goals', title: 'The Mission', description: 'What is the end goal?' },
];

const BOOK_TYPES = [
  'Children\'s Book', 'Memoir', 'Fantasy', 'Sci-Fi', 'Romance', 
  'Business', 'Self-Help', 'Poetry', 'Nonfiction', 'Screenplay'
];

type FormData = {
  bookType: string;
  genre: string;
  audience: string;
  tone: string;
  idea: string;
  length: string;
  goal: string;
  experience: string;
};

type Blueprint = {
  title: string;
  promise: string;
  targetReader?: string;
  chapters: Array<{ title: string; goal: string }>;
  milestones: string[];
  writingPlan: string;
  firstQuest?: string;
  nextActions?: string[];
};

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    bookType: '',
    genre: '',
    audience: '',
    tone: '',
    idea: '',
    length: '',
    goal: '',
    experience: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [error, setError] = useState('');

  const updateForm = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const next = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      generateBlueprint();
    }
  };

  const back = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const generateBlueprint = async () => {
    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch('/api/generate-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Blueprint generation failed');
      }

      const data = (await response.json()) as Blueprint;
      setBlueprint(data);
    } catch {
      setError('Blueprint generation stumbled. Try again, or keep going with the mock plan.');
    } finally {
      setIsGenerating(false);
    }
  };

  const createProject = () => {
    if (!blueprint) return;

    const stored = window.localStorage.getItem(PROJECTS_KEY);
    const projects = stored ? (JSON.parse(stored) as SavedProject[]) : [];
    const now = new Date().toISOString();
    const project: SavedProject = {
      id: crypto.randomUUID(),
      title: blueprint.title,
      bookType: formData.bookType,
      genre: formData.genre,
      audience: formData.audience,
      tone: formData.tone,
      idea: formData.idea,
      length: formData.length,
      goal: formData.goal,
      blueprint,
      wordCount: 0,
      createdAt: now,
      updatedAt: now,
    };

    window.localStorage.setItem(PROJECTS_KEY, JSON.stringify([project, ...projects]));
    window.location.href = '/projects';
  };

  if (blueprint) {
    return (
      <main className="min-h-screen bg-red-700 pt-32 pb-20">
        <Navbar />
        <div className="container mx-auto px-4 max-w-4xl">
           <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12">
              <div className="flex items-center space-x-3 text-brand-gold mb-6">
                <Sparkles className="w-6 h-6" />
                <span className="font-bold uppercase tracking-widest">Blueprint Generated</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-white mb-8">{blueprint.title}</h1>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-3">The Promise</h3>
                    <p className="text-xl text-white font-medium">{blueprint.promise}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-3">Chapter Outline</h3>
                    <div className="space-y-4">
                      {blueprint.chapters.map((ch, i) => (
                        <div key={i} className="flex space-x-4 p-4 rounded-xl bg-white/5 border border-white/10">
                          <span className="font-black text-brand-purple">{i + 1}</span>
                          <div>
                            <div className="font-bold text-white">{ch.title}</div>
                            <div className="text-sm text-white/40">{ch.goal}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-3">Writing Milestones</h3>
                    <div className="space-y-3">
                      {blueprint.milestones.map((ms: string, i: number) => (
                        <div key={i} className="flex items-center space-x-3 text-white/70">
                          <div className="w-5 h-5 rounded-full border border-brand-blue flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-brand-blue" />
                          </div>
                          <span>{ms}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-3">Next 3 Actions</h3>
                    <div className="space-y-3">
                      {(blueprint.nextActions ?? ['Name the project', 'Draft the first scene or promise', 'Schedule the first writing session']).map((action, i) => (
                        <div key={action} className="flex items-center space-x-3 rounded-xl border border-white/10 bg-white/5 p-3 text-white/75">
                          <span className="text-xs font-black text-brand-gold">{i + 1}</span>
                          <span className="text-sm">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-brand-purple/10 border border-brand-purple/20">
                    <h3 className="text-sm font-bold text-brand-purple uppercase tracking-widest mb-3">Daily Writing Quest</h3>
                    <p className="text-white font-medium italic">{blueprint.firstQuest ?? blueprint.writingPlan}</p>
                  </div>

                  <Button className="w-full h-16 text-xl" onClick={createProject}>
                    CREATE PROJECT & START WRITING
                  </Button>
                </div>
              </div>
           </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-red-700 pt-32 pb-20">
      <Navbar />
      
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            {STEPS.map((step, i) => (
              <div key={step.id} className={cn(
                "flex flex-col items-center space-y-2 transition-colors",
                i <= currentStep ? "text-brand-purple" : "text-white/20"
              )}>
                <div className={cn(
                  "w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold",
                  i < currentStep ? "bg-brand-purple border-brand-purple text-white" : 
                  i === currentStep ? "border-brand-purple text-brand-purple" : "border-white/10 text-white/20"
                )}>
                  {i < currentStep ? <Check className="w-6 h-6" /> : i + 1}
                </div>
                <span className="hidden sm:block text-xs font-bold uppercase tracking-tighter">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-brand-purple" 
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12 min-h-[500px] flex flex-col">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">{STEPS[currentStep].title}</h2>
            <p className="text-white/50">{STEPS[currentStep].description}</p>
          </div>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {currentStep === 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {BOOK_TYPES.map(type => (
                      <button
                        key={type}
                        onClick={() => updateForm('bookType', type)}
                        className={cn(
                          "p-4 rounded-xl border text-left transition-all",
                          formData.bookType === type ? "bg-brand-purple border-brand-purple text-white" : "bg-white/5 border-white/10 text-white/50 hover:border-white/30"
                        )}
                      >
                        <span className="font-bold">{type}</span>
                      </button>
                    ))}
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-white/40 uppercase mb-2">Genre or Category</label>
                      <input
                        type="text"
                        value={formData.genre}
                        onChange={(e) => updateForm('genre', e.target.value)}
                        placeholder="e.g., Cyberpunk thriller, legacy memoir, founder guide"
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-brand-blue outline-none mb-6"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-white/40 uppercase mb-2">Target Audience</label>
                      <input 
                        type="text" 
                        value={formData.audience}
                        onChange={(e) => updateForm('audience', e.target.value)}
                        placeholder="e.g., Young adults, CEOs, New parents"
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-brand-blue outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-white/40 uppercase mb-2">Desired Tone</label>
                      <select 
                        value={formData.tone}
                        onChange={(e) => updateForm('tone', e.target.value)}
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-brand-blue outline-none appearance-none"
                      >
                        <option value="">Select a tone</option>
                        <option value="Professional">Professional</option>
                        <option value="Sarcastic & Witty">Sarcastic & Witty</option>
                        <option value="Inspiring">Inspiring</option>
                        <option value="Dark & Mysterious">Dark & Mysterious</option>
                        <option value="Scientific">Scientific</option>
                      </select>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-white/40 uppercase">What is the core idea or story?</label>
                    <textarea 
                      value={formData.idea}
                      onChange={(e) => updateForm('idea', e.target.value)}
                      placeholder="Explain your book idea in 1-2 sentences..."
                      className="w-full h-48 p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-brand-purple outline-none resize-none"
                    />
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-white/40 uppercase mb-2">Desired Length</label>
                      <input
                        type="text"
                        value={formData.length}
                        onChange={(e) => updateForm('length', e.target.value)}
                        placeholder="e.g., 35,000 words, 10 chapters, 24 pages"
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-brand-gold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-white/40 uppercase mb-2">Experience Level</label>
                      <select
                        value={formData.experience}
                        onChange={(e) => updateForm('experience', e.target.value)}
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-brand-gold outline-none appearance-none"
                      >
                        <option value="">Select experience</option>
                        <option value="First-time author">First-time author</option>
                        <option value="Started before, never finished">Started before, never finished</option>
                        <option value="Published before">Published before</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-white/40 uppercase mb-2">Writing Goal</label>
                      <input 
                        type="text" 
                        value={formData.goal}
                        onChange={(e) => updateForm('goal', e.target.value)}
                        placeholder="e.g., Finish first draft in 30 days"
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-brand-gold outline-none"
                      />
                    </div>
                    <div className="p-6 rounded-2xl bg-brand-gold/5 border border-brand-gold/20 flex items-start space-x-4">
                       <Sparkles className="w-6 h-6 text-brand-gold flex-shrink-0" />
                       <p className="text-sm text-brand-gold/80 italic">
                         A goal without a plan is just a wish. On the next step, we turn this goal into your actual writing roadmap.
                       </p>
                    </div>
                    {error ? (
                      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm font-bold text-red-200">
                        {error}
                      </div>
                    ) : null}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between items-center mt-12">
            <button 
              onClick={back}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 text-white/40 hover:text-white transition-colors disabled:opacity-0"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-bold">BACK</span>
            </button>

            <Button 
              size="lg" 
              isLoading={isGenerating}
              onClick={next}
              className={cn(currentStep === STEPS.length - 1 && "bg-brand-gold hover:bg-brand-gold/90 shadow-brand-gold/20")}
            >
              {currentStep === STEPS.length - 1 ? (
                <span className="flex items-center">
                  GENERATE BLUEPRINT <Wand2 className="ml-2 w-5 h-5" />
                </span>
              ) : (
                <span className="flex items-center">
                  NEXT <ArrowRight className="ml-2 w-5 h-5" />
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
