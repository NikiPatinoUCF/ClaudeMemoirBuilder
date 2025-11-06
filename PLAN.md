# Tell Your Story: A Crafted Memoir - Implementation Plan

## Project Overview

An interactive web application that helps memoir writers discover and shape their narratives across multiple formats and genres. Built with HTML, CSS, JavaScript, and P5.js for GitHub Pages deployment.

## MVP (Phase 1) - Core Foundation

### Core Features

#### 1. Project Management
- Create, load, switch between multiple memoir projects
- Auto-save to browser localStorage
- Export projects as JSON files
- Import previously exported projects
- Delete projects with confirmation

#### 2. Memory Input & Management
Each memory/event captures:
- **Title**: Brief description
- **Narrative**: Full text content
- **Date/Period**: Year, season, or specific date with precision indicator
- **Emotional Tone**: Intensity slider (-5 to +5 scale)
- **Sensory Details**: Five categories (sights, sounds, smells, textures, tastes)
- **Themes/Tags**: User-defined tags + suggested tags (keyword analysis)
- **Characters**: People involved
- **Location**: Where it happened
- **Notes**: Additional context or "anything else"
- **Images**: URLs or uploads for style format visualizations

#### 3. Interactive Memory Map (P5.js)
- Visual node-based graph of memories
- Nodes color-coded by emotional tone
- Connections between related memories
- Interactive features:
  - Drag nodes to reposition
  - Click to select/view details
  - Draw connections between memories
  - Zoom and pan navigation
  - Connection strength visualization

#### 4. Visual Timeline Builder
- Chronological and narrative timeline views
- Drag-and-drop memory reordering
- Emotional arc line graph overlay
- Act/movement organization (Phase 2)
- Tension tracking visualization

#### 5. Genre Filter System (MVP: 3 Genres)

**Hero's Journey**
- 12-stage structure: Ordinary World, Call to Adventure, Refusal, Meeting Mentor, Crossing Threshold, Tests/Allies/Enemies, Approach, Ordeal, Reward, Road Back, Resurrection, Return
- U-shaped emotional arc (descent then ascent)
- Highlights: Transformations, challenges, mentor figures, threshold moments
- Prompts: "What was your ordinary world before change?", "Who guided you?", "What did you bring back?"

**Sci-Fi Memoir**
- Structure: Setup/Technology, Discovery/Wonder, Complication/System, Crisis/Glitch, Resolution/Upgrade
- Exploratory emotional arc with wonder peaks
- Highlights: Discoveries, system changes, paradigm shifts, future-looking moments
- Prompts: "What technology shaped this memory?", "How did systems fail or evolve?", "What future did you imagine?"
- Metaphors: Technology as change agent, systems as society, glitches as revelation

**Literary Fiction**
- Structure: Establishing atmosphere, Character revelation, Complication, Moment of truth, Resonance/ambiguity
- Subtle, nuanced emotional arc
- Highlights: Internal conflicts, relationships, epiphanies, symbolic moments
- Prompts: "What went unsaid?", "Describe the quality of light", "What small detail held meaning?"
- Focus: Interiority, subtext, language precision, thematic depth

Each genre:
- Suggests narrative structure stages
- Reorders memories to fit convention
- Highlights relevant memory types
- Adjusts emotional arc visualization
- Provides genre-specific writing prompts

#### 6. Scene Crafting Prompts
- Genre-filtered writing prompts
- Sensory detail generators by category
- Specificity tools ("make it more concrete")
- "Show don't tell" suggestions

#### 7. Demo Mode
- Pre-populated sample memoir project
- Showcases all features with example data
- "Try Demo" button on landing screen
- Demonstrates memory connections, emotional arcs, genre filters
- Helps users understand the tool before creating their own project

### User Experience Flow

**Flexible Navigation**: Users can jump freely between any feature at any time via sidebar navigation.

**Suggested Workflow** (for new users):
1. Create a new project or try demo
2. Add memories (start with 3-5 significant moments)
3. Explore memory map to visualize connections
4. Build timeline to see chronology and emotional arc
5. Apply genre filters to see different structural possibilities
6. Use scene prompts to deepen specific memories
7. Export project for safekeeping

**Data Entry**: Users can either:
- Start from scratch and build incrementally
- Import existing memoir content and organize it
- Both approaches simultaneously

### Technical Architecture

