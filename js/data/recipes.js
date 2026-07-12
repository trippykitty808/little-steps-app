// Recipe library — curated whole-food, plant-based recipes for ~6 months to 5+
// years. EDUCATIONAL, not medical advice (see RECIPE_DISCLAIMER). Each recipe
// carries a nutrition note tied to the stage-guide nutrients, common-allergen
// flags, and an age-specific safety/prep note. A registered pediatric dietitian
// should review before families rely on it.

export const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

// The common allergens a family might want to screen out. A recipe lists any it
// contains in its `allergens` array (based on core ingredients).
export const AVOIDABLE_ALLERGENS = ['Soy', 'Nuts', 'Sesame', 'Gluten'];

export const RECIPE_DISCLAIMER =
  'These are recipe ideas that fit a whole-food, plant-based approach — not medical advice. Introduce new foods and common allergens one at a time per your pediatrician’s guidance, watch for reactions, prepare each food safely for your child’s age (see each recipe’s safety note), and always supervise eating. On a vegan diet, keep up the family’s agreed supplements, like vitamin B12.';

export const MORE_RECIPE_SOURCES = [
  { name: 'Happy Family Organics — Baby & Toddler Vegetarian Meal Plan', desc: 'Dietitian-informed plant-based meal planning by age.', url: 'https://www.happyfamilyorganics.com/learning-center/article/meal-plan/baby-tot-vegetarian-meal-plan/' },
  { name: 'Vegan Kids Nutrition — Meal Ideas', desc: 'Recipes and guidance from a registered dietitian specializing in plant-based kids.', url: 'https://vegankidsnutrition.com/blog/26-vegan-meal-ideas-for-toddlers-and-kids' },
];

