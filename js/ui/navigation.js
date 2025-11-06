// Navigation and View Management

class Navigation {
    constructor() {
        this.currentView = 'welcome';
        this.setupNavigation();
        this.setupProjectSelector();
        this.setupButtons();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const viewName = link.getAttribute('data-view');
                this.switchView(viewName);
            });
        });
    }

    setupProjectSelector() {
        const projectSelect = document.getElementById('projectSelect');
        if (projectSelect) {
            projectSelect.addEventListener('change', (e) => {
                const projectId = e.target.value;
                if (projectId) {
                    this.loadProject(projectId);
                } else {
                    this.showWelcome();
                }
            });
        }
    }

    setupButtons() {
        // Welcome screen buttons
        const tryDemoBtn = document.getElementById('tryDemoBtn');
        const createProjectBtn = document.getElementById('createProjectBtn');
        const importProjectBtn = document.getElementById('importProjectBtn');

        if (tryDemoBtn) {
            tryDemoBtn.addEventListener('click', () => this.loadDemo());
        }

        if (createProjectBtn) {
            createProjectBtn.addEventListener('click', () => {
                modalManager.openNewProjectModal();
            });
        }

        if (importProjectBtn) {
            importProjectBtn.addEventListener('click', () => this.importProject());
        }

        // Export/Import buttons
        const exportBtn = document.getElementById('exportBtn');
        const importBtn = document.getElementById('importBtn');
        const fileInput = document.getElementById('fileInput');

        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                const project = projectManager.getCurrentProject();
                if (project) {
                    ExportImport.exportProject(project);
                } else {
                    showNotification('No project to export', 'error');
                }
            });
        }

        if (importBtn) {
            importBtn.addEventListener('click', () => {
                fileInput.click();
            });
        }

        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    ExportImport.importProject(file, (project) => {
                        this.refreshProjectSelector();
                        this.loadProject(project.id);
                    });
                }
                // Clear input so same file can be imported again
                e.target.value = '';
            });
        }
    }

    switchView(viewName) {
        // Check if project is loaded
        if (!projectManager.getCurrentProject()) {
            if (viewName !== 'welcome') {
                showNotification('Please create or load a project first', 'info');
                return;
            }
        }

        // Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        // Show selected view
        const view = document.getElementById(`${viewName}View`);
        if (view) {
            view.classList.add('active');
            this.currentView = viewName;
        }

        // Update nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-view') === viewName) {
                link.classList.add('active');
            }
        });

        // Trigger view-specific initialization
        this.initializeView(viewName);
    }

    initializeView(viewName) {
        const project = projectManager.getCurrentProject();
        if (!project) return;

        switch(viewName) {
            case 'memories':
                this.renderMemoriesList();
                break;
            case 'memory-map':
                if (window.memoryMapView) {
                    window.memoryMapView.render();
                }
                break;
            case 'timeline':
                if (window.timelineView) {
                    window.timelineView.render();
                }
                break;
            case 'genre-filter':
                if (window.genreFilterView) {
                    window.genreFilterView.render();
                }
                break;
            case 'prompts':
                if (window.promptsView) {
                    window.promptsView.render();
                }
                break;
        }
    }

    showWelcome() {
        projectManager.clearCurrentProject();
        this.switchView('welcome');
        this.refreshProjectSelector();
    }

    loadProject(projectId) {
        const project = projectManager.setCurrentProject(projectId);
        if (project) {
            this.refreshProjectSelector();
            this.switchView('memories');
            showNotification(`Loaded: ${project.title}`, 'success');
        }
    }

    loadDemo() {
        const demoProject = ExportImport.loadDemoProject();
        this.refreshProjectSelector();
        this.loadProject(demoProject.id);
    }

    importProject() {
        document.getElementById('fileInput').click();
    }

    refreshProjectSelector() {
        const projectSelect = document.getElementById('projectSelect');
        if (!projectSelect) return;

        const projects = projectManager.getAllProjects();
        const currentProject = projectManager.getCurrentProject();

        // Clear current options
        projectSelect.innerHTML = '<option value="">Select Project...</option>';

        // Add project options
        projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = `${project.title} (${project.memoryCount} memories)`;
            if (currentProject && currentProject.id === project.id) {
                option.selected = true;
            }
            projectSelect.appendChild(option);
        });
    }

    renderMemoriesList() {
        const container = document.getElementById('memoriesList');
        if (!container) return;

        const project = projectManager.getCurrentProject();
        if (!project || project.memories.length === 0) {
            container.innerHTML = '<p class="empty-state">No memories yet. Click "Add Memory" to get started!</p>';
            return;
        }

        // Sort by date
        const sorted = sortMemoriesByDate(project.memories);

        container.innerHTML = '';
        sorted.forEach(memory => {
            const card = this.createMemoryCard(memory);
            container.appendChild(card);
        });
    }

    createMemoryCard(memory) {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.onclick = () => modalManager.openMemoryModal(memory.id);

        const header = document.createElement('div');
        header.className = 'memory-card-header';

        const title = document.createElement('h3');
        title.className = 'memory-title';
        title.textContent = memory.title;

        const emotion = document.createElement('div');
        emotion.className = 'memory-emotion';
        emotion.style.backgroundColor = memory.getEmotionColor();
        emotion.title = `Emotional tone: ${memory.emotionalTone}`;

        header.appendChild(title);
        header.appendChild(emotion);
        card.appendChild(header);

        const date = document.createElement('div');
        date.className = 'memory-date';
        date.textContent = memory.getFormattedDate();
        card.appendChild(date);

        if (memory.narrative) {
            const excerpt = document.createElement('p');
            excerpt.className = 'memory-excerpt';
            excerpt.textContent = memory.getExcerpt();
            card.appendChild(excerpt);
        }

        if (memory.themes.userTags.length > 0) {
            const tags = document.createElement('div');
            tags.className = 'memory-tags';
            memory.themes.userTags.forEach(tag => {
                const tagEl = document.createElement('span');
                tagEl.className = 'tag';
                tagEl.textContent = tag;
                tags.appendChild(tagEl);
            });
            card.appendChild(tags);
        }

        const actions = document.createElement('div');
        actions.className = 'memory-actions';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-small btn-secondary';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            this.deleteMemory(memory.id);
        };

        actions.appendChild(deleteBtn);
        card.appendChild(actions);

        return card;
    }

    deleteMemory(memoryId) {
        if (confirm('Are you sure you want to delete this memory?')) {
            projectManager.deleteMemory(memoryId);
            this.renderMemoriesList();
            showNotification('Memory deleted', 'success');
        }
    }

    refreshCurrentView() {
        this.initializeView(this.currentView);
    }
}

// Global instance
const navigation = new Navigation();
