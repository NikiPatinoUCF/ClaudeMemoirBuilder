# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Tell Your Story: A Crafted Memoir** is an interactive web application that helps memoir writers discover and shape their narratives across multiple formats and genres. Built with vanilla JavaScript, P5.js for visualizations, and designed for GitHub Pages deployment.

## Development Commands

### Local Development
```bash
# Open index.html in a browser directly, or use a simple HTTP server:
python -m http.server 8000
# or
npx http-server .
```

### Testing in Browser
- Open `index.html` in your browser
- Use browser DevTools for debugging
- Check console for errors
- Test localStorage in Application tab

### Deployment to GitHub Pages
```bash
# Ensure all changes are committed
git add .
git commit -m "Your commit message"
git push origin main

# Enable GitHub Pages in repository settings:
# Settings > Pages > Source: main branch, / (root)
```

## Architecture Overview

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Visualization**: P5.js for canvas-based memory maps and timelines
- **Storage**: Browser localStorage API (no backend required)
- **Deployment**: GitHub Pages compatible (static site)

### File Structure
```
/
├── index.html              # Main entry point with all UI structure
├── css/
│   ├── theme.css          # Color system (gem tones), typography, spacing
│   ├── components.css     # Reusable UI components (buttons, modals, cards)
│   ├── main.css           # Layout and view-specific styles
│   └── views/             # View-specific CSS files
├── js/
│   ├── app.js             # Main application controller & initialization
│   ├── data/              # Data models and storage
│   │   ├── memory-model.js    # Memory class with validation
│   │   ├── project-manager.js # localStorage CRUD operations
│   │   └── export-import.js   # JSON export/import functionality
│   ├── ui/                # UI management
│   │   ├── navigation.js      # View switching, routing
│   │   ├── modals.js          # Modal dialogs (project, memory forms)
│   │   └── notifications.js   # Toast notifications
│   ├── views/             # Feature views
│   │   ├── memory-map.js      # P5.js memory graph visualization
│   │   ├── timeline.js        # P5.js timeline with emotional arc
│   │   ├── genre-filter.js    # Genre structure mapping
│   │   └── scene-prompts.js   # Writing prompts generator
│   ├── analysis/          # Data analysis
│   │   ├── theme-analyzer.js  # Keyword/pattern detection
│   │   └── emotional-arc.js   # Arc type calculation
│   └── utils/             # Utilities
│       ├── constants.js       # Genre definitions, sensory library
│       ├── helpers.js         # Utility functions
│       └── demo-data.js       # Sample memoir project
├── README.md              # User documentation
├── PLAN.md               # Detailed implementation plan
└── CLAUDE.md             # This file
```

### Data Flow

1. **User Interaction** → UI Event Handlers (navigation.js, modals.js)
2. **Data Mutation** → ProjectManager (project-manager.js)
3. **Storage** → localStorage with auto-save debouncing
4. **View Updates** → View-specific render functions
5. **Visualization** → P5.js sketches (memory-map.js, timeline.js)

### Key Data Structures

#### Project
```javascript
{
  id: "uuid",
  title: "My Memoir",
  created: timestamp,
  modified: timestamp,
  memories: [Memory],
  connections: [{from, to, strength}],
  timelineStructure: {acts, currentOrder}
}
```

#### Memory
```javascript
{
  id: "uuid",
  title: "Title",
  narrative: "Full text...",
  datePeriod: {year, season, precision},
  emotionalTone: -5 to +5,
  sensoryDetails: {sights, sounds, smells, textures, tastes},
  themes: {userTags, suggestedTags},
  characters: [],
  location: "",
  notes: "",
  images: [],
  position: {x, y}  // For memory map
}
```

### State Management

**Global Instances** (created at module level):
- `projectManager`: Handles all localStorage operations
- `navigation`: Manages view switching and UI state
- `modalManager`: Controls modal dialogs
- `memoryMapView`, `timelineView`, etc.: View controllers

**Current State**:
- `projectManager.currentProject`: Active project
- `navigation.currentView`: Active view name
- Stored in `localStorage`:
  - `memoir_builder_projects`: All projects
  - `memoir_builder_current`: Current project ID

### P5.js Integration

Each P5.js view (memory-map, timeline) creates a sketch instance:

```javascript
this.sketch = new p5((p) => {
  p.setup = () => { /* initialization */ };
  p.draw = () => { /* render loop */ };
  p.mousePressed = () => { /* interactions */ };
}, containerElement);
```

**Important**: Always remove previous sketch before creating new one:
```javascript
if (this.sketch) this.sketch.remove();
```

## Core Components

### 1. Memory Map (memory-map.js)
- Uses P5.js for interactive node graph
- Nodes colored by emotional tone
- Draggable nodes update memory.position
- Connections calculated by `findMemoryConnections()` in helpers.js
- Pan/zoom controls

### 2. Timeline (timeline.js)
- Linear chronological layout
- Emotional arc overlay (calculated by emotional-arc.js)
- Arc types: u-shape, exploratory, subtle-wave, rising, falling, stable
- Hover tooltips for memory details

### 3. Genre Filter (genre-filter.js)
- Three genres in MVP: Hero's Journey, Sci-Fi, Literary Fiction
- Each genre has stages, prompts, and memory priority types
- Distributes memories across genre stages
- Genre definitions in constants.js

### 4. Project Manager (project-manager.js)
- All storage operations use localStorage
- Auto-save with 2-second debounce
- CRUD operations for projects and memories
- Connection auto-generation on memory changes

