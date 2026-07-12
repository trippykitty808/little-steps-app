// Nutrition guide content — developmental-stage nutrition for a plant-based,
// whole-food approach. This is CURATED EDUCATIONAL CONTENT, not medical advice.
// Stage keys match stageForMonths() in utils.js. Sourced from reputable public
// health / pediatric bodies (see SOURCES). A registered pediatric dietitian
// should review this before families rely on it — flagged in the app's UI.

export const NUTRITION_DISCLAIMER =
  'This is general educational information to support a family’s chosen plant-based approach — not medical or nutritional advice. Every child is different. A young child’s diet — and especially a fully plant-based or vegan one — should be planned with the child’s parents and their pediatrician or a registered pediatric dietitian, who can advise on supplements (like vitamin B12) and check nutrient levels. Always follow the parents’ feeding plan and any allergy guidance.';

// The cross-cutting nutrients to keep an eye on across every stage of a
// plant-based diet — the "don't-miss" list.
export const PLANT_BASED_ESSENTIALS = [
  { name: 'Vitamin B12', note: 'Not reliably found in plant foods — on a vegan diet it must come from fortified foods or a supplement. This one isn’t optional; talk to the pediatrician.' },
  { name: 'Iron', note: 'Plant iron (lentils, beans, tofu, fortified cereal, leafy greens) absorbs better alongside vitamin C (fruit, peppers, tomato).' },
  { name: 'Vitamin D', note: 'Hard to get from food; often supplemented, especially for breastfed babies and in low-sun months.' },
  { name: 'Omega-3 (DHA)', note: 'For brain and eye development. Ground flax, chia, hemp, and walnuts give ALA; a dietitian may suggest an algae-based DHA supplement.' },
  { name: 'Calcium', note: 'From calcium-fortified soy milk, calcium-set tofu, and leafy greens.' },
  { name: 'Zinc & Iodine', note: 'Support growth and thyroid/brain development; iodine is easy to miss on plant-based diets — iodized salt or a supplement may be advised.' },
  { name: 'Protein variety', note: 'A rotating mix of legumes, soy foods, grains, nuts, and seeds covers the building blocks for growth.' },
  { name: 'Enough calories & healthy fat', note: 'Small tummies fill fast — very high-fiber, low-fat meals can leave a young child short on the energy and fat their growing brain needs. Include energy-dense foods like avocado, nut/seed butters, and oils.' },
];

