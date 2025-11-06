// Scene Prompts View

class ScenePromptsView {
    constructor() {
        this.selectedGenre = '';
        this.setupControls();
    }

    setupControls() {
        const genreSelect = document.getElementById('genreFilterSelect');
        if (genreSelect) {
            genreSelect.addEventListener('change', (e) => {
                this.selectedGenre = e.target.value;
                this.render();
            });
        }

        // Sensory generator buttons
        const sensoryButtons = document.querySelectorAll('.sensory-btn');
        sensoryButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const sense = btn.getAttribute('data-sense');
                this.generateSensoryDetails(sense);
            });
        });
    }

    render() {
        const project = projectManager.getCurrentProject();
        const content = document.getElementById('promptsContent');
        if (!content) return;

        // Get prompts based on selected genre or all genres
        let prompts = [];

        if (this.selectedGenre) {
            const genre = GENRES[this.selectedGenre];
            if (genre) {
                prompts = genre.prompts.map(prompt => ({
                    genre: genre.name,
                    text: prompt,
                    color: genre.color
                }));
            }
        } else {
            // Show prompts from all genres
            Object.values(GENRES).forEach(genre => {
                genre.prompts.slice(0, 3).forEach(prompt => {
                    prompts.push({
                        genre: genre.name,
                        text: prompt,
                        color: genre.color
                    });
                });
            });
        }

        // Render prompts
        let html = '';
        prompts.forEach(prompt => {
            html += `
                <div class="prompt-item" style="border-left-color: ${prompt.color}">
                    <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 8px;">
                        ${prompt.genre}
                    </div>
                    <p class="prompt-text">${prompt.text}</p>
                </div>
            `;
        });

        if (prompts.length === 0) {
            html = '<p class="empty-state">No prompts available</p>';
        }

        content.innerHTML = html;
    }

    generateSensoryDetails(sense) {
        const output = document.getElementById('sensoryOutput');
        if (!output) return;

        const details = SENSORY_LIBRARY[sense];
        if (!details) return;

        const selected = getRandomItems(details, 5);

        output.classList.add('active');
        output.innerHTML = `
            <strong>${sense.charAt(0).toUpperCase() + sense.slice(1)}:</strong><br>
            ${selected.join('<br>')}
        `;
    }
}

// Global instance
const promptsView = new ScenePromptsView();
