// Theme Analysis - Keyword and Pattern Detection

class ThemeAnalyzer {
    constructor() {
        this.stopWords = new Set([
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
            'of', 'with', 'by', 'from', 'as', 'is', 'was', 'were', 'been', 'be',
            'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
            'should', 'may', 'might', 'must', 'can', 'that', 'this', 'these',
            'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'my', 'your',
            'his', 'her', 'its', 'our', 'their'
        ]);
    }

    // Analyze all memories and suggest themes
    analyzeMemories(memories) {
        const keywords = this.extractKeywords(memories);
        const patterns = this.findPatterns(memories);
        const suggestions = this.generateSuggestions(keywords, patterns);

        return { keywords, patterns, suggestions };
    }

    // Extract recurring keywords from narratives
    extractKeywords(memories) {
        const wordCount = new Map();

        memories.forEach(memory => {
            const text = `${memory.title} ${memory.narrative} ${memory.notes}`.toLowerCase();
            const words = text.match(/\b[a-z]{3,}\b/g) || [];

            words.forEach(word => {
                if (!this.stopWords.has(word)) {
                    wordCount.set(word, (wordCount.get(word) || 0) + 1);
                }
            });
        });

        // Convert to array and sort by frequency
        const sorted = Array.from(wordCount.entries())
            .filter(([word, count]) => count >= 2)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 20);

        return sorted.map(([word, count]) => ({ word, count }));
    }

    // Find recurring patterns across memories
    findPatterns(memories) {
        const patterns = {
            characters: this.findRecurringCharacters(memories),
            locations: this.findRecurringLocations(memories),
            themes: this.findRecurringThemes(memories),
            sensory: this.findRecurringSensory(memories)
        };

        return patterns;
    }

    findRecurringCharacters(memories) {
        const characterCount = new Map();

        memories.forEach(memory => {
            memory.characters.forEach(char => {
                const memoryIds = characterCount.get(char) || [];
                memoryIds.push(memory.id);
                characterCount.set(char, memoryIds);
            });
        });

        return Array.from(characterCount.entries())
            .filter(([char, memoryIds]) => memoryIds.length >= 2)
            .map(([character, memoryIds]) => ({ character, count: memoryIds.length, memoryIds }))
            .sort((a, b) => b.count - a.count);
    }

    findRecurringLocations(memories) {
        const locationCount = new Map();

        memories.forEach(memory => {
            if (memory.location) {
                const loc = memory.location.toLowerCase();
                const existing = locationCount.get(loc) || [];
                existing.push(memory.id);
                locationCount.set(loc, existing);
            }
        });

        return Array.from(locationCount.entries())
            .filter(([loc, memoryIds]) => memoryIds.length >= 2)
            .map(([location, memoryIds]) => ({ location, count: memoryIds.length, memoryIds }))
            .sort((a, b) => b.count - a.count);
    }

    findRecurringThemes(memories) {
        const themeCount = new Map();

        memories.forEach(memory => {
            memory.themes.userTags.forEach(theme => {
                const existing = themeCount.get(theme.toLowerCase()) || [];
                existing.push(memory.id);
                themeCount.set(theme.toLowerCase(), existing);
            });
        });

        return Array.from(themeCount.entries())
            .filter(([theme, memoryIds]) => memoryIds.length >= 2)
            .map(([theme, memoryIds]) => ({ theme, count: memoryIds.length, memoryIds }))
            .sort((a, b) => b.count - a.count);
    }

    findRecurringSensory(memories) {
        const sensoryCount = new Map();
        const categories = ['sights', 'sounds', 'smells', 'textures', 'tastes'];

        memories.forEach(memory => {
            categories.forEach(category => {
                memory.sensoryDetails[category].forEach(detail => {
                    const key = `${category}:${detail.toLowerCase()}`;
                    const existing = sensoryCount.get(key) || [];
                    existing.push(memory.id);
                    sensoryCount.set(key, existing);
                });
            });
        });

        return Array.from(sensoryCount.entries())
            .filter(([key, memoryIds]) => memoryIds.length >= 2)
            .map(([key, memoryIds]) => {
                const [category, detail] = key.split(':');
                return { category, detail, count: memoryIds.length, memoryIds };
            })
            .sort((a, b) => b.count - a.count);
    }

    // Generate theme suggestions based on analysis
    generateSuggestions(keywords, patterns) {
        const suggestions = [];

        // Character-based suggestions
        if (patterns.characters.length > 0) {
            patterns.characters.slice(0, 3).forEach(({ character, count }) => {
                suggestions.push({
                    type: 'character',
                    text: `The character "${character}" appears in ${count} memories. Consider their role in your narrative arc.`
                });
            });
        }

        // Location-based suggestions
        if (patterns.locations.length > 0) {
            const topLocation = patterns.locations[0];
            suggestions.push({
                type: 'location',
                text: `"${topLocation.location}" recurs ${topLocation.count} times. This location may be symbolically significant.`
            });
        }

        // Keyword-based suggestions
        if (keywords.length > 0) {
            const topKeywords = keywords.slice(0, 5).map(k => k.word);
            suggestions.push({
                type: 'keyword',
                text: `Recurring words: ${topKeywords.join(', ')}. These may reveal underlying themes.`
            });
        }

        // Sensory pattern suggestions
        if (patterns.sensory.length > 0) {
            const sensoryGroups = new Map();
            patterns.sensory.forEach(({ category, count }) => {
                sensoryGroups.set(category, (sensoryGroups.get(category) || 0) + count);
            });

            const topSensory = Array.from(sensoryGroups.entries())
                .sort((a, b) => b[1] - a[1])[0];

            if (topSensory) {
                suggestions.push({
                    type: 'sensory',
                    text: `You frequently use ${topSensory[0]} to evoke memory. This sensory mode may be key to your narrative voice.`
                });
            }
        }

        // Theme consolidation suggestion
        if (patterns.themes.length > 0) {
            suggestions.push({
                type: 'theme',
                text: `You've identified ${patterns.themes.length} recurring themes. Consider how they interconnect.`
            });
        }

        return suggestions;
    }

    // Suggest tags for a new memory based on existing patterns
    suggestTags(memory, existingMemories) {
        const suggestions = [];
        const analysis = this.analyzeMemories(existingMemories);

        // Check for keywords in the new memory's text
        const text = `${memory.title} ${memory.narrative}`.toLowerCase();

        analysis.keywords.slice(0, 10).forEach(({ word }) => {
            if (text.includes(word) && !memory.themes.userTags.includes(word)) {
                suggestions.push(word);
            }
        });

        return suggestions.slice(0, 5);
    }
}

// Global instance
const themeAnalyzer = new ThemeAnalyzer();
