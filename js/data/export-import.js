// Export and Import Functionality

class ExportImport {
    // Export current project as JSON
    static exportProject(project) {
        if (!project) {
            showNotification('No project to export', 'error');
            return;
        }

        // Create export data
        const exportData = {
            ...project,
            memories: project.memories.map(m => m.toJSON ? m.toJSON() : m),
            exportDate: Date.now(),
            version: '1.0'
        };

        // Generate filename
        const filename = `memoir_${project.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;

        // Download
        downloadJSON(exportData, filename);

        showNotification('Project exported successfully', 'success');
    }

    // Import project from JSON file
    static importProject(file, callback) {
        const reader = new FileReader();

        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);

                // Validate basic structure
                if (!data.title || !Array.isArray(data.memories)) {
                    throw new Error('Invalid project file format');
                }

                // Generate new ID to avoid conflicts
                data.id = generateUUID();
                data.title = `${data.title} (Imported)`;
                data.created = Date.now();
                data.modified = Date.now();

                // Convert memories to Memory objects
                data.memories = data.memories.map(m => Memory.fromJSON(m));

                // Save to storage
                projectManager.saveProject(data);

                showNotification('Project imported successfully', 'success');

                if (callback) callback(data);

            } catch (error) {
                console.error('Import error:', error);
                showNotification('Failed to import project: ' + error.message, 'error');
            }
        };

        reader.onerror = function() {
            showNotification('Failed to read file', 'error');
        };

        reader.readAsText(file);
    }

    // Export project as plain text
    static exportAsText(project) {
        if (!project) {
            showNotification('No project to export', 'error');
            return;
        }

        let text = `${project.title}\n`;
        text += `${'='.repeat(project.title.length)}\n\n`;

        // Sort memories by date
        const sorted = sortMemoriesByDate(project.memories);

        sorted.forEach((memory, index) => {
            text += `${index + 1}. ${memory.title}\n`;
            text += `Date: ${memory.getFormattedDate()}\n`;
            text += `Location: ${memory.location || 'Unknown'}\n`;

            if (memory.characters.length > 0) {
                text += `Characters: ${memory.characters.join(', ')}\n`;
            }

            if (memory.themes.userTags.length > 0) {
                text += `Themes: ${memory.themes.userTags.join(', ')}\n`;
            }

            text += `\n${memory.narrative}\n`;

            if (memory.notes) {
                text += `\nNotes: ${memory.notes}\n`;
            }

            text += `\n${'-'.repeat(60)}\n\n`;
        });

        // Create and download text file
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `memoir_${project.title.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showNotification('Text file exported successfully', 'success');
    }

    // Load demo project
    static loadDemoProject() {
        const demoProject = createDemoProject();

        // Save to storage
        projectManager.saveProject(demoProject);
        projectManager.setCurrentProject(demoProject.id);

        showNotification('Demo project loaded!', 'success');

        return demoProject;
    }
}
