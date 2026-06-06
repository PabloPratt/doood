'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DooodUser, USER_KEY } from '@/lib/storage';

export function AuthButtons() {
  const [user, setUser] = useState<DooodUser | null>(() => {
    if (typeof window === 'undefined') return null;
    const stored = window.localStorage.getItem(USER_KEY);
    return stored ? (JSON.parse(stored) as DooodUser) : null;
  });

  const signOut = () => {
    window.localStorage.removeItem(USER_KEY);
    setUser(null);
    window.location.href = '/';
  };

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="hidden items-center gap-1 text-sm font-medium text-white/60 hover:text-white sm:flex">
          <User className="h-4 w-4" />
          {user.name.split(' ')[0]}
        </Link>
        <button onClick={signOut} className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white" aria-label="Sign out">
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link href="/signin" className="hidden text-sm font-medium text-white/60 transition-colors hover:text-white sm:block">
        Sign In
      </Link>
      <Link href="/signup">
        <Button size="sm">Sign Up</Button>
      </Link>
    </div>
  );
}
