import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Button } from '@/components/ui/Button';
import { Target, Zap, ShieldCheck, Brain, Flame, RotateCcw, Network } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-black overflow-x-hidden">
      <Navbar />
      <Hero />

      {/* Problem Section */}
      <section className="py-24 bg-white/[0.02]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">WHY MOST BOOKS NEVER GET FINISHED.</h2>
            <p className="text-xl text-white/60">
              It is not a lack of ideas. It is a lack of structure, accountability, and momentum.
              DOOOD fixes the author journey by turning a massive task into a game of small wins.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Target className="w-8 h-8 text-brand-purple" />}
              title="No Structure"
              description="A notebook full of ideas isn't a book. We build your skeleton first so you never stare at a blank page."
            />
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-brand-blue" />}
              title="No Momentum"
              description="Life gets in the way. Our gamified streaks and quests keep you writing even on the hard days."
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8 text-brand-gold" />}
              title="No Map"
              description="Writing is a journey. We provide the GPS, the milestones, and the finish line for your specific book."
            />
          </div>
        </div>
      </section>

      <section className="py-24 bg-white/[0.02]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5">NOT AN AI WRITER. AN AUTHOR SYSTEM.</h2>
            <p className="text-lg text-white/55">
              DOOOD focuses on why the author has not finished yet, then adapts the experience around the motivation profile.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <FeatureCard icon={<Brain className="w-8 h-8 text-brand-purple" />} title="Book DNA" description="A motivation profile shapes prompts, quests, and accountability around the reason this book matters." />
            <FeatureCard icon={<Flame className="w-8 h-8 text-brand-gold" />} title="Writing Game" description="XP, streaks, badges, and boss battles make progress visible before the manuscript is finished." />
            <FeatureCard icon={<RotateCcw className="w-8 h-8 text-brand-blue" />} title="The Graveyard" description="Abandoned projects become revivable assets instead of silent failures in an old folder." />
            <FeatureCard icon={<Network className="w-8 h-8 text-white" />} title="Publishing Path" description="The later network lets agents discover authors by consistency, category, pitch, and sample chapters." />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-white text-center mb-20">HOW IT WORKS</h2>
          
          <div className="space-y-24">
            <Step 
              number="01"
              title="Pick Your Book Type"
              description="Whether it's a sci-fi epic, a business guide, or your memoir, we have the framework."
              image="/step1.png" // Placeholder or design via CSS
            />
            <Step 
              number="02"
              title="Answer Guided Questions"
              description="Our AI asks the right questions to extract the DNA of your story and your motivation."
              image="/step2.png"
              reverse
            />
            <Step 
              number="03"
              title="Get Your Custom Blueprint"
              description="A complete chapter outline, target audience analysis, and 30-day writing schedule."
              image="/step3.png"
            />
          </div>
        </div>
      </section>

      {/* Book Types */}
      <section className="py-24 bg-brand-purple/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-16 underline decoration-brand-gold decoration-4 underline-offset-8">CHOOSE YOUR PATH</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['Children\'s Book', 'Memoir', 'Fantasy', 'Sci-Fi', 'Romance', 'Business', 'Self-Help', 'Poetry', 'Nonfiction', 'Screenplay'].map((type) => (
              <div key={type} className="p-6 rounded-xl border border-white/10 bg-white/5 hover:border-brand-purple hover:bg-brand-purple/10 transition-all cursor-pointer group text-center">
                <div className="text-white font-bold group-hover:scale-110 transition-transform">{type}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-brand-blue/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8">STOP SAYING ONE DAY.</h2>
          <p className="text-2xl text-white/60 mb-12">Make today day one. Your book is waiting.</p>
          <Link href="/builder">
            <Button size="lg" className="text-2xl px-12 py-8">
              START YOUR BOOK
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-brand-black">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-8 md:mb-0">
            <div className="w-6 h-6 bg-brand-purple rounded flex items-center justify-center">
              <span className="text-white text-xs font-black">D</span>
            </div>
            <span className="text-lg font-black tracking-tighter text-white">DOOOD</span>
          </div>
          <div className="flex space-x-8 text-white/40 text-sm">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/community" className="hover:text-white transition-colors">Community</Link>
            <Link href="/builder" className="hover:text-white transition-colors">Builder</Link>
            <Link href="/waitlist" className="hover:text-white transition-colors">Waitlist</Link>
          </div>
          <div className="mt-8 md:mt-0 text-white/20 text-xs">
            © 2026 DOOOD INC. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition-colors group">
      <div className="mb-6 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{title}</h3>
      <p className="text-white/50 leading-relaxed">{description}</p>
    </div>
  );
}

function Step({ number, title, description, reverse = false }: { number: string, title: string, description: string, image?: string, reverse?: boolean }) {
  return (
    <div className={cn("flex flex-col md:flex-row items-center gap-12 md:gap-24", reverse && "md:flex-row-reverse")}>
      <div className="flex-1">
        <div className="text-7xl font-black text-white/5 mb-4">{number}</div>
        <h3 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase leading-none">{title}</h3>
        <p className="text-xl text-white/50 leading-relaxed">{description}</p>
      </div>
      <div className="flex-1 w-full aspect-video bg-white/5 rounded-3xl border border-white/10 relative overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-brand-blue/20 opacity-50 group-hover:opacity-100 transition-opacity" />
         {/* Placeholder for actual image/UI mockup */}
         <div className="absolute inset-8 border border-white/10 rounded-xl bg-brand-black/40 backdrop-blur-sm shadow-2xl flex items-center justify-center font-mono text-white/20">
           [ {title} UI PREVIEW ]
         </div>
      </div>
    </div>
  );
}
