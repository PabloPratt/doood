import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const extractGoogleDocId = (value: string) => {
  const trimmed = value.trim();
  const directMatch = trimmed.match(/^[a-zA-Z0-9_-]{20,}$/);
  if (directMatch) return trimmed;

  try {
    const url = new URL(trimmed);
    if (url.hostname !== 'docs.google.com') return '';
    const match = url.pathname.match(/\/document\/d\/([^/]+)/);
    return match?.[1] || '';
  } catch {
    return '';
  }
};

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { url?: string } | null;
  const docId = extractGoogleDocId(body?.url || '');

  if (!docId) {
    return NextResponse.json({ error: 'Paste a valid Google Docs URL.' }, { status: 400 });
  }

  const exportUrl = `https://docs.google.com/document/d/${docId}/export?format=txt`;
  const response = await fetch(exportUrl, { cache: 'no-store' });
  const text = await response.text();

  if (!response.ok || !text.trim() || text.includes('<html')) {
    return NextResponse.json(
      {
        error:
          'DOOOD could not read that Google Doc. Set sharing to Anyone with the link can view, or export it as .docx and upload it.',
      },
      { status: 422 },
    );
  }

  return NextResponse.json({ text: text.trim() });
}
