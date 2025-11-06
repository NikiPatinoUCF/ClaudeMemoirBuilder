// Emotional Arc Calculation and Visualization

class EmotionalArc {
    constructor() {
        this.arcTypes = {
            'u-shape': 'Descent and Return',
            'exploratory': 'Peaks and Valleys of Discovery',
            'subtle-wave': 'Gentle Oscillations',
            'rising': 'Upward Journey',
            'falling': 'Downward Spiral',
            'stable': 'Steady State'
        };
    }

    // Calculate emotional arc for a set of memories
    calculateArc(memories) {
        if (!memories || memories.length === 0) {
            return {
                points: [],
                type: 'stable',
                stats: { min: 0, max: 0, avg: 0, range: 0 }
            };
        }

        // Sort by date
        const sorted = sortMemoriesByDate(memories);

        // Extract emotional points
        const points = sorted.map((memory, index) => ({
            x: index,
            y: memory.emotionalTone,
            memory: memory
        }));

        // Calculate statistics
        const tones = points.map(p => p.y);
        const stats = {
            min: Math.min(...tones),
            max: Math.max(...tones),
            avg: tones.reduce((sum, t) => sum + t, 0) / tones.length,
            range: Math.max(...tones) - Math.min(...tones)
        };

        // Determine arc type
        const arcType = this.determineArcType(points);

        return { points, type: arcType, stats };
    }

    // Determine the type of emotional arc
    determineArcType(points) {
        if (points.length < 3) return 'stable';

        const tones = points.map(p => p.y);
        const firstThird = tones.slice(0, Math.floor(tones.length / 3));
        const middleThird = tones.slice(
            Math.floor(tones.length / 3),
            Math.floor(2 * tones.length / 3)
        );
        const lastThird = tones.slice(Math.floor(2 * tones.length / 3));

        const firstAvg = firstThird.reduce((sum, t) => sum + t, 0) / firstThird.length;
        const middleAvg = middleThird.length > 0
            ? middleThird.reduce((sum, t) => sum + t, 0) / middleThird.length
            : firstAvg;
        const lastAvg = lastThird.reduce((sum, t) => sum + t, 0) / lastThird.length;

        // U-shape: starts moderate/high, dips in middle, rises at end
        if (middleAvg < firstAvg - 1 && lastAvg > middleAvg + 1) {
            return 'u-shape';
        }

        // Rising: consistent upward trend
        if (lastAvg > firstAvg + 1.5) {
            return 'rising';
        }

        // Falling: consistent downward trend
        if (lastAvg < firstAvg - 1.5) {
            return 'falling';
        }

        // Exploratory: high variance, lots of ups and downs
        const variance = this.calculateVariance(tones);
        if (variance > 4) {
            return 'exploratory';
        }

        // Subtle wave: low variance but some movement
        if (variance > 1 && variance <= 4) {
            return 'subtle-wave';
        }

        return 'stable';
    }

    // Calculate variance
    calculateVariance(values) {
        const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
        const squaredDiffs = values.map(v => Math.pow(v - mean, 2));
        return squaredDiffs.reduce((sum, d) => sum + d, 0) / values.length;
    }

    // Generate arc description
    getArcDescription(arcType) {
        const descriptions = {
            'u-shape': 'Your memoir follows a classic transformational journey: beginning in one state, descending into challenge or darkness, and emerging transformed. This is the Hero\'s Journey pattern.',
            'exploratory': 'Your emotional journey is marked by discovery and change, with significant peaks and valleys. This pattern suggests a narrative of continuous adaptation and learning.',
            'subtle-wave': 'Your memoir moves with gentle emotional shifts, creating a nuanced, literary narrative. The subtlety invites readers to lean in and pay attention to internal changes.',
            'rising': 'Your story shows an upward trajectory, a narrative of growth, recovery, or achievement. This creates a sense of hope and progress.',
            'falling': 'Your narrative arc descends, exploring loss, decline, or disillusionment. This creates a tragic or elegiac tone.',
            'stable': 'Your emotional landscape remains relatively consistent, suggesting a memoir focused on observation, reflection, or a particular emotional state.'
        };

        return descriptions[arcType] || 'Your emotional arc is unique to your story.';
    }

    // Smooth arc data for visualization (simple moving average)
    smoothArc(points, windowSize = 3) {
        if (points.length < windowSize) return points;

        const smoothed = [];
        for (let i = 0; i < points.length; i++) {
            const start = Math.max(0, i - Math.floor(windowSize / 2));
            const end = Math.min(points.length, i + Math.ceil(windowSize / 2));
            const window = points.slice(start, end);
            const avg = window.reduce((sum, p) => sum + p.y, 0) / window.length;

            smoothed.push({
                x: points[i].x,
                y: avg,
                memory: points[i].memory
            });
        }

        return smoothed;
    }

    // Recommend genre based on emotional arc
    recommendGenresByArc(arcType) {
        const recommendations = {
            'u-shape': ['hero-journey', 'literary-fiction'],
            'exploratory': ['sci-fi', 'literary-fiction'],
            'subtle-wave': ['literary-fiction'],
            'rising': ['hero-journey'],
            'falling': [],
            'stable': ['literary-fiction']
        };

        return recommendations[arcType] || [];
    }
}

// Global instance
const emotionalArc = new EmotionalArc();
