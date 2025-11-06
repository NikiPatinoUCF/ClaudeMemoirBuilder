# Tell Your Story: A Crafted Memoir

An interactive web application that helps memoir writers discover and shape their narratives across multiple formats and genres.

## Live Demo

[View Live Site](#) (Update with GitHub Pages URL after deployment)

## Features

### 1. Interactive Memory Mapping
- Visual node-based map of your significant life moments
- Drag-and-drop positioning
- Color-coded by emotional tone
- Auto-generated connections based on shared themes, characters, and locations
- Zoom and pan navigation

### 2. Timeline Builder with Emotional Arc
- Chronological visualization of your memories
- Emotional arc graph overlay
- Automatic arc type detection (U-shape, exploratory, rising, falling, etc.)
- Interactive tooltips with memory details

### 3. Genre Filters
Explore how your memoir reads through different narrative conventions:
- **Hero's Journey**: Classic 12-stage transformational arc
- **Sci-Fi Memoir**: Technology and systems as narrative framework
- **Literary Fiction**: Subtle, interior, language-focused narrative

Each genre provides:
- Structural stage recommendations
- Memory reorganization suggestions
- Genre-specific writing prompts
- Emotional arc adjustments

### 4. Scene Crafting Prompts
- Genre-filtered writing prompts
- Sensory detail generators (sights, sounds, smells, textures, tastes)
- Inspiration for deepening your narrative

### 5. Memory Management
Capture comprehensive details for each memory:
- Title and full narrative text
- Date/time period with precision indicator
- Emotional tone (scale from -5 to +5)
- Sensory details across five categories
- Themes and tags
- Characters and locations
- Additional notes

### 6. Data Management
- Auto-save to browser localStorage
- Export projects as JSON files
- Import previously exported projects
- Multiple project support
- Demo project with sample data

## Getting Started

### Try the Demo
1. Visit the site
2. Click "Try Demo" to explore a sample memoir project
3. Interact with all features to understand the tool

### Create Your Own Project
1. Click "Create New Project"
2. Name your project
3. Start adding memories using the "Add Memory" button
4. Explore different views: Memory Map, Timeline, Genre Filters, Prompts

### Add a Memory
1. Click "Add Memory" from the Memories view
2. Fill in the details:
   - **Title**: Brief description (required)
   - **Narrative**: The full story (optional but recommended)
   - **Date**: Year, season/month, precision
   - **Emotional Tone**: Slider from very negative (-5) to very positive (+5)
   - **Sensory Details**: What you saw, heard, smelled, touched, tasted
   - **Themes**: Tags to categorize (comma-separated)
   - **Characters**: People involved
   - **Location**: Where it happened
   - **Notes**: Additional context
3. Click "Save Memory"

### Navigate Views
- **Memories**: Grid view of all your memories
- **Memory Map**: Visual graph showing connections
- **Timeline**: Chronological view with emotional arc
- **Genre Filters**: See your story through different narrative lenses
- **Scene Prompts**: Get writing inspiration

### Export Your Work
1. Click "Export Project" in the sidebar
2. Save the JSON file to your computer
3. Use this file to back up your work or transfer between devices

### Import a Project
1. Click "Import Project"
2. Select a previously exported JSON file
3. The project will be added to your projects list

## Browser Compatibility

Tested and supported on:
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Data Privacy

All your data is stored locally in your browser using localStorage. Nothing is sent to any server. Your memories are private and stay on your device.

**Important**:
- Clear browser data will delete your projects
- Export regularly to back up your work
- localStorage typically has a 5MB limit

## Technology Stack

- HTML5, CSS3, JavaScript (ES6+)
- [P5.js](https://p5js.org/) for interactive visualizations
- No backend - runs entirely in the browser
- GitHub Pages compatible

## Tips for Best Results

1. **Start with key moments**: Focus on 5-10 significant memories first
2. **Be specific in sensory details**: The more concrete, the more vivid
3. **Use tags consistently**: This helps with thematic analysis
4. **Try different genres**: You might be surprised by new perspectives
5. **Export regularly**: Protect your work with backups
6. **Use prompts for inspiration**: When stuck, explore the Scene Prompts view

## Limitations

- No collaborative features (single-user only)
- No cloud sync (localStorage only)
- No image uploads in MVP (placeholder support for future)
- No AI-powered analysis (pattern detection is rule-based)
- Desktop-focused (mobile view is limited)

## Future Enhancements

Planned features for future versions:
- Additional genre filters (Thriller, Noir, Romance, Magical Realism, Horror)
- Advanced thematic thread identification with keyword analysis
- Style visualizations (comic panels, graphic novels, interactive fiction, etc.)
- Act/movement organization for timeline
- More sophisticated genre-to-memory mapping
- Mobile-optimized views
- Export to PDF/text formats

## Contributing

This is an open-source project. Contributions welcome! Please see PLAN.md for the development roadmap.

## License

MIT License - See LICENSE file for details

## Credits

- Built with [P5.js](https://p5js.org/)
- Inspired by memoir craft practices and narrative theory
- Created as a tool for writers exploring their stories

## Support

For bugs or feature requests, please open an issue on GitHub.

---

**Tell Your Story. Your Way.**
