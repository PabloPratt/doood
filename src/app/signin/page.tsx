'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { USER_KEY, type DooodUser } from '@/lib/storage';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const stored = window.localStorage.getItem(USER_KEY);
    if (!stored) {
      const user: DooodUser = {
        name: email.split('@')[0] || 'Author',
        email: email.trim(),
        createdAt: new Date().toISOString(),
      };
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    window.location.href = '/projects';
  };

  return (
    <main className="min-h-screen bg-brand-black pt-32 pb-20">
      <Navbar />
      <div className="container mx-auto max-w-xl px-4">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-brand-gold">Welcome Back</p>
          <h1 className="text-4xl font-black text-white md:text-6xl">SIGN IN TO DOOOD.</h1>
          <p className="mt-4 text-white/55">Open your workspace and keep moving your book forward.</p>
        </div>

        <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 space-y-5">
          <label className="block">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-white/40">Email</span>
            <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="field" placeholder="you@example.com" />
          </label>
          <label className="block">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-white/40">Password</span>
            <input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="field" placeholder="Your password" />
          </label>
          <Button type="submit" size="lg" className="w-full">Sign In</Button>
        </form>

        <p className="mt-6 text-center text-sm text-white/45">
          New to DOOOD? <Link href="/signup" className="font-bold text-brand-blue hover:text-white">Create an account</Link>
        </p>
      </div>
    </main>
  );
}