export const RECIPES = [
  { id: 'r1', name: 'Iron-Boost Berry Oatmeal', mealType: 'Breakfast', ageMin: 6, ageMax: 60, time: '5 min', servings: '1–2', color: '#F4D9C6', emoji: '🥣',
    ingredients: ['1/3 cup rolled oats', '2/3 cup water (or fortified soy milk)', '1 tsp ground flaxseed', 'A handful of soft or mashed berries', 'Optional: a thin swirl of nut or seed butter'],
    steps: [
      'Simmer the oats in the water (or fortified soy milk) until soft and creamy.',
      'Stir in the ground flaxseed.',
      'Top with mashed or finely chopped berries.',
      'For a baby, blend or mash until smooth; for a toddler, leave a soft texture.',
      'Let it cool to just warm before serving.',
    ],
    nutritionNote: 'Oats and flax bring iron and omega-3 ALA, and the berries’ vitamin C helps that plant iron absorb.',
    keyNutrients: ['Iron', 'Omega-3', 'Fiber'], allergens: [],
    safetyNote: 'Serve lukewarm, not hot. Under 12 months, mash or blend smooth. Keep any nut/seed butter thinly stirred through (never a spoonful on its own).' },

  { id: 'r2', name: 'Tofu Veggie Scramble', mealType: 'Breakfast', ageMin: 9, ageMax: 60, time: '15 min', servings: '2', color: '#C9DDB6', emoji: '🍳',
    ingredients: ['1/2 block firm tofu, crumbled', '1 small soft tomato, diced', 'A handful of spinach, finely chopped', 'Pinch of turmeric (for color)', '1 tbsp fortified nutritional yeast', '1 tsp olive oil'],
    steps: [
      'Warm the olive oil in a pan over medium heat.',
      'Add the crumbled tofu and turmeric; cook a few minutes.',
      'Stir in the tomato and spinach until soft and wilted.',
      'Sprinkle in the fortified nutritional yeast for a savory, cheesy note.',
      'Cool and cut into small soft pieces.',
    ],
    nutritionNote: 'Tofu delivers protein, iron, and calcium; fortified nutritional yeast can add vitamin B12; the tomato’s vitamin C boosts iron absorption.',
    keyNutrients: ['Protein', 'Iron', 'Calcium', 'B12'], allergens: ['Soy'],
    safetyNote: 'Cool and serve in soft, small pieces. Skip added salt for babies and young toddlers.' },

  { id: 'r3', name: 'Banana Oat Blender Pancakes', mealType: 'Breakfast', ageMin: 12, ageMax: 60, time: '15 min', servings: '2–3', color: '#F4D9C6', emoji: '🥞',
    ingredients: ['1 ripe banana', '3/4 cup rolled oats', '1 tbsp ground flaxseed', '1/2 cup plant milk', '1 tsp baking powder', 'Pinch of cinnamon'],
    steps: [
      'Blend everything until smooth; let the batter rest 5 minutes.',
      'Cook small rounds on a lightly oiled pan over medium-low heat.',
      'Flip when bubbles form and the edges set.',
      'Cool and cut into soft strips.',
    ],
    nutritionNote: 'Naturally sweet from banana with no added sugar; oats and flax add fiber, iron, and omega-3.',
    keyNutrients: ['Iron', 'Omega-3', 'Fiber'], allergens: [],
    safetyNote: 'Cut into soft strips a small hand can hold. Make sure they’re cooked through, not gummy. Use certified gluten-free oats if avoiding gluten.' },

  { id: 'r4', name: 'Creamy Hummus Veggie Pinwheels', mealType: 'Lunch', ageMin: 12, ageMax: 60, time: '10 min', servings: '2', color: '#B9C7DE', emoji: '🌯',
    ingredients: ['3 tbsp hummus (chickpea + tahini)', '1 soft whole-grain tortilla', '1/4 avocado, mashed', 'Finely grated (or steamed) cucumber and carrot'],
    steps: [
      'Spread the hummus over the soft tortilla.',
      'Add the mashed avocado and soft grated veg.',
      'Roll it up snugly and cut into small pinwheels.',
    ],
    nutritionNote: 'Chickpeas and tahini give protein, iron, and healthy fats; avocado adds brain-supporting fat.',
    keyNutrients: ['Protein', 'Iron', 'Healthy fat'], allergens: ['Sesame', 'Gluten'],
    safetyNote: 'Steam or very finely grate raw veg for under-2s. Cut pinwheels small and press them so they don’t unroll.' },

  { id: 'r5', name: 'Red Lentil & Sweet Potato Dahl', mealType: 'Lunch', ageMin: 6, ageMax: 60, time: '25 min', servings: '3–4', color: '#F4D9C6', emoji: '🍠',
    ingredients: ['1/2 cup red lentils, rinsed', '1 small sweet potato, diced', '1 1/2 cups water', 'Pinch of cumin and turmeric', 'A splash of coconut milk'],
    steps: [
      'Simmer the lentils and sweet potato in the water until very soft, about 20 minutes.',
      'Stir in the mild spices and a splash of coconut milk.',
      'Mash to the texture your child is ready for.',
      'Serve on its own, or with soft rice for older kids.',
    ],
    nutritionNote: 'Lentils are a top plant source of iron and protein; sweet potato adds vitamin A; coconut milk adds energy-dense fat for growing brains.',
    keyNutrients: ['Iron', 'Protein', 'Vitamin A'], allergens: [],
    safetyNote: 'A great first food mashed smooth. No added salt for babies. Serve just warm.' },

  { id: 'r6', name: 'White Bean & Avocado Smash Toast', mealType: 'Lunch', ageMin: 9, ageMax: 60, time: '10 min', servings: '2', color: '#C9DDB6', emoji: '🥑',
    ingredients: ['1/2 cup white beans (cannellini), rinsed', '1/4 ripe avocado', 'A small squeeze of lemon', '1 slice soft whole-grain bread, lightly toasted'],
    steps: [
      'Mash the beans and avocado together with a squeeze of lemon.',
      'Spread onto the lightly toasted, soft bread.',
      'Cut into strips or small pieces.',
    ],
    nutritionNote: 'Beans bring protein and iron, avocado brings healthy fat and folate, and the lemon’s vitamin C helps the iron absorb.',
    keyNutrients: ['Protein', 'Iron', 'Healthy fat', 'Folate'], allergens: ['Gluten'],
    safetyNote: 'Toast lightly so it’s soft to gum, and cut small. For the youngest eaters, serve the smash on a soft base or a preloaded spoon.' },

  { id: 'r7', name: 'Hidden-Veg Red Lentil Pasta', mealType: 'Dinner', ageMin: 12, ageMax: 60, time: '25 min', servings: '3', color: '#F0C9C9', emoji: '🍝',
    ingredients: ['1 1/2 cups red lentil pasta', '1 cup tomato passata', '1 small carrot and 1/2 zucchini, finely grated', '1 tsp olive oil', 'A few basil leaves'],
    steps: [
      'Cook the lentil pasta until soft.',
      'Meanwhile, simmer the passata with the grated veg and olive oil until the veg softens in.',
      'Stir the sauce through the pasta.',
      'Cut the pasta into short pieces for little ones.',
    ],
    nutritionNote: 'Lentil pasta roughly doubles the iron and protein of regular pasta; the blended veg add vitamins and the tomato’s vitamin C helps iron along.',
    keyNutrients: ['Iron', 'Protein', 'Fiber'], allergens: [],
    safetyNote: 'Cut pasta into short pieces and serve warm, not hot. (Regular wheat pasta adds gluten if you swap it in.)' },

  { id: 'r8', name: 'Tofu & Veggie Stir-Fry with Soft Rice', mealType: 'Dinner', ageMin: 18, ageMax: 60, time: '25 min', servings: '3', color: '#B9C7DE', emoji: '🍚',
    ingredients: ['1/2 block firm tofu, small cubes', 'Soft-steamed broccoli, carrot, and red pepper', '1/2 tsp low-sodium tamari (older kids)', '1 small clove garlic', 'A few drops sesame oil', 'Cooked soft rice'],
    steps: [
      'Pan-fry the tofu cubes until lightly golden.',
      'Add the soft-steamed veg and garlic and warm through.',
      'Finish with a few drops of tamari and sesame oil.',
      'Serve over soft rice, with everything cut small.',
    ],
    nutritionNote: 'Tofu and rice provide protein and iron; the colorful veg add vitamins, and the vitamin C in pepper helps iron absorb.',
    keyNutrients: ['Protein', 'Iron'], allergens: ['Soy', 'Sesame'],
    safetyNote: 'Cut tofu and veg into small, soft pieces. Go very easy on tamari/salt for young children.' },

  { id: 'r9', name: 'Chickpea Coconut Curry', mealType: 'Dinner', ageMin: 18, ageMax: 60, time: '30 min', servings: '3–4', color: '#F4D9C6', emoji: '🍛',
    ingredients: ['1 cup chickpeas, rinsed', '1/2 cup coconut milk', '1 small tomato, chopped', 'A handful of spinach, chopped', 'Mild curry spices', 'Cooked soft rice'],
    steps: [
      'Simmer the chickpeas with tomato, coconut milk, and mild spices for 15 minutes.',
      'Stir in the chopped spinach until wilted.',
      'Lightly mash the chickpeas for younger children.',
      'Serve with soft rice.',
    ],
    nutritionNote: 'Chickpeas and spinach are iron-rich; coconut milk adds energy-dense fat; the tomato helps iron absorb.',
    keyNutrients: ['Iron', 'Protein', 'Healthy fat'], allergens: [],
    safetyNote: 'Lightly mash the chickpeas — whole legumes can be a choking risk for the youngest. Keep the spice mild and the salt low.' },

  { id: 'r10', name: 'Baked Veggie & Bean Fritters', mealType: 'Dinner', ageMin: 12, ageMax: 60, time: '30 min', servings: '8–10 small', color: '#C9DDB6', emoji: '🧆',
    ingredients: ['1 cup white beans, mashed', '1 cup grated zucchini and carrot (squeezed dry)', '1/3 cup oats, ground', '1 tbsp ground flax + 3 tbsp water (flax "egg")', 'Herbs to taste'],
    steps: [
      'Mix the ground flax with water and let it thicken for 5 minutes.',
      'Combine the mashed beans, grated veg, ground oats, flax "egg," and herbs.',
      'Form small patties and place on a lined tray.',
      'Bake at 400°F (200°C) for ~20 minutes until firm; cool.',
    ],
    nutritionNote: 'Beans and oats give iron and protein; flax adds omega-3; baking (instead of frying) keeps it whole-food.',
    keyNutrients: ['Iron', 'Protein', 'Omega-3'], allergens: [],
    safetyNote: 'Make them small and soft, and cool fully before serving. Supervise closely. Use certified gluten-free oats if avoiding gluten.' },

  { id: 'r11', name: 'Green Power Smoothie', mealType: 'Snack', ageMin: 12, ageMax: 60, time: '5 min', servings: '2', color: '#C9DDB6', emoji: '🥤',
    ingredients: ['1 cup fortified soy milk', 'A handful of baby spinach', '1/2 cup frozen mango', '1 tsp ground flaxseed', '1/2 ripe banana'],
    steps: [
      'Blend everything until completely smooth.',
      'Serve in an open or straw cup.',
    ],
    nutritionNote: 'Fortified soy milk brings calcium and protein; spinach adds iron; mango’s vitamin C helps absorb it; flax adds omega-3.',
    keyNutrients: ['Calcium', 'Iron', 'Omega-3', 'Vitamin C'], allergens: ['Soy'],
    safetyNote: 'Offer in a cup, not a bottle. This is a nutrient-rich drink alongside food, not a meal replacement.' },

  { id: 'r12', name: 'Chia Berry Pudding', mealType: 'Snack', ageMin: 12, ageMax: 60, time: '5 min + chill', servings: '2', color: '#F0C9C9', emoji: '🍮',
    ingredients: ['3 tbsp chia seeds', '1 cup fortified plant milk', 'A handful of mashed berries', 'A splash of vanilla'],
    steps: [
      'Stir the chia into the fortified plant milk and vanilla.',
      'Chill for a few hours (or overnight) until thick and gelled.',
      'Top with mashed berries.',
    ],
    nutritionNote: 'Chia is a plant source of omega-3 and calcium; fortified milk adds calcium and can add B12; berries add vitamin C.',
    keyNutrients: ['Omega-3', 'Calcium', 'Fiber'], allergens: ['Soy'],
    safetyNote: 'Make sure the chia is fully soaked and gelled before serving — dry chia can swell. Serve soft and spoonable.' },

  { id: 'r13', name: 'Nut- or Seed-Butter Oat Balls', mealType: 'Snack', ageMin: 24, ageMax: 60, time: '15 min', servings: '10 small', color: '#F4D9C6', emoji: '🍪',
    ingredients: ['1 cup rolled oats', '1/3 cup smooth nut or seed butter', '1/3 cup mashed banana or date paste', '1 tbsp ground flaxseed'],
    steps: [
      'Mix everything into a soft, sticky dough.',
      'Roll into small balls.',
      'Chill to firm up.',
    ],
    nutritionNote: 'Energy-dense healthy fats plus iron for busy little bodies — and no added sugar when you sweeten with banana or dates.',
    keyNutrients: ['Healthy fat', 'Iron', 'Energy-dense'], allergens: ['Nuts'],
    safetyNote: 'Best from age 2+. Keep them small and soft — whole nuts and large blobs of nut butter are choking risks. Use sunflower-seed butter for a nut-free version.' },
];
