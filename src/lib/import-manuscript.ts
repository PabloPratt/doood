import type { ManuscriptSection, SavedProject } from './storage';

type ImportedChapter = {
  title: string;
  content: string;
};

const words = (text: string) => text.trim().split(/\s+/).filter(Boolean);

const countryHeadings = new Set([
  'Argentina',
  'Belize',
  'Bolivia',
  'Brazil',
  'Chile',
  'Colombia',
  'Costa Rica',
  'Cuba',
  'Dominican Republic',
  'Ecuador',
  'El Salvador',
  'Guatemala',
  'Guyana',
  'Haiti',
  'Honduras',
  'Jamaica',
  'Mexico',
  'Nicaragua',
  'Panama',
  'Paraguay',
  'Peru',
  'Puerto Rico',
  'Suriname',
  'Trinidad and Tobago',
  'Uruguay',
  'Venezuela',
]);

const frontMatterHeadings = new Set(['Dedication', 'Introduction', 'The Book That Belonged to Everyone']);

const chunkWords = (text: string, size: number) => {
  const allWords = words(text);
  const chunks: string[] = [];
  for (let index = 0; index < allWords.length; index += size) {
    chunks.push(allWords.slice(index, index + size).join(' '));
  }
  return chunks;
};

const isCountryHeading = (line: string) => countryHeadings.has(line.trim());

const isFrontMatterHeading = (line: string) => frontMatterHeadings.has(line.trim());

const isLikelySubtitle = (line: string) => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.length > 95) return false;
  if (/^(the tale|the tale begins|back in the bedroom)/i.test(trimmed)) return false;
  if (/[.!?]$/.test(trimmed)) return false;
  return words(trimmed).length <= 10;
};

const nextNonEmptyLine = (lines: string[], startIndex: number) => {
  for (let index = startIndex; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (line) return line;
  }
  return '';
};

const getStructuredChapters = (text: string): ImportedChapter[] => {
  const normalized = text.replace(/\r\n/g, '\n').replace(/^\uFEFF/, '').trim();
  const lines = normalized.split('\n').map((line) => line.trim());
  const headingIndexes: number[] = [];

  lines.forEach((line, index) => {
    if (isCountryHeading(line) || isFrontMatterHeading(line)) {
      headingIndexes.push(index);
    }
  });

  if (headingIndexes.length < 3) return [];

  const chapters: ImportedChapter[] = [];

  if (headingIndexes[0] > 0) {
    const opening = lines.slice(0, headingIndexes[0]).join('\n').trim();
    if (opening.length > 80) {
      chapters.push({ title: 'Opening Matter', content: opening });
    }
  }

  headingIndexes.forEach((headingIndex, index) => {
    const nextHeadingIndex = headingIndexes[index + 1] ?? lines.length;
    const heading = lines[headingIndex];
    const subtitle = nextNonEmptyLine(lines, headingIndex + 1);
    const title = isLikelySubtitle(subtitle) && subtitle !== heading ? `${heading}: ${subtitle}` : heading;
    const content = lines.slice(headingIndex, nextHeadingIndex).join('\n').trim();

    if (content.length > 80) {
      chapters.push({ title, content });
    }
  });

  return chapters;
};

const getChapterChunks = (text: string): ImportedChapter[] => {
  const structured = getStructuredChapters(text);
  if (structured.length > 1) return structured;

  const normalized = text.replace(/\r\n/g, '\n').trim();
  const parts = normalized
    .split(/\n(?=(chapter|part|section)\s+[\w\divx]+[:\s-])/gi)
    .map((part) => part.trim())
    .filter((part) => part.length > 80);

  if (parts.length > 1) {
    return parts.map((content, index) => {
      const firstLine = content.split('\n').find(Boolean)?.replace(/^#+\s*/, '').trim();
      return {
        title: firstLine && firstLine.length < 90 ? firstLine : `Imported Chapter ${index + 1}`,
        content,
      };
    });
  }

  return chunkWords(normalized, 1200).map((content, index) => ({
    title: `Imported Chapter ${index + 1}`,
    content,
  }));
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
    ...chapterChunks.map((chapter, index) => ({
      id: `chapter-${index + 1}`,
      type: 'chapter' as const,
      title: chapter.title,
      content: chapter.content,
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

  const firstChapterTitles = chapterChunks.slice(0, 8).map((chapter) => chapter.title);

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
