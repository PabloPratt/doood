'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, Eye, Layers, Maximize2, Save, Trophy, Type, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PROJECTS_KEY, type ManuscriptSection, type SavedProject } from '@/lib/storage';
import { starterProjects } from '@/lib/starter-projects';

type SectionMode = 'chapter' | 'page' | 'line';

export default function EditorPage() {
  const params = useParams<{ id: string }>();
  const draftKey = `doood_draft_${params.id}`;
  const [project] = useState<SavedProject | null>(() => {
    if (typeof window === 'undefined') return null;
    const storedProjects = window.localStorage.getItem(PROJECTS_KEY);
    const projects = storedProjects ? (JSON.parse(storedProjects) as SavedProject[]) : starterProjects;
    return projects.find((item) => item.id === params.id) ?? null;
  });
  const [content, setContent] = useState(() => {
    if (typeof window === 'undefined') return '';
    return window.localStorage.getItem(draftKey) ?? '';
  });
  const [sectionMode, setSectionMode] = useState<SectionMode>('chapter');
  const [activeSectionId, setActiveSectionId] = useState(() => project?.sections?.find((section) => section.type === 'chapter')?.id ?? '');
  const [sections, setSections] = useState<ManuscriptSection[]>(() => project?.sections ?? []);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  const filteredSections = useMemo(
    () => sections.filter((section) => section.type === sectionMode),
    [sectionMode, sections]
  );
  const activeSection = sections.find((section) => section.id === activeSectionId) ?? filteredSections[0];
  const editorContent = activeSection ? activeSection.content : content;
  const wordCount = useMemo(() => (editorContent.trim() ? editorContent.trim().split(/\s+/).length : 0), [editorContent]);
  const hasImportedSections = sections.length > 0;

  const changeMode = (mode: SectionMode) => {
    setSectionMode(mode);
    setActiveSectionId(sections.find((section) => section.type === mode)?.id ?? '');
  };

  const updateEditorContent = (value: string) => {
    if (!activeSection) {
      setContent(value);
      return;
    }

    setSections((current) =>
      current.map((section) => (section.id === activeSection.id ? { ...section, content: value } : section))
    );
  };

  const saveDraft = () => {
    if (!hasImportedSections) {
      window.localStorage.setItem(draftKey, content);
    }

    const storedProjects = window.localStorage.getItem(PROJECTS_KEY);
    const projects = storedProjects ? (JSON.parse(storedProjects) as SavedProject[]) : [];
    const totalWords = hasImportedSections
      ? sections.reduce((sum, section) => {
          if (section.type !== 'chapter') return sum;
          return sum + section.content.trim().split(/\s+/).filter(Boolean).length;
        }, 0)
      : wordCount;
    const updated = projects.map((item) =>
      item.id === params.id ? { ...item, sections, wordCount: totalWords, updatedAt: new Date().toISOString() } : item
    );
    window.localStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
    setSavedMessage('Saved');
    window.setTimeout(() => setSavedMessage(''), 1500);
  };

  if (!project) {
    return (
      <main className="min-h-screen bg-brand-black pt-32 pb-20">
        <Navbar />
        <div className="container mx-auto max-w-2xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-black text-white">Project not found.</h1>
          <p className="mb-8 text-white/50">Create a blueprint first, then open it from Projects.</p>
          <Link href="/projects">
            <Button>Back To Projects</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={cn('min-h-screen transition-colors duration-500', isFocusMode ? 'bg-brand-black' : 'bg-[#050505]')}>
      {!isFocusMode && <Navbar />}

      <div className={cn('container mx-auto px-4 transition-all duration-500', isFocusMode ? 'pt-12' : 'pt-24')}>
        <div className="mx-auto mb-8 flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-4">
            {!isFocusMode && (
              <Link href="/projects" className="rounded-full p-2 transition-colors hover:bg-white/5">
                <ChevronLeft className="h-6 w-6 text-white/40" />
              </Link>
            )}
            <div>
              <h1 className="text-xl font-bold uppercase tracking-tight text-white">{project.title}</h1>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-purple">Draft workspace</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {savedMessage ? <span className="text-sm font-bold text-brand-gold">{savedMessage}</span> : null}
            <Button variant="outline" size="sm" onClick={() => setIsFocusMode(!isFocusMode)} className="gap-2">
              <Maximize2 className="h-4 w-4" />
              <span className="hidden sm:inline">{isFocusMode ? 'Exit Focus' : 'Focus Mode'}</span>
            </Button>
            <Button size="sm" onClick={saveDraft} className="gap-2">
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline">Save</span>
            </Button>
          </div>
        </div>

        <div className={cn('mx-auto grid max-w-6xl gap-8', hasImportedSections ? 'lg:grid-cols-[280px_1fr_260px]' : 'lg:grid-cols-4')}>
          {hasImportedSections && !isFocusMode ? (
            <aside className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <h2 className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/40">
                  <Layers className="h-4 w-4 text-brand-purple" />
                  Edit Mode
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {(['chapter', 'page', 'line'] as SectionMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => changeMode(mode)}
                      className={cn(
                        'rounded-lg px-2 py-2 text-xs font-black uppercase transition-colors',
                        sectionMode === mode ? 'bg-brand-purple text-white' : 'bg-white/5 text-white/45 hover:text-white'
                      )}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="max-h-[62vh] overflow-auto rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <div className="mb-3 px-2 text-[10px] font-black uppercase tracking-widest text-white/35">
                  {filteredSections.length} {sectionMode} sections
                </div>
                <div className="space-y-2">
                  {filteredSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSectionId(section.id)}
                      className={cn(
                        'w-full rounded-xl p-3 text-left transition-colors',
                        activeSection?.id === section.id ? 'bg-brand-purple text-white' : 'bg-white/5 text-white/55 hover:bg-white/10 hover:text-white'
                      )}
                    >
                      <span className="block text-sm font-black">{section.title}</span>
                      <span className="mt-1 block truncate text-xs opacity-60">{section.content.slice(0, 80)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          ) : null}

          <div className={cn('space-y-4', hasImportedSections ? '' : 'lg:col-span-3')}>
            {activeSection ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold">{sectionMode} editor</p>
                <h2 className="text-2xl font-black text-white">{activeSection.title}</h2>
              </div>
            ) : null}
            <textarea
              value={editorContent}
              onChange={(event) => updateEditorContent(event.target.value)}
              placeholder="Start writing here..."
              className={cn(
                'min-h-[60vh] w-full resize-none rounded-3xl border border-white/5 bg-white/[0.02] p-8 text-xl leading-relaxed text-white/90 outline-none transition-all focus:border-brand-purple/30 md:p-12',
                isFocusMode && 'border-transparent bg-transparent p-0 text-2xl'
              )}
            />

            <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
              <div className="flex items-center gap-6">
                <Metric label="Word Count" value={String(wordCount)} />
                <Metric label="Session XP" value={`+${Math.floor(wordCount / 10) * 5}`} accent />
                {hasImportedSections ? <Metric label="Mode" value={sectionMode} /> : null}
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 text-white/20 transition-colors hover:text-white" aria-label="Type settings">
                  <Type className="h-4 w-4" />
                </button>
                <button className="p-2 text-white/20 transition-colors hover:text-white" aria-label="Preview draft">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {!isFocusMode && (
            <aside className="space-y-6">
              <div className="rounded-2xl border border-brand-purple/10 bg-brand-purple/5 p-6">
                <h3 className="mb-4 flex items-center text-xs font-black uppercase tracking-widest text-brand-purple">
                  <Zap className="mr-2 h-4 w-4" />
                  First Quest
                </h3>
                <p className="text-xs leading-relaxed text-white/60">{project.blueprint.firstQuest ?? 'Write 300 rough words.'}</p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                <h3 className="mb-4 flex items-center text-xs font-black uppercase tracking-widest text-white/40">
                  <Trophy className="mr-2 h-4 w-4 text-brand-gold" />
                  Blueprint Chapters
                </h3>
                <div className="space-y-2">
                  {project.blueprint.chapters.map((chapter, index) => (
                    <div key={`${chapter.title}-${index}`} className="rounded-lg bg-white/5 p-3 text-xs text-white/60">
                      <span className="mr-2 font-black text-brand-gold">{index + 1}</span>
                      {chapter.title}
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}

function Metric({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] font-bold uppercase text-white/20">{label}</span>
      <span className={cn('text-sm font-black', accent ? 'text-brand-gold' : 'text-white')}>{value}</span>
    </div>
  );
}