#### File Structure
```
ClaudeMemoirBuilder/
├── index.html                 # Main entry point
├── css/
│   ├── main.css              # Global styles & layout
│   ├── theme.css             # Gem tone color system
│   ├── components.css        # Reusable UI components
│   └── views/
│       ├── memory-map.css
│       ├── timeline.css
│       ├── genre-filter.css
│       └── prompts.css
├── js/
│   ├── app.js                # Main application controller
│   ├── data/
│   │   ├── project-manager.js    # Project CRUD, localStorage
│   │   ├── memory-model.js       # Memory data structure
│   │   └── export-import.js      # JSON export/import
│   ├── views/
│   │   ├── memory-map.js         # P5.js memory visualization
│   │   ├── timeline.js           # Timeline builder
│   │   ├── genre-filter.js       # Genre logic & UI
│   │   └── scene-prompts.js      # Prompt generator
│   ├── analysis/
│   │   ├── theme-analyzer.js     # Keyword pattern detection
│   │   └── emotional-arc.js      # Arc calculations
│   ├── ui/
│   │   ├── navigation.js         # Sidebar & routing
│   │   ├── modals.js            # Forms & dialogs
│   │   └── notifications.js      # User feedback
│   └── utils/
│       ├── helpers.js            # Utility functions
│       ├── constants.js          # Genre definitions, prompts
│       └── demo-data.js          # Sample memoir for demo mode
├── libs/
│   └── p5.min.js             # P5.js library (CDN or local)
├── assets/
│   ├── images/               # Icons, placeholders
│   └── fonts/                # Optional custom fonts
├── README.md                 # User documentation
├── CLAUDE.md                 # Development documentation
└── PLAN.md                   # This file
```

#### Data Models

**Project Structure**:
```javascript
{
  id: "uuid-v4",
  title: "My Memoir",
  created: 1699564800000,      // Unix timestamp
  modified: 1699651200000,
  memories: [Memory],           // Array of memory objects
  connections: [                // Connections between memories
    {from: "memory-id-1", to: "memory-id-2", strength: 7}
  ],
  timelineStructure: {
    acts: [                     // User-defined acts (Phase 2)
      {title: "Act I", memoryIds: ["id1", "id2"]}
    ],
    currentOrder: ["id1", "id2", "id3"]  // Current arrangement
  }
}
```

**Memory Structure**:
```javascript
{
  id: "uuid-v4",
  title: "Summer of '92",
  narrative: "The full text of the memory...",
  datePeriod: {
    year: 1992,
    season: "summer",           // or month/day
    precision: "approximate"    // or "exact"
  },
  emotionalTone: 7,             // -5 (very negative) to +5 (very positive)
  sensoryDetails: {
    sights: ["golden wheat fields", "red barn"],
    sounds: ["cicadas", "screen door"],
    smells: ["fresh cut grass", "motor oil"],
    textures: ["rough wood", "cool water"],
    tastes: ["lemonade", "dust"]
  },
  themes: {
    userTags: ["freedom", "childhood", "loss"],
    suggestedTags: ["transition", "independence"]  // From keyword analysis
  },
  characters: ["Mom", "Jake", "Uncle Robert"],
  location: "Family farm, rural Iowa",
  notes: "This was the last summer before the farm was sold...",
  images: [],                   // For style visualizations (Phase 3)
  position: {x: 150, y: 200}   // Position on memory map
}
```