## Common Development Tasks

### Adding a New Memory Field
1. Update `Memory` class in `memory-model.js`
2. Add form input in `index.html` (memory modal)
3. Update `populateMemoryForm()` in `modals.js`
4. Update `saveMemory()` in `modals.js` to read the field
5. Update `createMemoryCard()` in `navigation.js` if displaying in list

### Adding a New Genre
1. Add genre definition to `GENRES` in `constants.js`
2. Add button in `index.html` (genre selector)
3. Add option to genre filter dropdown in prompts view
4. Genre will automatically appear in filters

### Adding a New View
1. Create view HTML in `index.html` with class "view"
2. Add navigation link with `data-view` attribute
3. Create view CSS in `css/views/`
4. Create view JS in `js/views/`
5. Add case in `navigation.initializeView()`

### Modifying Emotional Color Scale
- Edit `getEmotionColor()` in `constants.js`
- Update CSS variables in `theme.css` if needed
- Color scale: sapphire (very negative) → teal → slate → topaz → ruby (very positive)

### Debugging localStorage Issues
```javascript
// In browser console:
localStorage.getItem('memoir_builder_projects')
localStorage.getItem('memoir_builder_current')
localStorage.clear()  // Warning: deletes all data
getStorageInfo()      // Check usage
```

## Design System

### Color Palette (Gem Tones)
```css
--color-emerald: #0F5257    /* Primary */
--color-sapphire: #1E3A8A   /* Secondary */
--color-amethyst: #7C3AED   /* Accent */
--color-ruby: #BE123C       /* Accent */
--color-topaz: #D97706      /* Accent */
```

### Spacing (8px Grid)
```css
--space-xs: 4px
--space-sm: 8px
--space-md: 16px
--space-lg: 24px
--space-xl: 32px
--space-2xl: 48px
```

### Typography
- Headings: Serif (Georgia)
- Body: Sans-serif (System fonts)
- Font sizes: 12px to 36px in scale

## Important Patterns

### Auto-save Pattern
```javascript
// In project-manager.js
autoSave = debounce(() => {
  if (this.currentProject) {
    this.saveProject(this.currentProject);
  }
}, 2000);
```

### View Refresh Pattern
```javascript
// After data changes
if (window.app) {
  window.app.refreshCurrentView();
}
```

### Notification Pattern
```javascript
showNotification('Message', 'success'); // or 'error', 'info'
```

### Modal Pattern
```javascript
modalManager.openMemoryModal();      // Add new
modalManager.openMemoryModal(id);    // Edit existing
```

## Testing Considerations

### Manual Testing Checklist
- [ ] Create new project
- [ ] Add memory with all fields
- [ ] Edit existing memory
- [ ] Delete memory
- [ ] View memory map (drag nodes, zoom, pan)
- [ ] View timeline (check emotional arc)
- [ ] Try all three genre filters
- [ ] Generate sensory details
- [ ] Export project
- [ ] Import project
- [ ] Switch between projects
- [ ] Try demo project

### Edge Cases to Test
- Empty project (no memories)
- Single memory
- Many memories (50+)
- localStorage quota exceeded
- Invalid JSON import
- Memory with minimal data (only title)
- Memory with all fields filled

### Browser Testing
- Chrome (primary)
- Firefox
- Safari
- Edge
- Test with DevTools in mobile view

## Known Limitations

1. **localStorage**: 5MB limit, cleared with browser data
2. **No Cloud Sync**: Data only on local device
3. **P5.js Performance**: May slow with 100+ memories
4. **Desktop-Focused**: Mobile UX is limited
5. **No Image Upload**: Placeholders only in MVP
6. **Simple Genre Mapping**: Not AI-powered, uses distribution algorithm

## Future Development (Phase 2 & 3)

See PLAN.md for full roadmap. Key additions:
- 5 more genre filters
- Thematic thread visualization
- Style format mockups (comic panels, graphic novels, etc.)
- Advanced timeline with acts/movements
- Keyword analysis improvements
- Mobile optimization

## Troubleshooting

### Canvas Not Rendering
- Check if P5.js loaded: `typeof p5` in console
- Check if container exists: `document.getElementById('memoryMapCanvas')`
- Check for previous sketch: Always call `sketch.remove()` before creating new

### Data Not Saving
- Check localStorage availability: `typeof localStorage !== 'undefined'`
- Check for quota errors in console
- Verify auto-save is being called: Add console.log in `autoSave()`

### Modal Not Opening
- Check if modal HTML exists with correct ID
- Check if `modalManager` is initialized
- Look for JavaScript errors in console

### View Not Switching
- Check `data-view` attribute matches view ID
- Verify view has `id="[name]View"` in HTML
- Check if project is loaded (required for most views)

## Code Style

- Use ES6+ features (const/let, arrow functions, classes)
- Prefer template literals for HTML strings
- Use `escapeHtml()` for user-generated content in HTML
- Comment complex algorithms
- Keep functions small and single-purpose
- Use meaningful variable names

## Performance Notes

- Debounce expensive operations (auto-save, analysis)
- Only render visible views (P5.js sketches)
- Limit P5.js draw() redraws (check if data changed)
- Use `remove()` to clean up P5.js instances
- Cache DOM queries when possible

---

This documentation should help you quickly understand and modify the codebase. For detailed implementation plan, see PLAN.md. For user documentation, see README.md.
