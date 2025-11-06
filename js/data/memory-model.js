// Memory Data Model

class Memory {
    constructor(data = {}) {
        this.id = data.id || generateUUID();
        this.title = data.title || '';
        this.narrative = data.narrative || '';
        this.datePeriod = data.datePeriod || {
            year: null,
            season: '',
            precision: 'approximate'
        };
        this.emotionalTone = data.emotionalTone !== undefined ? data.emotionalTone : 0;
        this.sensoryDetails = data.sensoryDetails || {
            sights: [],
            sounds: [],
            smells: [],
            textures: [],
            tastes: []
        };
        this.themes = data.themes || {
            userTags: [],
            suggestedTags: []
        };
        this.characters = data.characters || [];
        this.location = data.location || '';
        this.notes = data.notes || '';
        this.images = data.images || [];
        this.position = data.position || { x: 0, y: 0 };
    }

    // Validate memory data
    isValid() {
        return this.title && this.title.trim().length > 0;
    }

    // Get a short excerpt from narrative
    getExcerpt(maxLength = 150) {
        return truncateText(this.narrative, maxLength);
    }

    // Get color based on emotional tone
    getEmotionColor() {
        return getEmotionColor(this.emotionalTone);
    }

    // Get formatted date
    getFormattedDate() {
        return formatDatePeriod(this.datePeriod);
    }

    // Check if memory matches a search query
    matchesSearch(query) {
        if (!query) return true;

        const lowerQuery = query.toLowerCase();
        return (
            this.title.toLowerCase().includes(lowerQuery) ||
            this.narrative.toLowerCase().includes(lowerQuery) ||
            this.location.toLowerCase().includes(lowerQuery) ||
            this.themes.userTags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
            this.characters.some(char => char.toLowerCase().includes(lowerQuery))
        );
    }

    // Export to plain object
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            narrative: this.narrative,
            datePeriod: this.datePeriod,
            emotionalTone: this.emotionalTone,
            sensoryDetails: this.sensoryDetails,
            themes: this.themes,
            characters: this.characters,
            location: this.location,
            notes: this.notes,
            images: this.images,
            position: this.position
        };
    }

    // Create from plain object
    static fromJSON(data) {
        return new Memory(data);
    }
}
