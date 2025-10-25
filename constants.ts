import type { InspirationItem } from "./types";

export const WALLPAPER_STYLES: string[] = [
  'Kawaii',
  'Anime',
  'Chibi',
  'Pastel Academia',
  'Watercolor',
  'Magical Girl',
  'Cottagecore',
  'Fantasy',
  'Ghibli Inspired',
  'Pixel Art',
  '3D Render',
  'Abstract'
];

export const INSPIRATION_EXAMPLES: InspirationItem[] = [
  // Fantasy
  { id: 'insp-1', prompt: 'Bioluminescent mushrooms in a misty enchanted forest at night', style: 'Fantasy' },
  { id: 'insp-2', prompt: 'A majestic dragon flying over a medieval castle surrounded by mountains', style: '3D Render' },
  { id: 'insp-3', prompt: 'An ancient, weathered grimoire with glowing runes on a stone altar', style: 'Fantasy' },
  { id: 'insp-4', prompt: 'A floating island city held aloft by giant crystals, with waterfalls cascading into the clouds', style: 'Anime' },
  { id: 'insp-5', prompt: 'An elven archer perched on a moss-covered branch in a sun-dappled forest', style: 'Ghibli Inspired' },
  { id: 'insp-6', prompt: 'A powerful wizard conjuring a swirling vortex of arcane energy', style: 'Magical Girl' },
  { id: 'insp-7', prompt: 'A hidden village of tiny fairies living in oversized flowers', style: 'Watercolor' },

  // Sci-Fi & Cyberpunk
  { id: 'insp-8', prompt: 'A sleek, futuristic city skyline with flying vehicles at sunset', style: 'Anime' },
  { id: 'insp-9', prompt: 'A cute astronaut sitting on the moon, waving at Earth in the distance', style: 'Kawaii' },
  { id: 'insp-10', prompt: 'A neon-drenched alleyway in a futuristic city, with holographic advertisements flickering in the rain', style: 'Anime' },
  { id: 'insp-11', prompt: 'A massive, abandoned starship silently drifting in a colorful nebula', style: 'Abstract' },
  { id: 'insp-12', prompt: 'A lone chibi robot wandering through a vast, desert landscape on an alien planet', style: 'Chibi' },
  { id: 'insp-13', prompt: 'The interior of a high-tech spaceship bridge with panoramic views of space', style: '3D Render' },
  { id: 'insp-14', prompt: 'An android meditating in a serene, minimalist garden of light', style: 'Pastel Academia' },
  { id: 'insp-15', prompt: 'A bustling spaceport on Mars, with rockets taking off and landing', style: 'Anime' },
  { id: 'insp-16', prompt: 'A complex network of gears and pipes inside a colossal clockwork machine', style: 'Pixel Art' },

  // Nature & Landscape
  { id: 'insp-17', prompt: 'A tranquil Japanese garden with a koi pond and cherry blossoms', style: 'Ghibli Inspired' },
  { id: 'insp-18', prompt: 'The Northern Lights (Aurora Borealis) over a snow-covered mountain range', style: 'Watercolor' },
  { id: 'insp-19', prompt: 'A secluded tropical beach at sunrise, with crystal clear water and palm trees', style: 'Anime' },
  { id: 'insp-20', prompt: 'A vast, rolling field of lavender under a soft, cloudy sky', style: 'Cottagecore' },
  { id: 'insp-21', prompt: 'A massive, ancient tree with glowing roots in a dense jungle', style: 'Fantasy' },
  { id: 'insp-22', prompt: 'The grand canyon, painted in vibrant, pastel colors', style: 'Abstract' },
  { id: 'insp-23', prompt: 'A calm, reflective lake mirroring a galaxy-filled night sky with shooting stars', style: 'Fantasy' },
  { id: 'insp-24', prompt: 'A field of sunflowers painted with broad, expressive brushstrokes', style: 'Watercolor' },
  { id: 'insp-25', prompt: 'A gentle stream flowing through a lush, green forest, with light filtering through the leaves', style: 'Ghibli Inspired' },

  // Abstract & Minimalist
  { id: 'insp-26', prompt: 'Geometric shapes and waves in a pastel color palette', style: 'Pastel Academia' },
  { id: 'insp-27', prompt: 'A swirling explosion of liquid ink in multiple colors, frozen in time', style: 'Abstract' },
  { id: 'insp-28', prompt: 'A single, perfectly formed droplet falling into still water, creating ripples', style: '3D Render' },
  { id: 'insp-29', prompt: 'Overlapping, translucent glass panels in shades of pink and blue', style: '3D Render' },
  { id: 'insp-30', prompt: 'A complex, symmetrical mandala pattern with intricate details', style: 'Abstract' },
  { id: 'insp-31', prompt: 'Clean, intersecting lines on a textured, cream-colored background', style: 'Pastel Academia' },
  { id: 'insp-32', prompt: 'A chaotic splash of vibrant paint on a dark canvas', style: 'Abstract' },

  // Unique & Creative
  { id: 'insp-33', prompt: 'A library inside a giant, hollowed-out tree', style: 'Fantasy' },
  { id: 'insp-34', prompt: 'A city built on the back of a colossal, gentle turtle swimming through the ocean', style: 'Ghibli Inspired' },
  { id: 'insp-35', prompt: 'A magical girl transforming with ribbons of light and sparkles', style: 'Magical Girl' },
  { id: 'insp-36', prompt: 'Animals made of crystalline glass in a sunlit conservatory', style: '3D Render' },
  { id: 'insp-37', prompt: 'A staircase made of books leading up into the clouds', style: 'Fantasy' },
  { id: 'insp-38', prompt: 'A clockwork solar system with intricate gears and glowing planets', style: 'Pixel Art' },
  { id: 'insp-39', prompt: 'A chibi cat wearing samurai armor, sitting under a cherry blossom tree', style: 'Chibi' },
  { id: 'insp-40', prompt: 'A forgotten, overgrown theme park being reclaimed by nature', style: 'Ghibli Inspired' },
  { id: 'insp-41', prompt: 'A detailed map of a fantasy world on an old, rolled-up parchment', style: 'Fantasy' },
  { id: 'insp-42', prompt: 'A city skyline reflected perfectly in the sunglasses of a stylish anime character', style: 'Anime' },
  { id: 'insp-43', prompt: 'An old-fashioned steam train soaring through a starry night sky', style: 'Ghibli Inspired' },
  { id: 'insp-44', prompt: 'A cozy, cluttered artist\'s studio bathed in warm afternoon light', style: 'Watercolor' },
  { id: 'insp-45', prompt: 'A lone lighthouse standing against a dramatic, stormy sea', style: 'Watercolor' },
  { id: 'insp-46', prompt: 'A teacup containing a miniature galaxy', style: 'Abstract' },
  { id: 'insp-47', prompt: 'Origami animals in a lush, green forest clearing', style: 'Kawaii' },
  { id: 'insp-48', prompt: 'A city where the streets are rivers and people travel by gondola', style: 'Anime' },
  { id: 'insp-49', prompt: 'A single, glowing feather floating in a dark, empty space', style: 'Abstract' },
  { id: 'insp-50', prompt: 'The world seen through the multifaceted eye of an insect', style: 'Abstract' },
  { id: 'insp-51', prompt: 'A picnic with cute animal friends in a field of flowers', style: 'Cottagecore' },
  // FIX: Corrected a typo in the object property key from `id:t:` to `id:`
  { id: 'insp-52', prompt: 'A mechanical heart made of brass and copper, glowing with a soft, warm light', style: 'Pixel Art' }
];