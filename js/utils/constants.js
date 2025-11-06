// Genre Definitions
const GENRES = {
    'hero-journey': {
        name: "Hero's Journey",
        description: "The classic monomyth structure of transformation",
        color: "#D97706", // Topaz
        stages: [
            {
                name: "Ordinary World",
                description: "Life before the journey begins"
            },
            {
                name: "Call to Adventure",
                description: "The inciting incident that disrupts normalcy"
            },
            {
                name: "Refusal of the Call",
                description: "Hesitation, fear, or resistance to change"
            },
            {
                name: "Meeting the Mentor",
                description: "Guidance appears to help you forward"
            },
            {
                name: "Crossing the Threshold",
                description: "Committing to the journey, no turning back"
            },
            {
                name: "Tests, Allies, and Enemies",
                description: "Challenges that test your resolve"
            },
            {
                name: "Approach to Inmost Cave",
                description: "Preparing for the greatest challenge"
            },
            {
                name: "Ordeal",
                description: "The darkest moment, facing your deepest fear"
            },
            {
                name: "Reward",
                description: "Surviving the ordeal brings insight"
            },
            {
                name: "The Road Back",
                description: "Beginning the return journey"
            },
            {
                name: "Resurrection",
                description: "Final test that proves transformation"
            },
            {
                name: "Return with Elixir",
                description: "Coming home changed, with wisdom to share"
            }
        ],
        emotionalArc: "u-shape",
        memoryPriority: ["transformation", "challenge", "mentor", "threshold"],
        prompts: [
            "What was your ordinary world before everything changed?",
            "Who served as your mentor or guide during this time?",
            "What threshold did you cross that you couldn't uncross?",
            "What was your darkest moment, your ordeal?",
            "How did you return transformed?",
            "What wisdom did you bring back from this experience?"
        ]
    },
    'sci-fi': {
        name: "Sci-Fi Memoir",
        description: "Technology and systems as narrative framework",
        color: "#1E3A8A", // Sapphire
        stages: [
            {
                name: "Setup/Technology",
                description: "The system as it was, the technology that defined your world"
            },
            {
                name: "Discovery/Wonder",
                description: "New possibilities emerge, paradigms shift"
            },
            {
                name: "Complication/System",
                description: "The system reveals its complexity and contradictions"
            },
            {
                name: "Crisis/Glitch",
                description: "Everything breaks down, the system fails"
            },
            {
                name: "Resolution/Upgrade",
                description: "New understanding emerges, you adapt and evolve"
            }
        ],
        emotionalArc: "exploratory",
        memoryPriority: ["discovery", "system-change", "paradigm-shift", "technology"],
        prompts: [
            "What technology or system shaped this moment in your life?",
            "How did systems fail or evolve around you?",
            "What future did you imagine from this vantage point?",
            "What discovery changed everything?",
            "How did you debug your own life?",
            "What was the glitch that revealed the truth?",
            "How did you upgrade yourself?"
        ]
    },
    'literary-fiction': {
        name: "Literary Fiction",
        description: "Subtle, interior, language-focused narrative",
        color: "#0F5257", // Emerald
        stages: [
            {
                name: "Establishing Atmosphere",
                description: "The world in careful, precise detail"
            },
            {
                name: "Character Revelation",
                description: "Who we really are beneath the surface"
            },
            {
                name: "Complication",
                description: "Quiet conflicts emerge, subtext deepens"
            },
            {
                name: "Moment of Truth",
                description: "Subtle recognition, internal shift"
            },
            {
                name: "Resonance/Ambiguity",
                description: "Questions linger, meaning remains open"
            }
        ],
        emotionalArc: "subtle-wave",
        memoryPriority: ["interior-conflict", "relationship", "epiphany", "symbolic-moment"],
        prompts: [
            "What went unsaid in this moment?",
            "Describe the quality of light in this memory",
            "What small detail held unexpected meaning?",
            "What did you notice that others missed?",
            "What does this moment mean now that it didn't mean then?",
            "What questions does this memory raise that you still can't answer?",
            "What metaphor captures the essence of this experience?"
        ]
    }
};

// Sensory Detail Library
const SENSORY_LIBRARY = {
    sights: [
        "golden afternoon light", "shadows lengthening", "dust motes in sunbeams",
        "weathered wood grain", "faded photographs", "cracked pavement",
        "flickering fluorescent lights", "hand-worn doorknobs", "peeling wallpaper",
        "distant mountains", "crowded city streets", "empty parking lots",
        "rain-streaked windows", "frost patterns", "steam rising"
    ],
    sounds: [
        "cicadas humming", "distant traffic", "creaking floorboards",
        "wind through trees", "screen door slamming", "clinking dishes",
        "muffled conversations", "footsteps echoing", "clock ticking",
        "birds at dawn", "rain on roof", "silence broken",
        "laughter from another room", "rustling papers", "humming refrigerator"
    ],
    smells: [
        "fresh-cut grass", "motor oil", "rain on hot pavement",
        "old books", "coffee brewing", "wood smoke",
        "grandmother's perfume", "hospital antiseptic", "salt air",
        "pine needles", "gasoline", "baking bread",
        "dust and sunshine", "autumn leaves", "chlorine"
    ],
    textures: [
        "rough wood", "cool metal", "soft worn cotton",
        "sticky vinyl", "smooth river stones", "warm concrete",
        "cold tile", "coarse rope", "velvet cushions",
        "dry grass", "wet leaves", "gritty sand",
        "smooth paper", "scratchy wool", "slick plastic"
    ],
    tastes: [
        "bitter coffee", "sweet lemonade", "metallic fear",
        "salt on lips", "dust in mouth", "mint gum",
        "copper pennies", "strawberries", "tap water",
        "birthday cake", "medicine", "cinnamon",
        "overcooked vegetables", "cold pizza", "regret"
    ]
};

// Emotional tone to color mapping
function getEmotionColor(tone) {
    if (tone <= -4) return '#1E3A8A'; // Very negative: sapphire
    if (tone <= -2) return '#0891B2'; // Negative: teal
    if (tone <= 2) return '#64748B';  // Neutral: slate
    if (tone <= 4) return '#D97706';  // Positive: topaz
    return '#BE123C';                 // Very positive: ruby
}

// Helper to get random items from array
function getRandomItems(array, count = 3) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// UUID generator
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
