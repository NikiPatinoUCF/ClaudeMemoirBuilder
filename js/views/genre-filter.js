// Genre Filter View

class GenreFilterView {
    constructor() {
        this.selectedGenre = null;
        this.setupControls();
    }

    setupControls() {
        const genreButtons = document.querySelectorAll('.genre-btn');
        genreButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const genreId = btn.getAttribute('data-genre');
                this.selectGenre(genreId);
            });
        });
    }

    render() {
        const project = projectManager.getCurrentProject();
        if (!project || project.memories.length === 0) {
            const content = document.getElementById('genreContent');
            if (content) {
                content.innerHTML = '<p class="empty-state">Add memories to explore genre perspectives</p>';
            }
            return;
        }

        // If no genre selected yet, select first one
        if (!this.selectedGenre) {
            this.selectGenre('hero-journey');
        }
    }

    selectGenre(genreId) {
        this.selectedGenre = genreId;

        // Update button states
        document.querySelectorAll('.genre-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-genre') === genreId) {
                btn.classList.add('active');
            }
        });

        // Render genre content
        this.renderGenreContent(genreId);
    }

    renderGenreContent(genreId) {
        const genre = GENRES[genreId];
        if (!genre) return;

        const project = projectManager.getCurrentProject();
        const content = document.getElementById('genreContent');
        if (!content) return;

        // Build HTML
        let html = `
            <div class="genre-header">
                <h3>${genre.name}</h3>
                <p>${genre.description}</p>
            </div>
        `;

        // Show genre structure with mapped memories
        html += '<div class="genre-structure">';

        genre.stages.forEach((stage, index) => {
            html += `
                <div class="genre-stage">
                    <div class="genre-stage-title">${index + 1}. ${stage.name}</div>
                    <div class="genre-stage-description">${stage.description}</div>
                    <div class="genre-stage-memories">
                        ${this.getMemoriesForStage(project.memories, genre, index)}
                    </div>
                </div>
            `;
        });

        html += '</div>';

        // Add prompts section
        html += '<div class="genre-prompts" style="margin-top: 2rem;">';
        html += '<h4>Writing Prompts for ' + genre.name + '</h4>';
        html += '<div class="prompts-grid">';

        genre.prompts.forEach(prompt => {
            html += `
                <div class="prompt-item">
                    <p class="prompt-text">${prompt}</p>
                </div>
            `;
        });

        html += '</div></div>';

        content.innerHTML = html;
    }

    getMemoriesForStage(memories, genre, stageIndex) {
        // Simple algorithm: distribute memories across stages
        // In a more sophisticated version, this would use AI or pattern matching

        const memoriesPerStage = Math.ceil(memories.length / genre.stages.length);
        const stageMemories = memories.slice(
            stageIndex * memoriesPerStage,
            (stageIndex + 1) * memoriesPerStage
        );

        if (stageMemories.length === 0) {
            return '<span class="tag">No memories yet - this could be developed</span>';
        }

        return stageMemories.map(memory => {
            const color = memory.getEmotionColor();
            return `
                <div class="genre-stage-memory" style="border-left: 3px solid ${color}">
                    ${escapeHtml(memory.title)}
                </div>
            `;
        }).join('');
    }

    // Map memories to genre structure intelligently
    mapMemoriesToGenre(memories, genre) {
        // This is a simplified version
        // A more sophisticated version would analyze themes, emotions, and content

        const sorted = sortMemoriesByDate(memories);
        const mapping = {};

        genre.stages.forEach((stage, index) => {
            mapping[stage.name] = [];
        });

        // Distribute memories across stages
        sorted.forEach((memory, index) => {
            const stageIndex = Math.floor((index / sorted.length) * genre.stages.length);
            const stage = genre.stages[Math.min(stageIndex, genre.stages.length - 1)];
            mapping[stage.name].push(memory);
        });

        return mapping;
    }
}

// Global instance
window.genreFilterView = new GenreFilterView();
