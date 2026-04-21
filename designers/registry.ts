export type Designer = {
  slug: string
  name: string
  role?: string
  photo: string // drop matching file into public/designers/[slug].jpg to activate
  cardAccent: string
}

// Config 2026 brand palette
export const CONFIG_COLORS = {
  orange: "#FF5A1F",
  yellow: "#FFE600",
  green:  "#00CC52",
  blue:   "#4DB6F5",
  pink:   "#F2B8C6",
}

export const designers: Designer[] = [
  {
    slug:      "agatha-shibuya",
    name:      "Agatha Shibuya",
    role:      "Senior Product Designer",
    photo:     "/designers/agatha-shibuya.png",
    cardAccent: CONFIG_COLORS.orange,
  },
  {
    slug:      "courtney-oakes",
    name:      "Courtney Oakes",
    role:      "Staff Product Designer",
    photo:     "/designers/courtney-oakes.png",
    cardAccent: CONFIG_COLORS.yellow,
  },
  {
    slug:      "greg-romano",
    name:      "Greg Romano",
    role:      "Staff Product Designer",
    photo:     "/designers/greg-romano.png",
    cardAccent: CONFIG_COLORS.green,
  },
  {
    slug:      "jiayu-zhou",
    name:      "Jiayu Zhou",
    role:      "Senior Product Designer",
    photo:     "/designers/jiayu-zhou.jpg",
    cardAccent: CONFIG_COLORS.blue,
  },
  {
    slug:      "kevin-coudures",
    name:      "Kevin Coudures",
    role:      "Manager, Design",
    photo:     "/designers/kevin-coudures.jpg",
    cardAccent: CONFIG_COLORS.pink,
  },
  {
    slug:      "luiza-allgayer",
    name:      "Luiza Allgayer",
    role:      "Manager, Design",
    photo:     "/designers/luiza-allgayer.png",
    cardAccent: CONFIG_COLORS.orange,
  },
  {
    slug:      "margaret-moss",
    name:      "Margaret Moss",
    role:      "Manager, Design",
    photo:     "/designers/margaret-moss.png",
    cardAccent: CONFIG_COLORS.yellow,
  },
  {
    slug:      "nicole-baeder",
    name:      "Nicole Baeder",
    role:      "Staff Product Designer",
    photo:     "/designers/nicole-baeder.jpg",
    cardAccent: CONFIG_COLORS.green,
  },
  {
    slug:      "quan-long",
    name:      "Quan Long",
    role:      "Senior Product Designer",
    photo:     "/designers/quan-long.png",
    cardAccent: CONFIG_COLORS.blue,
  },
  {
    slug:      "ryan-davis",
    name:      "Ryan Davis",
    role:      "Director, Design",
    photo:     "/designers/ryan-davis.jpg",
    cardAccent: CONFIG_COLORS.pink,
  },
  {
    slug:      "steve-gordon",
    name:      "Steve Gordon",
    role:      "Senior Staff Product Designer",
    photo:     "/designers/steve-gordon.jpg",
    cardAccent: CONFIG_COLORS.orange,
  },
  {
    slug:      "maya",
    name:      "Maya",
    role:      "Product Designer",
    photo:     "",
    cardAccent: "#A78BFA",
  },
]
