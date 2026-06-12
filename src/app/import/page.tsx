'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import Link from 'next/link';
import { FileText, Upload } from 'lucide-react';
import mammoth from 'mammoth';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { buildImportedProject } from '@/lib/import-manuscript';
import { PROJECTS_KEY, type SavedProject } from '@/lib/storage';

export default function ImportPage() {
  const [title, setTitle] = useState('');
  const [bookType, setBookType] = useState('');
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState('');
  const [manuscript, setManuscript] = useState('');
  const [fileName, setFileName] = useState('');
  const [googleDocUrl, setGoogleDocUrl] = useState('');
  const [isImportingGoogleDoc, setIsImportingGoogleDoc] = useState(false);
  const [error, setError] = useState('');

  const readDocx = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer: buffer });
    return result.value.trim();
  };

  const readHtml = async (file: File) => {
    const html = await file.text();
    return new DOMParser().parseFromString(html, 'text/html').body.textContent?.trim() || '';
  };

  const readRtf = async (file: File) => {
    const rtf = await file.text();
    return rtf
      .replace(/\\'[0-9a-fA-F]{2}/g, (match) => String.fromCharCode(parseInt(match.slice(2), 16)))
      .replace(/\\par[d]?/g, '\n')
      .replace(/\\tab/g, ' ')
      .replace(/\\[a-zA-Z]+-?\d* ?/g, '')
      .replace(/[{}]/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  };

  const importGoogleDoc = async (url: string, fallbackTitle?: string) => {
    const normalizedUrl = url.trim();
    if (!normalizedUrl) {
      setError('Paste a Google Docs link first.');
      return;
    }

    setError('');
    setIsImportingGoogleDoc(true);

    try {
      const response = await fetch('/api/import-google-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalizedUrl }),
      });
      const result = (await response.json()) as { text?: string; error?: string };

      if (!response.ok || !result.text) {
        setError(result.error || 'DOOOD could not read that Google Doc.');
        return;
      }

      setManuscript(result.text);
      if (!title && fallbackTitle) setTitle(fallbackTitle.replace(/\.(gdoc)$/i, ''));
    } catch {
      setError('DOOOD could not connect to Google Docs. Export as .docx and upload it instead.');
    } finally {
      setIsImportingGoogleDoc(false);
    }
  };

  const readPlainFile = async (file: File) => {
    if (file.name.match(/\.docx$/i)) return readDocx(file);
    if (file.name.match(/\.html?$/i)) return readHtml(file);
    if (file.name.match(/\.rtf$/i)) return readRtf(file);
    return file.text();
  };

  const readFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setError('');

    if (!file.name.match(/\.(txt|md|docx|rtf|html?|gdoc)$/i)) {
      setError('Upload a .docx, .txt, .md, .rtf, .html, or Google Docs shortcut file.');
      return;
    }

    try {
      if (file.name.match(/\.gdoc$/i)) {
        const shortcut = JSON.parse(await file.text()) as { url?: string; doc_id?: string };
        const url = shortcut.url || shortcut.doc_id || '';
        setGoogleDocUrl(url);
        await importGoogleDoc(url, file.name);
        return;
      }

      const text = await readPlainFile(file);
      if (!text.trim()) {
        setError('DOOOD could not find readable manuscript text in that file.');
        return;
      }
      setManuscript(text);
      if (!title) setTitle(file.name.replace(/\.(txt|md|docx|rtf|html?)$/i, ''));
    } catch {
      setError('DOOOD could not read that file. Try exporting from Google Docs or Word as .docx, .rtf, .txt, or .html and upload it again.');
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (manuscript.trim().length < 100) {
      setError('Paste or upload at least a few paragraphs so DOOOD can split the draft into sections.');
      return;
    }

    const project = buildImportedProject({ title, bookType, audience, tone, manuscript });
    const stored = window.localStorage.getItem(PROJECTS_KEY);
    const projects = stored ? (JSON.parse(stored) as SavedProject[]) : [];
    window.localStorage.setItem(PROJECTS_KEY, JSON.stringify([project, ...projects]));
    window.location.href = `/editor/${project.id}`;
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-red-700 pt-32 pb-20">
      <Navbar />

      <div className="container relative z-10 mx-auto max-w-5xl px-4">
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-brand-gold">Import Existing Draft</p>
            <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
              BRING IN THE BOOK YOU ALREADY STARTED.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/55">
              Upload or paste a draft. DOOOD splits it into chapters, pages, and line-level sections so you can edit the manuscript in manageable passes.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="mb-3 font-black text-white">How to use it today</h2>
            <ol className="space-y-3 text-sm text-white/55">
              <li>1. Paste or upload a draft.</li>
              <li>2. Or import a shared Google Doc.</li>
              <li>3. Open the editor by chapter, page, or line.</li>
            </ol>
          </div>
        </div>

        <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <section className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <label className="block">
              <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-white/40">Book Title</span>
              <input value={title} onChange={(event) => setTitle(event.target.value)} className="field" placeholder="Untitled manuscript" />
            </label>
            <label className="block">
              <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-white/40">Book Type</span>
              <input value={bookType} onChange={(event) => setBookType(event.target.value)} className="field" placeholder="Memoir, fantasy, nonfiction..." />
            </label>
            <label className="block">
              <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-white/40">Audience</span>
              <input value={audience} onChange={(event) => setAudience(event.target.value)} className="field" placeholder="Who should read this?" />
            </label>
            <label className="block">
              <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-white/40">Tone</span>
              <input value={tone} onChange={(event) => setTone(event.target.value)} className="field" placeholder="Dark, funny, literary, direct..." />
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center transition-colors hover:border-brand-purple/50">
              <Upload className="mb-3 h-7 w-7 text-brand-purple" />
              <span className="font-black text-white">Upload .docx, .txt, .md, .rtf, or .html</span>
              <span className="mt-1 text-xs text-white/35">{fileName || 'Google Docs users can export as .docx or use a share link'}</span>
              <input
                type="file"
                accept=".docx,.txt,.md,.rtf,.html,.htm,.gdoc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown,text/rtf,text/html"
                onChange={readFile}
                className="hidden"
              />
            </label>

            <div className="rounded-2xl border border-white/10 bg-red-700/30 p-4">
              <label className="block">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-white/40">Google Docs Link</span>
                <input
                  value={googleDocUrl}
                  onChange={(event) => setGoogleDocUrl(event.target.value)}
                  className="field"
                  placeholder="https://docs.google.com/document/d/..."
                />
              </label>
              <button
                type="button"
                onClick={() => importGoogleDoc(googleDocUrl)}
                disabled={isImportingGoogleDoc}
                className="mt-3 w-full rounded-full bg-white px-5 py-3 text-sm font-black text-brand-black transition-colors hover:bg-brand-gold disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isImportingGoogleDoc ? 'Importing...' : 'Import Google Doc'}
              </button>
              <p className="mt-3 text-xs leading-relaxed text-white/35">
                The doc must be shared as viewable by anyone with the link. Private Drive access will need Google OAuth later.
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-black text-white">Manuscript Text</h2>
                <p className="text-sm text-white/40">Paste your draft here if you are not uploading a text file.</p>
              </div>
              <div className="flex items-center gap-2 text-sm font-black text-brand-gold">
                <FileText className="h-4 w-4" />
                {manuscript.trim() ? `${manuscript.trim().split(/\s+/).length} words` : '0 words'}
              </div>
            </div>
            <textarea
              value={manuscript}
              onChange={(event) => setManuscript(event.target.value)}
              placeholder="Paste your existing draft here..."
              className="min-h-[460px] w-full resize-y rounded-2xl border border-white/10 bg-red-700/60 p-5 text-base leading-relaxed text-white outline-none transition-colors focus:border-brand-purple"
            />
            {error ? <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm font-bold text-red-200">{error}</div> : null}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button type="submit" size="lg" className="flex-1">Import And Edit</Button>
              <Link href="/builder" className="flex-1">
                <Button type="button" variant="outline" size="lg" className="w-full">Start From Idea Instead</Button>
              </Link>
            </div>
          </section>
        </form>
      </div>
    </main>
  );
}
