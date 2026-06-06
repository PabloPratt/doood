import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { BookOpen, PenTool, Users, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-black pt-32 pb-20">
      <Navbar />
      
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-20">
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase">
            WE HATE <br />
            <span className="text-brand-purple italic">UNFINISHED</span> <br />
            BOOKS.
          </h1>
          <p className="text-2xl text-white/60 leading-relaxed max-w-2xl">
            DOOOD exists because everyone says they will write a book one day.
            We are here to make today Day One.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 mb-32">
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-white uppercase italic">The Problem</h2>
            <p className="text-lg text-white/50 leading-relaxed">
              Every year, millions of people start writing a book. 97% of them never finish. 
              The problem is not a lack of talent. It is a lack of structure. Writing a book is
              the ultimate endurance test, and current tools treat it like a simple word processing task.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-white uppercase italic">The Solution</h2>
            <p className="text-lg text-white/50 leading-relaxed">
              DOOOD is built on behavioral science and AI. We do not just give you a blank
              page; we give you a map, a scoreboard, and a coach. We turn the solitary 
              slog of writing into a gamified quest for completion.
            </p>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-12 mb-32">
           <h2 className="text-4xl font-black text-white mb-12 text-center uppercase">THE DOOOD CORE VALUES</h2>
           <div className="grid md:grid-cols-2 gap-12">
              <ValueItem 
                icon={<BookOpen className="text-brand-purple" />}
                title="Finish over Start"
                description="Starting is easy. Finishing is heroic. We optimize every feature to get you across the finish line."
              />
              <ValueItem 
                icon={<PenTool className="text-brand-blue" />}
                title="Author Centric"
                description="Most tools focus on the manuscript. We focus on the person writing it. If the author is moving, the book is growing."
              />
              <ValueItem 
                icon={<Trophy className="text-brand-gold" />}
                title="Gamify the Slog"
                description="Writing can be hard. We make the incremental wins feel as big as they actually are."
              />
              <ValueItem 
                icon={<Users className="text-white" />}
                title="Radical Transparency"
                description="We connect authors with agents and publishers based on real data, consistency, and progress."
              />
           </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-black text-white mb-8">READY TO BECOME AN AUTHOR?</h2>
          <Link href="/builder">
            <Button size="lg" className="px-12 py-8 text-xl">
              MAKE TODAY DAY ONE
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

function ValueItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex space-x-6">
      <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">{title}</h3>
        <p className="text-white/50 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
