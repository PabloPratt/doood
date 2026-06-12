'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { MessageSquare, Search, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const channels = ['All Progress', 'Milestones', 'Word Counts', 'Help Needed', 'Success Stories'];

export default function CommunityPage() {
  const [activeChannel, setActiveChannel] = useState(channels[0]);
  const [query, setQuery] = useState('');

  return (
    <main className="min-h-screen bg-brand-black pt-32 pb-20">
      <Navbar />

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white md:text-6xl">THE CAMPFIRE.</h1>
              <p className="text-white/45">A progress feed for real author updates once people start posting.</p>
            </div>
            <Button className="gap-2">
              <Share2 className="h-4 w-4" />
              Post Progress
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            <aside className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-white/40">Channels</h3>
                <div className="space-y-2">
                  {channels.map((channel) => (
                    <button
                      key={channel}
                      onClick={() => setActiveChannel(channel)}
                      className={cn(
                        'w-full rounded-lg px-3 py-2 text-left text-sm font-bold transition-colors',
                        activeChannel === channel ? 'bg-brand-purple text-white' : 'text-white/45 hover:bg-white/5 hover:text-white'
                      )}
                    >
                      {channel}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <section className="space-y-6 lg:col-span-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/20" />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={`Search ${activeChannel.toLowerCase()}...`}
                  className="field pl-12"
                />
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-purple/15 text-brand-purple">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h2 className="mb-3 text-2xl font-black text-white">No posts yet.</h2>
                <p className="mx-auto mb-8 max-w-lg text-white/50">
                  {query
                    ? 'No real posts match that search because the community has not been connected to saved posts yet.'
                    : `${activeChannel} will show real author updates after users start posting progress.`}
                </p>
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                  <Link href="/builder">
                    <Button>Start A Book</Button>
                  </Link>
                  <Link href="/projects">
                    <Button variant="outline">Go To Projects</Button>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
