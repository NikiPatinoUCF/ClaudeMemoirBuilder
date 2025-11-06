// Main Application Controller

class App {
    constructor() {
        this.initialize();
    }

    initialize() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    start() {
        console.log('Tell Your Story: A Crafted Memoir - Starting...');

        // Check if there's a current project
        const currentProject = projectManager.getCurrentProject();

        if (currentProject) {
            // Load the project
            navigation.refreshProjectSelector();
            navigation.switchView('memories');
            showNotification(`Welcome back to "${currentProject.title}"`, 'info');
        } else {
            // Show welcome screen
            const projects = projectManager.getAllProjects();
            navigation.refreshProjectSelector();

            if (projects.length > 0) {
                showNotification('Welcome back! Select a project or create a new one.', 'info');
            } else {
                showNotification('Welcome! Try the demo or create your first project.', 'info');
            }
        }

        // Check storage usage
        const storageInfo = getStorageInfo();
        if (parseFloat(storageInfo.percentUsed) > 80) {
            showNotification(
                `Storage usage: ${storageInfo.percentUsed}%. Consider exporting projects.`,
                'info',
                8000
            );
        }

        console.log('App initialized successfully');
    }

    loadProject(projectId) {
        navigation.loadProject(projectId);
    }

    refreshCurrentView() {
        navigation.refreshCurrentView();
    }
}

// Initialize app when script loads
const app = new App();

// Make app globally accessible for debugging
window.app = app;
window.projectManager = projectManager;
window.navigation = navigation;
