// Milestone catalog — ported from the design prototype. This is static reference
// data (domain, title, rationale, criteria). Per-child status/dates/notes are
// instance data that lives in Firestore, seeded from this catalog for each new child.

export const DOMAIN_ORDER = ['Independence', 'Fine Motor', 'Language', 'Social-Emotional'];

export const DOMAIN_COLORS = {
  'Independence': '#8DAE79',
  'Fine Motor': '#C98F6A',
  'Language': '#6E8FBE',
  'Social-Emotional': '#9C7CB0',
};

export const MILESTONES = [
  { key: 'independence|pours', domain: 'Independence', title: 'Pours liquid without spilling',
    rationale: 'Pouring builds fine motor control and sustained concentration. Montessori practical life exercises use real, breakable materials on purpose, so a child feels the true consequence of care and precision — deepening focus and independence.',
    criteria: { notYet: 'Needs hand-over-hand help for most of the pour.', emerging: 'Pours with some spilling and self-corrects sometimes.', achieved: 'Pours between two containers with control, spilling little most tries.' } },
  { key: 'independence|shoes', domain: 'Independence', title: 'Puts on shoes unassisted',
    rationale: 'Dressing independently supports self-reliance and body awareness — a core Montessori idea of "help me do it myself" that carries into every other daily task.',
    criteria: { notYet: 'Needs full assistance putting shoes on.', emerging: 'Gets shoes on the correct feet sometimes; needs help with fasteners.', achieved: 'Puts on both shoes and fastens them without help most days.' } },
  { key: 'fine-motor|grip', domain: 'Fine Motor', title: 'Uses three-finger pencil grip',
    rationale: 'The tripod grip is the foundation for later handwriting. Strengthening small hand muscles now — through beads, tongs, modeling — makes writing easier down the road.',
    criteria: { notYet: 'Grips tools with a fist.', emerging: 'Switches between a fist and tripod grip depending on the tool.', achieved: 'Consistently uses a three-finger pencil grip.' } },
  { key: 'fine-motor|beads', domain: 'Fine Motor', title: 'Strings large beads',
    rationale: 'Threading builds bilateral coordination and hand-eye precision — a Montessori sensorial staple that also builds patience through repetition.',
    criteria: { notYet: 'Cannot yet thread a bead onto string.', emerging: 'Strings a few beads with help.', achieved: 'Strings 8 or more beads independently in a self-chosen sequence.' } },
  { key: 'language|phrases', domain: 'Language', title: 'Uses 2–3 word phrases',
    rationale: 'Combining words marks a leap from single-word labeling to expressing relationships and needs — a strong sign of continued language growth.',
    criteria: { notYet: 'Mostly uses single words.', emerging: 'Occasionally combines two words.', achieved: 'Regularly strings 2–3 words together to express a need or idea.' } },
  { key: 'language|colors', domain: 'Language', title: 'Names 5 basic colors',
    rationale: 'Naming builds vocabulary and the classification skills Montessori sensorial materials are designed to develop.',
    criteria: { notYet: "Doesn't yet name colors.", emerging: 'Names 1–2 colors reliably.', achieved: 'Names 5 or more colors correctly, most of the time.' } },
  { key: 'social|turns', domain: 'Social-Emotional', title: 'Takes turns with a peer',
    rationale: 'Turn-taking is early perspective-taking — recognizing another child has needs too — the seed of real cooperation.',
    criteria: { notYet: 'Struggles to wait or share without conflict.', emerging: 'Takes turns with reminders or support.', achieved: 'Takes turns independently across a couple rounds of play.' } },
  { key: 'social|feelings', domain: 'Social-Emotional', title: 'Names own feelings',
    rationale: 'Putting words to a feeling — something both Montessori and Waldorf caregivers model calmly — gives a child a tool to self-regulate instead of only acting out.',
    criteria: { notYet: 'Shows big feelings without words for them.', emerging: "Names a feeling with an adult's prompt.", achieved: 'Spontaneously names a feeling in the moment.' } },
];

export function defaultMilestoneState() {
  const out = {};
  for (const m of MILESTONES) {
    out[m.key] = { status: 'not yet', emergingDate: null, achievedDate: null, note: '' };
  }
  return out;
}

export function statusStyle(status) {
  if (status === 'achieved') return { badgeBg: '#E4EFDA', badgeFg: '#4F7A52', statusLabel: 'Achieved' };
  if (status === 'emerging') return { badgeBg: '#FBEFDA', badgeFg: '#A9803F', statusLabel: 'Emerging' };
  return { badgeBg: '#F0ECF7', badgeFg: '#7A5FA0', statusLabel: 'Not yet' };
}
