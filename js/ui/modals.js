// Modal Management

class ModalManager {
    constructor() {
        this.currentMemoryId = null;
        this.setupModalHandlers();
    }

    setupModalHandlers() {
        // New Project Modal
        const newProjectModal = document.getElementById('newProjectModal');
        const newProjectBtn = document.getElementById('newProjectBtn');
        const createProjectBtn = document.getElementById('createProjectBtn');
        const createProjectConfirmBtn = document.getElementById('createProjectConfirmBtn');
        const cancelProjectBtn = document.getElementById('cancelProjectBtn');

        if (newProjectBtn) {
            newProjectBtn.addEventListener('click', () => this.openNewProjectModal());
        }

        if (createProjectBtn) {
            createProjectBtn.addEventListener('click', () => this.openNewProjectModal());
        }

        if (createProjectConfirmBtn) {
            createProjectConfirmBtn.addEventListener('click', () => this.createNewProject());
        }

        if (cancelProjectBtn) {
            cancelProjectBtn.addEventListener('click', () => this.closeModal('newProjectModal'));
        }

        // Memory Modal
        const memoryModal = document.getElementById('memoryModal');
        const addMemoryBtn = document.getElementById('addMemoryBtn');
        const saveMemoryBtn = document.getElementById('saveMemoryBtn');
        const cancelMemoryBtn = document.getElementById('cancelMemoryBtn');

        if (addMemoryBtn) {
            addMemoryBtn.addEventListener('click', () => this.openMemoryModal());
        }

        if (saveMemoryBtn) {
            saveMemoryBtn.addEventListener('click', () => this.saveMemory());
        }

        if (cancelMemoryBtn) {
            cancelMemoryBtn.addEventListener('click', () => this.closeModal('memoryModal'));
        }

        // Close modals on X button click
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // Close modals on outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // Update emotional tone display
        const emotionalTone = document.getElementById('emotionalTone');
        const toneValue = document.getElementById('toneValue');
        if (emotionalTone && toneValue) {
            emotionalTone.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                let label = 'Neutral';
                if (value <= -4) label = 'Very Negative';
                else if (value <= -2) label = 'Negative';
                else if (value >= 4) label = 'Very Positive';
                else if (value >= 2) label = 'Positive';
                toneValue.textContent = `${label} (${value})`;
            });
        }
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    }

    openNewProjectModal() {
        document.getElementById('projectTitle').value = '';
        this.openModal('newProjectModal');
        // Focus on input
        setTimeout(() => document.getElementById('projectTitle').focus(), 100);
    }

    createNewProject() {
        const titleInput = document.getElementById('projectTitle');
        const title = titleInput.value.trim();

        if (!title) {
            showNotification('Please enter a project title', 'error');
            return;
        }

        const project = projectManager.createProject(title);
        this.closeModal('newProjectModal');

        // Refresh UI
        if (window.app) {
            window.app.loadProject(project.id);
        }

        showNotification(`Project "${title}" created!`, 'success');
    }

    openMemoryModal(memoryId = null) {
        this.currentMemoryId = memoryId;

        const modalTitle = document.getElementById('memoryModalTitle');
        const form = document.getElementById('memoryForm');

        if (memoryId) {
            // Edit existing memory
            modalTitle.textContent = 'Edit Memory';
            const memory = projectManager.currentProject.memories.find(m => m.id === memoryId);
            if (memory) {
                this.populateMemoryForm(memory);
            }
        } else {
            // Add new memory
            modalTitle.textContent = 'Add Memory';
            form.reset();
            document.getElementById('emotionalTone').value = 0;
            document.getElementById('toneValue').textContent = 'Neutral (0)';
            document.getElementById('memoryPrecision').value = 'approximate';
        }

        this.openModal('memoryModal');
        // Focus on title input
        setTimeout(() => document.getElementById('memoryTitle').focus(), 100);
    }

    populateMemoryForm(memory) {
        document.getElementById('memoryTitle').value = memory.title;
        document.getElementById('memoryNarrative').value = memory.narrative;
        document.getElementById('memoryYear').value = memory.datePeriod.year || '';
        document.getElementById('memorySeason').value = memory.datePeriod.season || '';
        document.getElementById('memoryPrecision').value = memory.datePeriod.precision || 'approximate';
        document.getElementById('emotionalTone').value = memory.emotionalTone;

        // Update tone label
        const value = memory.emotionalTone;
        let label = 'Neutral';
        if (value <= -4) label = 'Very Negative';
        else if (value <= -2) label = 'Negative';
        else if (value >= 4) label = 'Very Positive';
        else if (value >= 2) label = 'Positive';
        document.getElementById('toneValue').textContent = `${label} (${value})`;

        document.getElementById('sights').value = joinWithCommas(memory.sensoryDetails.sights);
        document.getElementById('sounds').value = joinWithCommas(memory.sensoryDetails.sounds);
        document.getElementById('smells').value = joinWithCommas(memory.sensoryDetails.smells);
        document.getElementById('textures').value = joinWithCommas(memory.sensoryDetails.textures);
        document.getElementById('tastes').value = joinWithCommas(memory.sensoryDetails.tastes);
        document.getElementById('memoryThemes').value = joinWithCommas(memory.themes.userTags);
        document.getElementById('memoryCharacters').value = joinWithCommas(memory.characters);
        document.getElementById('memoryLocation').value = memory.location;
        document.getElementById('memoryNotes').value = memory.notes;
    }

    saveMemory() {
        if (!projectManager.currentProject) {
            showNotification('No project selected', 'error');
            return;
        }

        const memoryData = {
            title: document.getElementById('memoryTitle').value.trim(),
            narrative: document.getElementById('memoryNarrative').value.trim(),
            datePeriod: {
                year: parseInt(document.getElementById('memoryYear').value) || null,
                season: document.getElementById('memorySeason').value.trim(),
                precision: document.getElementById('memoryPrecision').value
            },
            emotionalTone: parseInt(document.getElementById('emotionalTone').value),
            sensoryDetails: {
                sights: parseCommaSeparated(document.getElementById('sights').value),
                sounds: parseCommaSeparated(document.getElementById('sounds').value),
                smells: parseCommaSeparated(document.getElementById('smells').value),
                textures: parseCommaSeparated(document.getElementById('textures').value),
                tastes: parseCommaSeparated(document.getElementById('tastes').value)
            },
            themes: {
                userTags: parseCommaSeparated(document.getElementById('memoryThemes').value),
                suggestedTags: []
            },
            characters: parseCommaSeparated(document.getElementById('memoryCharacters').value),
            location: document.getElementById('memoryLocation').value.trim(),
            notes: document.getElementById('memoryNotes').value.trim()
        };

        if (!memoryData.title) {
            showNotification('Please enter a memory title', 'error');
            return;
        }

        if (this.currentMemoryId) {
            // Update existing memory
            projectManager.updateMemory(this.currentMemoryId, memoryData);
            showNotification('Memory updated!', 'success');
        } else {
            // Add new memory
            projectManager.addMemory(memoryData);
            showNotification('Memory added!', 'success');
        }

        this.closeModal('memoryModal');

        // Refresh current view
        if (window.app) {
            window.app.refreshCurrentView();
        }
    }
}

// Global instance
const modalManager = new ModalManager();
