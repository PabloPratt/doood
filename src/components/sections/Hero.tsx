import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, FileUp, Sparkles } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-purple/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-brand-blue/20 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-brand-gold" />
          <span className="text-xs font-medium text-white/80">DOOOD means Day One Or One Day</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-tight">
          THE BOOK YOU KEEP <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-blue to-brand-gold">
            TALKING ABOUT
          </span> <br />
          STARTS TODAY.
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 mb-10 leading-relaxed">
          DOOOD turns your idea into a custom book blueprint, writing quests, 
          chapter milestones, and a finish-the-book dashboard. Everything is free.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link href="/import">
            <Button size="lg" variant="secondary" className="group">
              Import Existing Draft
              <FileUp className="ml-2 w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </Link>
          <Link href="/builder">
            <Button size="lg" className="group">
              Start From Idea
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-3 text-left md:grid-cols-3">
          {[
            ['1', 'Import or start fresh', 'Bring in an existing draft, or answer prompts for a new book.'],
            ['2', 'DOOOD pre-fills the workspace', 'Drafts become chapters, pages, line sections, milestones, and quests.'],
            ['3', 'Edit in manageable passes', 'Work chapter by chapter, page by page, or line by line.'],
          ].map(([number, title, body]) => (
            <div key={number} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-brand-purple text-sm font-black text-white">{number}</div>
              <h3 className="mb-1 font-black text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-white/45">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/5 pt-12">
          <div className="text-center">
            <div className="text-2xl font-black text-white mb-1">Blueprint</div>
            <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Book DNA</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-white mb-1">Quests</div>
            <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Daily Wins</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-white mb-1">Campfire</div>
            <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Progress Feed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-white mb-1">Network</div>
            <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Coming Soon</div>
          </div>
        </div>
      </div>
    </section>
  );
};
