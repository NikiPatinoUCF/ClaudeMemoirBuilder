// Utility Helper Functions

// Format date period for display
function formatDatePeriod(datePeriod) {
    if (!datePeriod || !datePeriod.year) return 'Date unknown';

    let display = datePeriod.year.toString();
    if (datePeriod.season) {
        display += `, ${datePeriod.season}`;
    }
    if (datePeriod.precision === 'approximate') {
        display = `~${display}`;
    }
    return display;
}

// Truncate text with ellipsis
function truncateText(text, maxLength = 150) {
    if (!text || text.length <= maxLength) return text || '';
    return text.substring(0, maxLength).trim() + '...';
}

// Parse comma-separated string into array
function parseCommaSeparated(str) {
    if (!str) return [];
    return str.split(',').map(s => s.trim()).filter(s => s.length > 0);
}

// Join array into comma-separated string
function joinWithCommas(arr) {
    if (!arr || !Array.isArray(arr)) return '';
    return arr.join(', ');
}

// Debounce function for auto-save
function debounce(func, wait = 2000) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Deep clone object
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Calculate emotional arc statistics
function calculateArcStats(memories) {
    if (!memories || memories.length === 0) {
        return { min: 0, max: 0, avg: 0, trend: 'neutral' };
    }

    const tones = memories.map(m => m.emotionalTone || 0);
    const min = Math.min(...tones);
    const max = Math.max(...tones);
    const avg = tones.reduce((sum, t) => sum + t, 0) / tones.length;

    // Calculate trend (comparing first third to last third)
    const thirdSize = Math.floor(memories.length / 3);
    if (thirdSize > 0) {
        const firstThird = tones.slice(0, thirdSize);
        const lastThird = tones.slice(-thirdSize);
        const firstAvg = firstThird.reduce((sum, t) => sum + t, 0) / firstThird.length;
        const lastAvg = lastThird.reduce((sum, t) => sum + t, 0) / lastThird.length;

        const diff = lastAvg - firstAvg;
        if (diff > 1) return { min, max, avg, trend: 'rising' };
        if (diff < -1) return { min, max, avg, trend: 'falling' };
    }

    return { min, max, avg, trend: 'stable' };
}

// Sort memories by date
function sortMemoriesByDate(memories) {
    return [...memories].sort((a, b) => {
        const yearA = a.datePeriod?.year || 0;
        const yearB = b.datePeriod?.year || 0;
        return yearA - yearB;
    });
}

// Find connections between memories based on shared themes/characters
function findMemoryConnections(memories) {
    const connections = [];

    for (let i = 0; i < memories.length; i++) {
        for (let j = i + 1; j < memories.length; j++) {
            const memA = memories[i];
            const memB = memories[j];

            let strength = 0;

            // Check shared themes
            const sharedThemes = memA.themes.userTags.filter(tag =>
                memB.themes.userTags.includes(tag)
            );
            strength += sharedThemes.length * 2;

            // Check shared characters
            const sharedCharacters = memA.characters.filter(char =>
                memB.characters.includes(char)
            );
            strength += sharedCharacters.length * 3;

            // Check similar locations
            if (memA.location && memB.location) {
                const locA = memA.location.toLowerCase();
                const locB = memB.location.toLowerCase();
                if (locA.includes(locB) || locB.includes(locA)) {
                    strength += 2;
                }
            }

            // Check emotional similarity
            const emotionalDiff = Math.abs(memA.emotionalTone - memB.emotionalTone);
            if (emotionalDiff <= 2) {
                strength += 1;
            }

            if (strength > 0) {
                connections.push({
                    from: memA.id,
                    to: memB.id,
                    strength: Math.min(strength, 10)
                });
            }
        }
    }

    return connections;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Download data as JSON file
function downloadJSON(data, filename) {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Get storage usage info
function getStorageInfo() {
    let used = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            used += localStorage[key].length + key.length;
        }
    }

    const usedKB = (used / 1024).toFixed(2);
    const usedMB = (used / 1024 / 1024).toFixed(2);
    const limit = 5; // Most browsers: 5MB
    const percentUsed = ((usedMB / limit) * 100).toFixed(1);

    return { usedKB, usedMB, percentUsed, limit };
}
