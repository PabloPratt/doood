'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { BookOpen, CheckCircle2, Flame, Star, Trophy } from 'lucide-react';
import { PROJECTS_KEY, type SavedProject } from '@/lib/storage';
import { starterProjects } from '@/lib/starter-projects';

export default function DashboardPage() {
  const [projects] = useState<SavedProject[]>(() => {
    if (typeof window === 'undefined') return starterProjects;
    const stored = window.localStorage.getItem(PROJECTS_KEY);
    return stored ? (JSON.parse(stored) as SavedProject[]) : starterProjects;
  });

  const activeProject = projects[0];
  const totalWords = useMemo(() => projects.reduce((sum, project) => sum + project.wordCount, 0), [projects]);

  return (
    <main className="min-h-screen bg-brand-black pt-24 pb-20">
      <Navbar />

      <div className="container mx-auto px-4">
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard icon={<Flame className="text-orange-500" />} label="Streak" value="0 Days" />
          <StatCard icon={<Star className="text-yellow-500" />} label="XP" value="0" />
          <StatCard icon={<CheckCircle2 className="text-green-500" />} label="Words" value={String(totalWords)} />
          <StatCard icon={<Trophy className="text-brand-purple" />} label="Books" value={String(projects.length)} />
        </div>

        {!activeProject ? (
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-purple/15 text-brand-purple">
              <BookOpen className="h-8 w-8" />
            </div>
            <h1 className="mb-3 text-4xl font-black text-white md:text-6xl">NO ACTIVE BOOK YET.</h1>
            <p className="mx-auto mb-8 max-w-xl text-white/55">
              Create your first blueprint. After that, your dashboard will show real progress from your saved project.
            </p>
            <Link href="/builder">
              <Button size="lg">Start My First Book</Button>
            </Link>
          </section>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 lg:col-span-2">
              <p className="mb-4 text-xs font-black uppercase tracking-widest text-brand-purple">Active Project</p>
              <h1 className="mb-4 text-4xl font-black text-white md:text-5xl">{activeProject.title}</h1>
              <p className="mb-8 text-white/55">{activeProject.blueprint.promise}</p>
              <div className="mb-8 grid gap-3 md:grid-cols-3">
                <MiniStat label="Words" value={String(activeProject.wordCount)} />
                <MiniStat label="Chapters" value={String(activeProject.blueprint.chapters.length)} />
                <MiniStat label="Milestones" value={String(activeProject.blueprint.milestones.length)} />
              </div>
              <Link href={`/editor/${activeProject.id}`}>
                <Button size="lg">Continue Writing</Button>
              </Link>
            </section>

            <aside className="space-y-6">
              <section className="rounded-3xl border border-brand-gold/20 bg-brand-gold/10 p-6">
                <h2 className="mb-3 text-lg font-black uppercase text-brand-gold">Today&apos;s Quest</h2>
                <p className="text-white">{activeProject.blueprint.firstQuest ?? 'Write 300 words for this project.'}</p>
              </section>
              <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-white/40">Next Actions</h2>
                <div className="space-y-3">
                  {(activeProject.blueprint.nextActions ?? []).map((action, index) => (
                    <div key={action} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/70">
                      <span className="mr-2 font-black text-brand-gold">{index + 1}</span>
                      {action}
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="rounded-xl bg-white/5 p-3">{icon}</div>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">{label}</div>
        <div className="text-xl font-black text-white">{value}</div>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="text-[10px] font-black uppercase text-white/35">{label}</p>
      <p className="text-xl font-black text-white">{value}</p>
    </div>
  );
}