**Genre Definition Structure**:
```javascript
const GENRES = {
  "hero-journey": {
    name: "Hero's Journey",
    description: "The classic monomyth structure",
    stages: [
      {name: "Ordinary World", description: "Life before the journey"},
      {name: "Call to Adventure", description: "The inciting incident"},
      // ... 10 more stages
    ],
    emotionalArc: "u-shape",    // Visual arc pattern
    memoryPriority: [           // What to highlight
      "transformation",
      "challenge",
      "mentor",
      "threshold"
    ],
    prompts: [
      "What was your ordinary world before everything changed?",
      "Who served as your mentor or guide?",
      // ... more prompts
    ],
    color: "#D97706"            // Topaz gold
  },
  "sci-fi": {
    name: "Sci-Fi Memoir",
    description: "Technology and systems as narrative framework",
    stages: [
      {name: "Setup/Technology", description: "The system as it was"},
      {name: "Discovery/Wonder", description: "New possibilities emerge"},
      {name: "Complication/System", description: "The system reveals complexity"},
      {name: "Crisis/Glitch", description: "Everything breaks down"},
      {name: "Resolution/Upgrade", description: "New understanding emerges"}
    ],
    emotionalArc: "exploratory",
    memoryPriority: [
      "discovery",
      "system-change",
      "paradigm-shift",
      "technology"
    ],
    prompts: [
      "What technology or system shaped this moment?",
      "How did systems fail or evolve?",
      "What future did you imagine from here?",
      "What discovery changed everything?"
    ],
    color: "#1E3A8A"            // Sapphire blue
  },
  "literary-fiction": {
    name: "Literary Fiction",
    description: "Subtle, interior, language-focused",
    stages: [
      {name: "Establishing Atmosphere", description: "The world in detail"},
      {name: "Character Revelation", description: "Who we really are"},
      {name: "Complication", description: "Quiet conflicts emerge"},
      {name: "Moment of Truth", description: "Subtle recognition"},
      {name: "Resonance/Ambiguity", description: "Questions linger"}
    ],
    emotionalArc: "subtle-wave",
    memoryPriority: [
      "interior-conflict",
      "relationship",
      "epiphany",
      "symbolic-moment"
    ],
    prompts: [
      "What went unsaid in this moment?",
      "Describe the quality of light",
      "What small detail held unexpected meaning?",
      "What did you notice that others missed?"
    ],
    color: "#0F5257"            // Deep emerald
  }
};
```

#### Technology Stack
- **HTML5**: Semantic markup
- **CSS3**: Grid, Flexbox, Custom Properties
- **Vanilla JavaScript (ES6+)**: No frameworks, compatible with older browsers
- **P5.js**: Canvas-based visualizations (memory map, timeline animations)
- **localStorage API**: Client-side persistence
- **Browser Compatibility**: Chrome 60+, Firefox 55+, Safari 11+, Edge 79+

#### Design System

**Color Palette (Gem Tones)**:
```css
:root {
  /* Primary Colors */
  --color-emerald: #0F5257;      /* Deep emerald */
  --color-sapphire: #1E3A8A;     /* Sapphire blue */
  --color-amethyst: #7C3AED;     /* Amethyst purple */
  --color-ruby: #BE123C;         /* Ruby red */
  --color-topaz: #D97706;        /* Topaz gold */

  /* Neutrals */
  --color-charcoal: #1F2937;     /* Dark text */
  --color-slate: #64748B;        /* Secondary text */
  --color-pearl: #F1F5F9;        /* Light backgrounds */
  --color-white: #FFFFFF;

  /* Emotional Scale (for memory visualization) */
  --emotion-very-negative: #1E3A8A;   /* Cool sapphire */
  --emotion-negative: #0891B2;        /* Teal */
  --emotion-neutral: #64748B;         /* Slate gray */
  --emotion-positive: #D97706;        /* Warm topaz */
  --emotion-very-positive: #BE123C;   /* Warm ruby */
}
```

**Typography**:
- Headings: Serif font (elegant, literary) - Georgia or Playfair Display
- Body: Sans-serif (clean, readable) - System fonts or Inter
- Monospace: For technical/script formats - Consolas or Fira Code

**Spacing System**: 8px base grid
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

**Component Design Principles**:
- Generous whitespace
- Clear visual hierarchy
- Consistent spacing
- Focus on content over chrome
- Minimalist, distraction-free

### Feature Integration Details

#### Genre Filter Affecting Scene Prompts
When a genre is selected, the scene prompt system automatically filters and prioritizes prompts relevant to that genre's conventions.

Example - Noir genre selected:
- Timeline highlights: Betrayals, moral ambiguity, fateful decisions
- Scene prompts: "Describe the moment you realized the truth", "What shadows concealed", "The rain that night..."
- Sensory emphasis: Visual contrasts, atmospheric sounds, smoke/fog imagery

#### Thematic Threads Informing Timeline (Phase 2)
When themes are identified through user tags or keyword analysis:
- Timeline offers "Group by Theme" view option
- Memories with shared themes cluster together visually
- Thread lines connect thematically related memories
- Suggested act structure based on theme progression
- Example: If "water" appears in 5 memories, suggest "Water as metaphor for change" as organizing principle

#### Genre + Style Format Combination (Phase 3)
Users can combine genre filters with style formats:
- "Thriller" + "Comic Book Panels":
  - Panels emphasize cliffhangers, reveals, action
  - Layout uses dramatic angles, close-ups, splash pages
  - Pacing: Rapid panel sequences for tension
  - Color scheme: High contrast, dramatic shadows

