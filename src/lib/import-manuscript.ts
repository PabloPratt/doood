import type { ManuscriptSection, SavedProject } from './storage';

const words = (text: string) => text.trim().split(/\s+/).filter(Boolean);

const chunkWords = (text: string, size: number) => {
  const allWords = words(text);
  const chunks: string[] = [];
  for (let index = 0; index < allWords.length; index += size) {
    chunks.push(allWords.slice(index, index + size).join(' '));
  }
  return chunks;
};

const getChapterChunks = (text: string) => {
  const normalized = text.replace(/\r\n/g, '\n').trim();
  const parts = normalized
    .split(/\n(?=(chapter|part|section)\s+[\w\divx]+[:\s-])/gi)
    .map((part) => part.trim())
    .filter((part) => part.length > 80);

  if (parts.length > 1) return parts;
  return chunkWords(normalized, 1200);
};

export const buildImportedProject = (input: {
  title: string;
  bookType: string;
  audience: string;
  tone: string;
  manuscript: string;
}): SavedProject => {
  const now = new Date().toISOString();
  const cleaned = input.manuscript.replace(/\r\n/g, '\n').trim();
  const manuscriptWords = words(cleaned);
  const chapterChunks = getChapterChunks(cleaned);
  const pageChunks = chunkWords(cleaned, 350);
  const lineChunks = cleaned
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 80);

  const sections: ManuscriptSection[] = [
    ...chapterChunks.map((content, index) => ({
      id: `chapter-${index + 1}`,
      type: 'chapter' as const,
      title: `Chapter ${index + 1}`,
      content,
    })),
    ...pageChunks.map((content, index) => ({
      id: `page-${index + 1}`,
      type: 'page' as const,
      title: `Page ${index + 1}`,
      content,
    })),
    ...lineChunks.map((content, index) => ({
      id: `line-${index + 1}`,
      type: 'line' as const,
      title: `Line ${index + 1}`,
      content,
    })),
  ];

  const firstChapterTitles = chapterChunks.slice(0, 6).map((content, index) => {
    const firstLine = content.split('\n').find(Boolean)?.replace(/^#+\s*/, '').trim();
    return firstLine && firstLine.length < 90 ? firstLine : `Imported Chapter ${index + 1}`;
  });

  return {
    id: crypto.randomUUID(),
    title: input.title.trim() || 'Imported Manuscript',
    bookType: input.bookType.trim() || 'Imported manuscript',
    genre: input.bookType.trim(),
    audience: input.audience.trim(),
    tone: input.tone.trim(),
    idea: cleaned.slice(0, 420),
    length: `${manuscriptWords.length} words imported`,
    goal: 'Revise the existing manuscript section by section',
    wordCount: manuscriptWords.length,
    createdAt: now,
    updatedAt: now,
    sections,
    blueprint: {
      title: input.title.trim() || 'Imported Manuscript',
      promise:
        'This project was created from an existing draft. DOOOD split it into editable chapters, pages, and line-level sections so revision can start immediately.',
      targetReader: input.audience.trim() || 'Target reader to refine',
      chapters: firstChapterTitles.map((title) => ({
        title,
        goal: 'Review, tighten, and clarify this imported section.',
      })),
      milestones: [
        'Review the imported chapter map',
        'Edit one chapter pass',
        'Edit five page sections',
        'Polish ten line-level sections',
      ],
      writingPlan:
        'Start with chapters for structure, switch to pages for pacing, then use line mode for polish.',
      firstQuest: 'Open the first imported chapter and mark what still works, what is missing, and what should be cut.',
      nextActions: [
        'Review imported chapter sections',
        'Rename any sections that need better labels',
        'Start editing the first chapter',
      ],
    },
  };
};
