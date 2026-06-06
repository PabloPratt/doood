import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { FileUp, PenSquare } from 'lucide-react';
import { AuthButtons } from '@/components/auth/AuthButtons';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-brand-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-brand-purple rounded-lg flex items-center justify-center">
            <span className="text-white font-black">D</span>
          </div>
          <div className="leading-none">
            <span className="block text-xl font-black tracking-tighter text-white">DOOOD</span>
            <span className="hidden text-[9px] font-black uppercase tracking-[0.18em] text-white/35 sm:block">Day One Or One Day</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/projects" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Projects</Link>
          <Link href="/import" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Import Draft</Link>
          <Link href="/about" className="text-sm font-medium text-white/60 hover:text-white transition-colors">About</Link>
          <Link href="/community" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Community</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/import" className="hidden lg:block">
            <Button size="sm" variant="outline" className="gap-2">
              <FileUp className="w-4 h-4" />
              <span>Import</span>
            </Button>
          </Link>
          <Link href="/builder">
            <Button size="sm" className="gap-2">
              <PenSquare className="w-4 h-4" />
              <span>Start Writing</span>
            </Button>
          </Link>
          <AuthButtons />
        </div>
      </div>
    </nav>
  );
};
