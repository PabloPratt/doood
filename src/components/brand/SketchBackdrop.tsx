const scenes = [
  {
    label: 'dragon over deadline city',
    lines: ['M42 90 C95 35 145 35 196 90', 'M88 78 C108 38 132 38 152 78', 'M112 79 l18 -26 18 26', 'M54 105 l0 50 M82 116 l0 39 M176 105 l0 50 M205 117 l0 38'],
    marks: ['M94 105 l0 50', 'M112 100 l0 55', 'M130 108 l0 47', 'M148 102 l0 53'],
  },
  {
    label: 'two wizards refusing the blank page',
    lines: ['M50 145 l42 -55 l42 55', 'M72 116 l16 48', 'M158 145 l42 -55 l42 55', 'M182 116 l16 48', 'M119 112 C145 85 168 86 198 111'],
    marks: ['M122 111 l-18 -13', 'M149 96 l0 -25', 'M176 111 l21 -14'],
  },
  {
    label: 'sci-fi runner through unfinished chapters',
    lines: ['M32 148 l58 -58 l48 35 l72 -72', 'M88 90 l-10 58 l36 -22 l-5 41', 'M160 54 l48 0 l0 48 l-48 0z'],
    marks: ['M171 68 l25 0', 'M171 82 l17 0', 'M171 96 l29 0'],
  },
  {
    label: 'haunted house of almost done',
    lines: ['M58 151 l0 -52 l64 -50 l64 50 l0 52', 'M94 151 l0 -44 l34 0 l0 44', 'M72 91 C86 73 104 73 119 91', 'M143 91 C156 73 174 73 188 91'],
    marks: ['M30 150 C66 134 92 135 122 150 C153 164 183 164 220 150', 'M152 123 c10 -15 28 -15 38 0'],
  },
  {
    label: 'battlefield of edits',
    lines: ['M34 154 C76 120 111 122 149 154 C177 176 210 174 238 150', 'M74 138 l0 -70 l48 20 l-48 20', 'M164 143 l0 -78 l46 18 l-46 20'],
    marks: ['M88 156 l24 -30', 'M112 158 l28 -34', 'M142 158 l25 -31'],
  },
  {
    label: 'portal to chapter one',
    lines: ['M75 155 C35 105 64 45 128 45 C192 45 221 105 181 155 C145 193 111 193 75 155', 'M94 142 C70 107 88 70 128 70 C168 70 186 107 162 142 C140 163 116 163 94 142'],
    marks: ['M128 87 l0 49', 'M105 112 l46 0', 'M116 98 l24 28', 'M140 98 l-24 28'],
  },
  {
    label: 'tiny monsters chasing excuses',
    lines: ['M38 148 C52 111 88 111 102 148 C86 162 54 162 38 148', 'M148 151 C164 105 211 105 226 151 C209 170 164 170 148 151', 'M112 95 C127 75 145 75 160 95'],
    marks: ['M58 139 l0 -16 M82 139 l0 -16', 'M173 142 l0 -20 M202 142 l0 -20', 'M123 94 l-20 -18 M149 94 l20 -18'],
  },
];

const prompts = [
  'Day one beats one day.',
  'Perfect is a hiding place.',
  'The ugly first page is the door.',
  'Excuses do not become chapters.',
  'Start before the mood arrives.',
  'Finish the draft. Fix the draft.',
  'Fuck it. Get the scene down.',
  'A bad paragraph can be edited.',
  'A blank page cannot.',
];

export const SketchBackdrop = () => {
  return (
    <div className="sketch-backdrop" aria-hidden="true">
      <div className="quote-field">
        {prompts.map((prompt, index) => (
          <span key={prompt} style={{ animationDelay: `${index * -2.4}s` }}>{prompt}</span>
        ))}
      </div>
      <div className="sketch-stage">
        {scenes.map((scene, index) => (
          <div key={scene.label} className="sketch-cell">
            <svg
              className="sketch-scene"
              style={{ animationDelay: `${index * -1.15}s` }}
              viewBox="0 0 256 192"
              role="img"
              aria-label={scene.label}
            >
              <path className="sketch-line sketch-line--ghost" d={scene.lines.join(' ')} />
              <path className="sketch-line" d={scene.lines.join(' ')} />
              <path className="sketch-mark" d={scene.marks.join(' ')} />
            </svg>
            <span>{scene.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
