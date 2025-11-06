// Project Manager - handles localStorage operations

class ProjectManager {
    constructor() {
        this.storageKey = 'memoir_builder_projects';
        this.currentProjectKey = 'memoir_builder_current';
        this.currentProject = null;
    }

    // Get list of all projects (metadata only)
    getAllProjects() {
        const projectsData = localStorage.getItem(this.storageKey);
        if (!projectsData) return [];

        try {
            const projects = JSON.parse(projectsData);
            return projects.map(p => ({
                id: p.id,
                title: p.title,
                created: p.created,
                modified: p.modified,
                memoryCount: p.memories?.length || 0
            }));
        } catch (error) {
            console.error('Error loading projects:', error);
            return [];
        }
    }

    // Get full project by ID
    getProject(projectId) {
        const projectsData = localStorage.getItem(this.storageKey);
        if (!projectsData) return null;

        try {
            const projects = JSON.parse(projectsData);
            const project = projects.find(p => p.id === projectId);

            if (project) {
                // Convert memory data to Memory objects
                project.memories = project.memories.map(m => Memory.fromJSON(m));
                return project;
            }
            return null;
        } catch (error) {
            console.error('Error loading project:', error);
            return null;
        }
    }

    // Create new project
    createProject(title) {
        const newProject = {
            id: generateUUID(),
            title: title || 'Untitled Project',
            created: Date.now(),
            modified: Date.now(),
            memories: [],
            connections: [],
            timelineStructure: {
                acts: [],
                currentOrder: []
            }
        };

        // Add to projects list
        const projects = this.getAllProjectsData();
        projects.push(newProject);
        this.saveAllProjects(projects);

        // Set as current project
        this.setCurrentProject(newProject.id);

        return newProject;
    }

    // Save project
    saveProject(project) {
        const projects = this.getAllProjectsData();
        const index = projects.findIndex(p => p.id === project.id);

        // Update modified timestamp
        project.modified = Date.now();

        // Convert Memory objects to plain objects
        const saveData = {
            ...project,
            memories: project.memories.map(m => m.toJSON ? m.toJSON() : m)
        };

        if (index >= 0) {
            projects[index] = saveData;
        } else {
            projects.push(saveData);
        }

        this.saveAllProjects(projects);

        // Update current project if it's loaded
        if (this.currentProject && this.currentProject.id === project.id) {
            this.currentProject = project;
        }
    }

    // Delete project
    deleteProject(projectId) {
        const projects = this.getAllProjectsData();
        const filtered = projects.filter(p => p.id !== projectId);
        this.saveAllProjects(filtered);

        // Clear current project if it was deleted
        if (this.currentProject && this.currentProject.id === projectId) {
            this.currentProject = null;
            localStorage.removeItem(this.currentProjectKey);
        }
    }

    // Set current project
    setCurrentProject(projectId) {
        const project = this.getProject(projectId);
        if (project) {
            this.currentProject = project;
            localStorage.setItem(this.currentProjectKey, projectId);
            return project;
        }
        return null;
    }

    // Get current project
    getCurrentProject() {
        if (this.currentProject) {
            return this.currentProject;
        }

        const currentId = localStorage.getItem(this.currentProjectKey);
        if (currentId) {
            this.currentProject = this.getProject(currentId);
            return this.currentProject;
        }

        return null;
    }

    // Clear current project
    clearCurrentProject() {
        this.currentProject = null;
        localStorage.removeItem(this.currentProjectKey);
    }

    // Add memory to current project
    addMemory(memoryData) {
        if (!this.currentProject) {
            console.error('No current project');
            return null;
        }

        const memory = new Memory(memoryData);
        this.currentProject.memories.push(memory);

        // Auto-generate connections
        this.updateConnections();

        // Save project
        this.saveProject(this.currentProject);

        return memory;
    }

    // Update memory in current project
    updateMemory(memoryId, memoryData) {
        if (!this.currentProject) {
            console.error('No current project');
            return null;
        }

        const index = this.currentProject.memories.findIndex(m => m.id === memoryId);
        if (index >= 0) {
            // Preserve ID and update other fields
            this.currentProject.memories[index] = new Memory({
                ...memoryData,
                id: memoryId
            });

            // Update connections
            this.updateConnections();

            // Save project
            this.saveProject(this.currentProject);

            return this.currentProject.memories[index];
        }

        return null;
    }

    // Delete memory from current project
    deleteMemory(memoryId) {
        if (!this.currentProject) {
            console.error('No current project');
            return false;
        }

        this.currentProject.memories = this.currentProject.memories.filter(
            m => m.id !== memoryId
        );

        // Remove connections involving this memory
        this.currentProject.connections = this.currentProject.connections.filter(
            c => c.from !== memoryId && c.to !== memoryId
        );

        // Save project
        this.saveProject(this.currentProject);

        return true;
    }

    // Update connections based on current memories
    updateConnections() {
        if (!this.currentProject) return;

        this.currentProject.connections = findMemoryConnections(
            this.currentProject.memories
        );
    }

    // Get all projects data (full)
    getAllProjectsData() {
        const projectsData = localStorage.getItem(this.storageKey);
        if (!projectsData) return [];

        try {
            return JSON.parse(projectsData);
        } catch (error) {
            console.error('Error parsing projects data:', error);
            return [];
        }
    }

    // Save all projects
    saveAllProjects(projects) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(projects));
        } catch (error) {
            console.error('Error saving projects:', error);
            if (error.name === 'QuotaExceededError') {
                alert('Storage quota exceeded. Please export and delete some projects.');
            }
        }
    }

    // Auto-save with debouncing
    autoSave = debounce(() => {
        if (this.currentProject) {
            this.saveProject(this.currentProject);
        }
    }, 2000);
}

// Global instance
const projectManager = new ProjectManager();
