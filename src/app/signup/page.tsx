'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { USER_KEY, type DooodUser } from '@/lib/storage';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user: DooodUser = {
      name: name.trim(),
      email: email.trim(),
      createdAt: new Date().toISOString(),
    };
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    window.location.href = '/import';
  };

  return (
    <main className="min-h-screen bg-brand-black pt-32 pb-20">
      <Navbar />
      <div className="container mx-auto max-w-xl px-4">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-brand-gold">Day One Or One Day</p>
          <h1 className="text-4xl font-black text-white md:text-6xl">CREATE YOUR DOOOD ACCOUNT.</h1>
          <p className="mt-4 text-white/55">Make an account, import an existing draft or build your first blueprint, and save it to your workspace.</p>
        </div>

        <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 space-y-5">
          <Field label="Name">
            <input required value={name} onChange={(event) => setName(event.target.value)} className="field" placeholder="Your name" />
          </Field>
          <Field label="Email">
            <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="field" placeholder="you@example.com" />
          </Field>
          <Field label="Password">
            <input required type="password" minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} className="field" placeholder="At least 6 characters" />
          </Field>
          <Button type="submit" size="lg" className="w-full">Sign Up And Start</Button>
        </form>

        <p className="mt-6 text-center text-sm text-white/45">
          Already have an account? <Link href="/signin" className="font-bold text-brand-blue hover:text-white">Sign in</Link>
        </p>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-white/40">{label}</span>
      {children}
    </label>
  );
}
