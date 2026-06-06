import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const { bookType, genre, audience, tone, idea, length, goal, experience } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    const safeIdea = typeof idea === 'string' && idea.trim() ? idea.trim() : 'Untitled book idea';
    const safeBookType = bookType || 'Book';
    const safeAudience = audience || 'the readers who need this message';
    const safeTone = tone || 'direct and compelling';
    const safeLength = length || '50,000 words';
    const safeGoal = goal || 'Write consistently for 30 days';

    if (!apiKey) {
      return NextResponse.json({
        title: `${safeIdea.split(' ').slice(0, 4).join(' ')}: A ${safeBookType} Blueprint`,
        promise: `A ${safeTone} ${safeBookType.toLowerCase()} built for ${safeAudience}, turning the core idea into a focused manuscript plan.`,
        targetReader: safeAudience,
        chapters: [
          { title: 'The Hook', goal: 'Open with the question, conflict, or promise that makes the reader care.' },
          { title: 'The Stakes', goal: 'Show why this book matters now and what changes if the reader keeps going.' },
          { title: 'The System', goal: 'Develop the core argument, world, method, or emotional arc.' },
          { title: 'The Turn', goal: 'Raise the pressure with a difficult choice, insight, or midpoint reveal.' },
          { title: 'The Finish Line', goal: 'Deliver the resolution, takeaway, or transformation the book promised.' },
        ],
        milestones: [
          'Lock the working title and reader promise by Day 2',
          'Draft the first chapter or opening sequence by Day 7',
          `Reach the halfway point toward ${safeLength} by Day 21`,
          'Complete a rough manuscript pass by Day 30',
        ],
        writingPlan: `${safeGoal}. Write in 25-minute quests, track words at the end of each session, and review milestones every Sunday.`,
        firstQuest: 'Write 300 rough words that explain why this book has to exist.',
        nextActions: [
          'Write the one-sentence promise of the book',
          'Name the first five chapters',
          'Schedule three writing quests this week',
        ],
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You are DOOOD, an AI Book Completion Coach. 
      Create a comprehensive book blueprint based on the following:
      - Book Type: ${bookType}
      - Genre: ${genre}
      - Audience: ${audience}
      - Tone: ${tone}
      - Idea: ${idea}
      - Length Goal: ${length}
      - Writing Goal: ${goal}
      - Experience Level: ${experience}

      The output MUST be a JSON object with this exact structure:
      {
        "title": "A compelling title",
        "promise": "What the book delivers to the reader in 1-2 sentences",
        "targetReader": "Specific target reader",
        "chapters": [
          { "title": "Chapter title", "goal": "What this chapter achieves" },
          ... 5-8 chapters total
        ],
        "milestones": [
          "Milestone 1 description with timeline",
          ... 4-6 milestones total
        ],
        "writingPlan": "A daily quest/habit plan for the author",
        "firstQuest": "The first writing assignment in one sentence",
        "nextActions": [
          "Action 1",
          "Action 2",
          "Action 3"
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean JSON from potential markdown backticks
    const jsonString = text.replace(/```json|```/g, '').trim();
    return NextResponse.json(JSON.parse(jsonString));

  } catch (error) {
    console.error('Error generating blueprint:', error);
    return NextResponse.json({ error: 'Failed to generate blueprint' }, { status: 500 });
  }
}