export const NUTRITION_SOURCES = [
  { name: 'CDC — Infant & Toddler Nutrition', desc: 'Federal guidance on feeding, first foods, and choking safety.', url: 'https://www.cdc.gov/infant-toddler-nutrition/' },
  { name: 'HealthyChildren.org (AAP) — Vegetarian & Vegan Diets', desc: 'The American Academy of Pediatrics on plant-based diets for children.', url: 'https://www.healthychildren.org/English/tips-tools/ask-the-pediatrician/Pages/My-child-wants-to-be-a-vegetarian-Is-that-ok.aspx' },
  { name: 'CHOC — Are Plant-Based Diets Safe for Kids?', desc: 'Children’s Hospital of Orange County pediatric overview.', url: 'https://health.choc.org/are-vegetarian-and-vegan-plant-based-diets-safe-for-kids/' },
  { name: 'Nemours KidsHealth — Vegetarian Diets', desc: 'Pediatrician-reviewed guidance on raising a vegetarian/vegan child.', url: 'https://kidshealth.org/en/parents/vegetarianism.html' },
  { name: 'CDC — Choking Hazards', desc: 'Which foods to avoid or modify, and how to prepare them safely.', url: 'https://www.cdc.gov/infant-toddler-nutrition/foods-and-drinks/choking-hazards.html' },
  { name: 'Vegan Nutrition for Mothers and Children (peer-reviewed)', desc: 'Practical clinical tools; good for sharing with a dietitian.', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6356233/' },
];

export const STAGE_NUTRITION = {
  'Infant': {
    stage: 'Infant', ageLabel: '0–12 months',
    headline: 'Rapid brain growth — milk is the foundation.',
    brainBody: 'A baby’s brain nearly doubles in size in the first year, which takes a lot of energy, healthy fat, iron, and DHA. Breast milk or infant formula is the main source of nutrition through the whole first year. Around 6 months, babies’ iron stores start to run low and iron-rich first foods become important alongside milk.',
    keyNutrients: [
      { name: 'Iron (from ~6 months)', why: 'Iron stores drop around half a year; first foods help refill them.', plantSources: 'Iron-fortified infant cereal, well-mashed lentils and beans, tofu — paired with a little vitamin-C fruit.' },
      { name: 'Healthy fats & DHA', why: 'Structural building blocks of the growing brain and eyes.', plantSources: 'Mashed avocado; DHA via mother’s diet/supplement if breastfeeding.' },
      { name: 'Vitamin B12 & Vitamin D', why: 'B12 supports the nervous system; vitamin D supports bones.', plantSources: 'Comes via the breastfeeding parent’s B12 status or a supplement; vitamin D is often supplemented for breastfed babies.' },
    ],
    plantBasedNote: 'Plant "milks" (soy, oat, almond) are NOT a substitute for breast milk or formula under 12 months. A breastfed vegan baby needs the parent to be reliably getting B12 (or the baby supplemented). This stage is very much parent- and pediatrician-led.',
    foodIdeas: ['Iron-fortified infant cereal', 'Well-mashed lentils or beans', 'Silky tofu', 'Mashed avocado', 'Pureed cooked veg & soft fruit'],
    safety: 'No cow’s milk or plant milk as a main drink under 12 months. No honey under 12 months (botulism risk). Introduce common allergens early per your pediatrician’s guidance. Everything smooth or well-mashed, baby seated upright and always supervised.',
  },
  'Young Toddler': {
    stage: 'Young Toddler', ageLabel: '12–18 months',
    headline: 'Moving from purées to family foods.',
    brainBody: 'The brain is still growing fast, so fat should not be restricted at this age. Toddlers move to soft, chopped versions of family meals. This is when a milk beyond breast milk/formula usually enters the picture.',
    keyNutrients: [
      { name: 'Iron + Vitamin C', why: 'Still a top priority; vitamin C boosts absorption of plant iron.', plantSources: 'Lentils, beans, tofu, fortified cereal + citrus, berries, or peppers.' },
      { name: 'Calcium & Vitamin D', why: 'For bones and teeth as they grow and start walking.', plantSources: 'Calcium-fortified unsweetened soy milk, calcium-set tofu, fortified foods.' },
      { name: 'Healthy fats', why: 'Energy-dense fuel for the fast-growing brain.', plantSources: 'Avocado, thinly spread nut/seed butters, ground seeds stirred into food.' },
    ],
    plantBasedNote: 'For the "main milk" at this age, a fortified unsweetened soy milk is the usual dietitian-recommended plant option because it’s closest to cow’s milk in protein and calories. Other plant milks (oat, almond, rice) are lower in protein and shouldn’t be the main milk without professional guidance. Keep B12 coming from fortified foods or a supplement.',
    foodIdeas: ['Soft-cooked veggies', 'Mashed beans & lentils', 'Scrambled tofu', 'Oatmeal with ground seeds', 'Fortified soy milk'],
    safety: 'Cut grapes and cherry tomatoes into quarters, spread nut butter thin, and finely chop or grind nuts and seeds. No whole nuts, popcorn, or hard raw veg. Seated, supervised meals.',
  },
  'Toddler': {
    stage: 'Toddler', ageLabel: '18–24 months',
    headline: 'Small tummies, big needs — nutrient density matters.',
    brainBody: 'Appetites swing a lot day to day at this age (that’s normal). Because tummies are small and fill quickly, the focus is on nutrient- and calorie-dense foods. This is the most important plant-based caution: very high-fiber, low-fat meals can fill a toddler up before they get enough calories and fat for growth and brain development.',
    keyNutrients: [
      { name: 'Calories & healthy fat', why: 'Small stomachs need concentrated energy, not just bulk.', plantSources: 'Avocado, nut/seed butters, a drizzle of olive or flax oil into cooked food.' },
      { name: 'Protein variety', why: 'A rotating mix covers all the amino-acid building blocks.', plantSources: 'Lentils, chickpeas, tofu, tempeh, beans.' },
      { name: 'Iron & Omega-3 (ALA)', why: 'Iron for oxygen to the brain; omega-3s for brain structure.', plantSources: 'Fortified cereal + vitamin C; ground flax, chia, hemp, walnuts.' },
    ],
    plantBasedNote: 'Watch that milk and juice don’t crowd out meals. Keep B12 fortified/supplemented. A dietitian may suggest an algae-based DHA supplement for omega-3.',
    foodIdeas: ['Hummus with soft pita', 'Lentil or chickpea pasta', 'Tofu scramble', 'Thin nut butter on soft bread', 'Smoothie with ground seeds'],
    safety: 'Same choking rules: quarter round foods, thin nut butter, grind nuts/seeds. Offer water as the main between-meal drink.',
  },
  'Young Preschooler': {
    stage: 'Young Preschooler', ageLabel: '2–3 years',
    headline: 'Building a varied, balanced plate.',
    brainBody: 'Growth steadies a bit and food preferences form. Aim for variety across the week: grains, a protein (legumes/soy), vegetables, fruit, healthy fats, and a calcium source. Repeatedly offering foods — without pressure — helps a cautious eater come around.',
    keyNutrients: [
      { name: 'Iron & Zinc', why: 'Support brain signaling and immune health.', plantSources: 'Beans, lentils, tofu, whole grains, pumpkin seeds.' },
      { name: 'Calcium & Vitamin D', why: 'Bone growth continues steadily.', plantSources: 'Fortified soy milk, calcium-set tofu, leafy greens.' },
      { name: 'Vitamin B12 & Omega-3', why: 'Nervous-system and brain support.', plantSources: 'Fortified foods/supplement for B12; ground seeds and walnuts for omega-3.' },
    ],
    plantBasedNote: 'A "balanced plate" most meals — plus the B12 source — keeps a plant-based 2–3 year old on track. Keep added sugar and ultra-processed foods low; offer water as the main drink.',
    foodIdeas: ['Little grain & bean bowls', 'Bean tacos', 'Veggie-lentil soup', 'Fruit with thin nut butter', 'Fortified plant milk'],
    safety: 'Choking care continues to about age 4 — keep preparing higher-risk foods safely. Calm, seated, supervised meals.',
  },
  'Preschooler': {
    stage: 'Preschooler', ageLabel: '3–4 years',
    headline: 'Fueling learning, play, and growth.',
    brainBody: 'Busy bodies and busy brains run on steady, nutrient-dense meals and snacks. Iron and omega-3s support focus and learning. Aim for a rainbow of plants, whole grains, and legumes most days, with healthy fats included.',
    keyNutrients: [
      { name: 'Iron (+ Vitamin C)', why: 'Supports concentration and energy.', plantSources: 'Lentils, beans, fortified cereal + fruit or peppers.' },
      { name: 'Omega-3 (DHA)', why: 'Brain and eye development and function.', plantSources: 'Ground chia/flax/hemp, walnuts; algae-based DHA if advised.' },
      { name: 'Iodine', why: 'Thyroid and brain development — easy to miss on plant-based diets.', plantSources: 'Iodized salt, or a supplement per a dietitian.' },
    ],
    plantBasedNote: 'Eating together and involving your child in simple prep builds good habits. Keep B12 (and vitamin D/iodine as advised) consistent.',
    foodIdeas: ['Overnight oats with chia', 'Veggie chili', 'Tofu stir-fry', 'Whole-grain veggie wraps', 'Fruit + finely chopped seeds'],
    safety: 'Most children still need whole nuts, hard raw veg, and popcorn kept off the menu or well-modified. Keep an eye at meals.',
  },
  'Kindergarten Prep': {
    stage: 'Kindergarten Prep', ageLabel: '4–5+ years',
    headline: 'Steady habits for a growing kid.',
    brainBody: 'Eating patterns are solidifying. Emphasize consistency, variety, and letting your child help choose and cook. On a vegan diet, keep vitamin B12 going (and vitamin D/iodine as advised) — this doesn’t change as they get older.',
    keyNutrients: [
      { name: 'The core set', why: 'The same priorities carry through: iron, B12, calcium, vitamin D, omega-3, iodine, zinc.', plantSources: 'A varied whole-food plant diet plus the family’s agreed supplements.' },
      { name: 'Whole foods over processed', why: 'Organic, minimally-processed choices support overall health.', plantSources: 'Whole grains, legumes, vegetables, fruit, nuts, and seeds.' },
    ],
    plantBasedNote: 'Broader family meals work now — grain bowls, bean burgers, veggie curries, smoothies, and (age-appropriate) trail mix with finely chopped nuts.',
    foodIdeas: ['Grain & veggie bowls', 'Bean burgers', 'Veggie curry with rice', 'Smoothies', 'Whole-grain pasta with lentil sauce'],
    safety: 'Fewer choking restrictions, but stay mindful of whole nuts and hard candy for some children. Keep the focus on balanced, whole-food, organic choices.',
  },
};

export const NUTRITION_STAGE_ORDER = ['Infant', 'Young Toddler', 'Toddler', 'Young Preschooler', 'Preschooler', 'Kindergarten Prep'];