---

## Phase 2 - Enhanced Visualization & Analysis

### Additional Features

#### Complete Genre Filters (Add 5 More)
1. **Thriller**: Rising tension, revelations, cliffhangers
2. **Noir**: Moral ambiguity, fate, cynicism, atmosphere
3. **Romance Arc**: Connection, obstacles, transformation through love
4. **Magical Realism**: Everyday magic, cultural memory, liminal spaces
5. **Horror**: Dread, transgression, confronting the unspeakable

Each with full structure templates, prompts, and visualization styles.

#### Thematic Thread Identification
- **Keyword Analysis Engine**:
  - Scans narrative text for recurring words, images, metaphors
  - Identifies patterns across memories
  - Suggests thematic connections
- **Visual Thread Display**:
  - Colored threads on memory map connecting related memories
  - Thread strength based on frequency/similarity
  - Filter view by specific themes
- **Pattern Suggestions**:
  - "You mention 'water' in 5 memories - explore this as metaphor?"
  - "Recurring question: 'Where do I belong?'"
  - "Image pattern: Doorways and thresholds"

#### Advanced Timeline Builder
- **Act/Movement Organization**: User-defined story structure
- **Multiple Timeline Views**:
  - Chronological (actual time order)
  - Narrative (story order)
  - Thematic (grouped by theme)
  - Emotional (ordered by arc)
- **Tension/Conflict Tracking**: Graph showing rising/falling dramatic tension
- **Character Appearance Timeline**: Track when people appear in the story

#### Enhanced Scene Crafting Tools
- **Specificity Analyzer**: Flags vague language, suggests concrete details
- **"Show Don't Tell" Suggestions**: Identifies telling, proposes showing alternatives
- **Sensory Detail Library**: Expanded database of sensory experiences by category
- **Dialogue Tools**: Helps craft authentic memoir dialogue

---

## Phase 3 - Style Visualizations (Format Mockups)

### Batch 1: Visual Formats

#### 1. Comic Book Panels
- 6-panel grid layouts (classic comic structure)
- Memory → panel conversion
- Stock image integration or user uploads
- Caption/dialogue placement tools
- Panel transition effects
- Page layout templates

#### 2. Illustrated Vignettes
- Card-based layout design
- Text + image pairings
- Minimalist illustration style
- Expandable cards for full text
- Gallery view of all vignettes
- Export as image series

### Batch 2: Interactive Formats

#### 3. Interactive Fiction Branching
- Choice-based navigation tree
- "What if?" alternative paths
- Consequence mapping
- Semi-functional preview (clickable choices)
- Twine-style visualization
- Export to playable HTML

#### 4. Graphic Novel Layouts
- Full-page and two-page spreads
- Variable panel arrangements
- Typography integration
- Dramatic pacing control
- Splash page templates
- Chapter/section breaks

### Batch 3: Documentary & Experimental Formats

#### 5. Documentary/Photo Essay
- Magazine-style layout
- Image-heavy design (user provides photos)
- Caption integration
- Timeline/chronology markers
- "Before/After" split views
- Print-ready PDF export

#### 6. Epistolary Fragments
- Letter/journal format
- Date stamping and headers
- Multiple "correspondents"
- Handwriting-style fonts
- Envelope/paper textures
- Reveal/fade animations

#### 7. Audio/Podcast Script Format
- Professional script formatting
- Scene/segment breakdown
- Timing estimates (reading pace)
- Music/sound cues
- Host/narrator notes
- Export as PDF script

### Format Features
All formats include:
- Live preview as user adds/edits memories
- Export functionality (images, PDFs, HTML)
- Customization options (colors, fonts, layouts)
- Format-specific craft guidance
- Genre-aware styling (thriller comic looks different than literary fiction comic)

---

## Technical Implementation Notes

### Performance Considerations
- Target: ~50-100 memories per project (typical user workflow)
- Lazy load format visualizations (only render when viewed)
- Debounce auto-save (save 2 seconds after last edit)
- Efficient P5.js rendering (only redraw on change)
- IndexedDB fallback if localStorage quota exceeded (future consideration)

### Accessibility
- Keyboard navigation throughout
- ARIA labels on interactive elements
- Color contrast meeting WCAG AA standards
- Screen reader friendly
- Focus management in modals

