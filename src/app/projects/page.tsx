'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { BookOpen, Clock, RotateCcw, Trophy } from 'lucide-react';
import { PROJECTS_KEY, type SavedProject } from '@/lib/storage';
import { starterProjects } from '@/lib/starter-projects';

export default function ProjectsPage() {
  const [projects] = useState<SavedProject[]>(() => {
    if (typeof window === 'undefined') return starterProjects;
    const stored = window.localStorage.getItem(PROJECTS_KEY);
    return stored ? (JSON.parse(stored) as SavedProject[]) : starterProjects;
  });

  return (
    <main className="min-h-screen bg-brand-black pt-32 pb-20">
      <Navbar />

      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-brand-gold">Author Workspace</p>
            <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">YOUR BOOKS NEED A FINISH LINE.</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/55">
              Your actual book projects live here. Start with one of the existing concepts or create a new blueprint.
            </p>
          </div>
          <Link href="/builder">
            <Button size="lg">Create New Blueprint</Button>
          </Link>
        </div>

        {projects.length === 0 ? (
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-purple/15 text-brand-purple">
              <BookOpen className="h-8 w-8" />
            </div>
            <h2 className="mb-3 text-3xl font-black text-white">No saved books yet.</h2>
            <p className="mx-auto mb-8 max-w-xl text-white/50">
              Start with the builder. When you create a blueprint, DOOOD will save it here so you can keep working.
            </p>
            <Link href="/builder">
              <Button size="lg">Build My First Book</Button>
            </Link>
          </section>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <div className="mb-6 flex items-start justify-between">
                  <div className="rounded-2xl bg-brand-purple/15 p-3 text-brand-purple">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white/50">
                    Blueprint
                  </span>
                </div>
                <p className="mb-2 text-xs font-black uppercase tracking-widest text-brand-blue">{project.bookType || 'Book'}</p>
                <h2 className="mb-4 text-2xl font-black text-white">{project.title}</h2>
                <p className="mb-6 text-sm text-white/55">{project.blueprint.promise}</p>
                <div className="mb-6 grid grid-cols-2 gap-3">
                  <MiniStat label="Words" value={String(project.wordCount)} />
                  <MiniStat label="Chapters" value={String(project.blueprint.chapters.length)} />
                </div>
                <Link href={`/editor/${project.id}`}>
                  <Button variant="outline" className="w-full">Open Project</Button>
                </Link>
              </article>
            ))}
          </div>
        )}

        <section className="mt-14 rounded-3xl border border-white/10 bg-white/[0.02] p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black uppercase text-white">The Graveyard</h2>
              <p className="text-white/40">Abandoned projects will appear here only after real projects go inactive.</p>
            </div>
            <RotateCcw className="h-8 w-8 text-white/25" />
          </div>
          <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-white/35">No abandoned projects yet.</div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <Info icon={<Trophy className="h-5 w-5 text-brand-gold" />} label="Finished Author Badge" value="Unlocked when you finish" />
          <Info icon={<Clock className="h-5 w-5 text-brand-blue" />} label="Draft Snapshots" value="Ready for later" />
          <Info icon={<BookOpen className="h-5 w-5 text-brand-purple" />} label="Pitch Profile" value="Coming later" />
        </section>
      </div>
    </main>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="text-[10px] font-black uppercase text-white/35">{label}</p>
      <p className="text-lg font-black text-white">{value}</p>
    </div>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="rounded-xl bg-white/5 p-3">{icon}</div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-white/35">{label}</p>
        <p className="font-black text-white">{value}</p>
      </div>
    </div>
  );
}