### Responsive Design
- Primary target: Desktop (1280px - 1920px)
- Tablet support: Basic functionality (768px - 1024px)
- Mobile: View-only or limited editing (future consideration)

### Data Management
- Auto-save every 2 seconds during active editing
- Export reminder if user hasn't exported in 7 days
- localStorage warning if approaching quota (5MB typical limit)
- Conflict resolution: Last-write-wins (single-user assumption)

### Browser Storage
- localStorage for primary storage
- Use namespaced keys: `memoir_builder_project_[uuid]`
- Store metadata separately: `memoir_builder_projects_list`
- Implement garbage collection for deleted projects

---

## Development Roadmap

### MVP Timeline (Phase 1)
**Estimated: 2-3 weeks of focused development**

Week 1:
- Days 1-2: Setup, infrastructure, data layer
- Days 3-4: Memory input, project management
- Days 5-7: Memory map (P5.js), basic timeline

Week 2:
- Days 1-3: Genre filter system (3 genres)
- Days 4-5: Scene prompts
- Days 6-7: Demo mode, export/import

Week 3:
- Days 1-3: Polish, cross-browser testing
- Days 4-5: Documentation
- Days 6-7: Deployment, final QA

### Phase 2 Timeline
**Estimated: 2 weeks**
- Week 1: Remaining genres, thematic analysis
- Week 2: Advanced timeline features, enhanced tools

### Phase 3 Timeline
**Estimated: 3-4 weeks (staggered format releases)**
- Week 1-2: Batch 1 formats (comic, vignettes)
- Week 2-3: Batch 2 formats (interactive, graphic novel)
- Week 3-4: Batch 3 formats (documentary, epistolary, audio)

---

## Success Metrics

### MVP Success Criteria
- Users can create and manage multiple projects
- Users can input memories with all required fields
- Memory map displays and allows interaction
- Timeline shows chronological order and emotional arc
- All 3 genre filters function and provide suggestions
- Scene prompts generate relevant content
- Demo mode showcases all features
- Export/import works reliably
- Works across target browsers

### User Experience Goals
- Intuitive without tutorial (though help available)
- Feels exploratory and generative, not restrictive
- Inspires new perspectives on user's own story
- Visually appealing and professional
- Fast and responsive interactions
- Data feels safe and preserved

---

## Future Considerations (Post-Phase 3)

### Potential Features
- Collaboration mode (share projects, get feedback)
- AI-assisted theme identification
- Community template sharing
- Print book integration (POD services)
- Social sharing of public excerpts
- Writer community features
- Guided memoir writing course integration
- Translation/localization
- Mobile app versions

### Technical Debt to Monitor
- localStorage limitations (consider IndexedDB)
- Performance with 200+ memories
- Accessibility audit
- Security review (if adding server features)
- Legacy browser support burden

---

## Deployment

### GitHub Pages Setup
1. Create `gh-pages` branch or use `main` branch
2. Configure repository settings
3. All assets referenced with relative paths
4. Test on live URL before announcing

### Pre-Launch Checklist
- [ ] All MVP features functional
- [ ] Cross-browser testing complete
- [ ] Demo mode working perfectly
- [ ] Documentation complete (README.md)
- [ ] Performance tested with 50+ memories
- [ ] Accessibility review passed
- [ ] No console errors
- [ ] Analytics/tracking (if desired) implemented
- [ ] Social media preview configured (og:tags)
- [ ] Terms of service / privacy policy (if collecting any data)

---

## Documentation Requirements

### README.md Contents
- Project description
- Live demo link
- Features overview
- How to use (quick start)
- Browser requirements
- Local development setup
- License information
- Credits and acknowledgments

### In-App Help
- Contextual tooltips
- Help modal with feature explanations
- Demo mode as interactive tutorial
- Link to documentation/support

---

## License & Credits

### Recommended License
- MIT License (open source, permissive)

### Credits to Include
- P5.js library and Processing Foundation
- Any stock images or icon libraries used
- Font licenses (if using custom fonts)
- Inspiration sources (if any specific memoir craft books/resources)

---

## Notes

This plan prioritizes:
1. **Functionality over perfection** in MVP
2. **User exploration and discovery** over rigid templates
3. **Visual/interactive elements** to differentiate from text-only tools
4. **Flexibility** in how writers approach their memoirs
5. **Incremental delivery** to get feedback early

The tool should feel like a creative partner, not a prescriptive instructor. It opens possibilities rather than narrowing them.
