// Timeline View with Emotional Arc

class TimelineView {
    constructor() {
        this.sketch = null;
        this.showEmotionalArc = true;
        this.setupControls();
    }

    setupControls() {
        const showArcCheckbox = document.getElementById('showEmotionalArc');
        if (showArcCheckbox) {
            showArcCheckbox.checked = this.showEmotionalArc;
            showArcCheckbox.addEventListener('change', (e) => {
                this.showEmotionalArc = e.target.checked;
            });
        }
    }

    render() {
        const project = projectManager.getCurrentProject();
        if (!project || project.memories.length === 0) {
            const container = document.getElementById('timelineCanvas');
            if (container) {
                container.innerHTML = '<p class="empty-state">Add memories to see your timeline</p>';
            }
            return;
        }

        // Remove existing canvas
        if (this.sketch) {
            this.sketch.remove();
        }

        const container = document.getElementById('timelineCanvas');
        if (!container) return;

        // Sort memories by date
        const sortedMemories = sortMemoriesByDate(project.memories);

        // Calculate emotional arc
        const arc = emotionalArc.calculateArc(sortedMemories);

        this.sketch = new p5((p) => {
            p.setup = () => {
                const canvas = p.createCanvas(container.clientWidth, container.clientHeight);
                canvas.parent(container);
            };

            p.draw = () => {
                p.background(255);

                if (sortedMemories.length === 0) return;

                const padding = 60;
                const width = p.width - padding * 2;
                const height = p.height - padding * 2;

                // Draw timeline axis
                p.stroke(100);
                p.strokeWeight(2);
                p.line(padding, p.height - padding, p.width - padding, p.height - padding);

                // Draw emotional arc if enabled
                if (this.showEmotionalArc) {
                    this.drawEmotionalArc(p, arc, padding, width, height);
                }

                // Draw memory markers
                sortedMemories.forEach((memory, index) => {
                    const x = padding + (index / (sortedMemories.length - 1 || 1)) * width;
                    const baseY = p.height - padding;

                    // Draw marker
                    p.fill(memory.getEmotionColor());
                    p.stroke(50);
                    p.strokeWeight(2);
                    p.circle(x, baseY, 20);

                    // Draw date label
                    p.fill(50);
                    p.noStroke();
                    p.textAlign(p.CENTER);
                    p.textSize(10);
                    p.text(memory.getFormattedDate(), x, baseY + 25);

                    // Draw title (vertical)
                    p.push();
                    p.translate(x, baseY - 15);
                    p.rotate(-p.PI / 2);
                    p.textAlign(p.LEFT);
                    p.textSize(12);
                    const title = memory.title.length > 30
                        ? memory.title.substring(0, 30) + '...'
                        : memory.title;
                    p.text(title, 0, 0);
                    p.pop();

                    // Check for mouse hover
                    if (p.dist(p.mouseX, p.mouseY, x, baseY) < 15) {
                        this.showMemoryTooltip(p, memory, x, baseY);
                    }
                });

                // Draw arc description
                if (this.showEmotionalArc) {
                    p.fill(50);
                    p.noStroke();
                    p.textAlign(p.LEFT);
                    p.textSize(14);
                    p.text(`Arc Type: ${emotionalArc.arcTypes[arc.type]}`, padding, 30);
                }
            };

            p.windowResized = () => {
                if (container) {
                    p.resizeCanvas(container.clientWidth, container.clientHeight);
                }
            };
        }, container);
    }

    drawEmotionalArc(p, arc, padding, width, height) {
        if (arc.points.length < 2) return;

        // Scale emotional values to fit canvas
        const minY = padding + 50;
        const maxY = p.height - padding - 50;
        const range = arc.stats.range || 10;
        const min = arc.stats.min;

        // Draw arc line
        p.noFill();
        p.stroke(15, 82, 87, 100); // Emerald with alpha
        p.strokeWeight(3);
        p.beginShape();

        arc.points.forEach((point, index) => {
            const x = padding + (index / (arc.points.length - 1 || 1)) * width;
            const normalizedY = (point.y - min) / (range || 1);
            const y = maxY - normalizedY * (maxY - minY);
            p.vertex(x, y);
        });

        p.endShape();

        // Draw Y-axis labels
        p.fill(100);
        p.noStroke();
        p.textAlign(p.RIGHT);
        p.textSize(10);
        p.text('+5', padding - 10, minY);
        p.text('0', padding - 10, (minY + maxY) / 2);
        p.text('-5', padding - 10, maxY);
    }

    showMemoryTooltip(p, memory, x, y) {
        // Draw tooltip background
        const tooltipWidth = 200;
        const tooltipHeight = 80;
        const tooltipX = x + 20;
        const tooltipY = y - tooltipHeight / 2;

        p.fill(255, 250);
        p.stroke(100);
        p.strokeWeight(1);
        p.rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 8);

        // Draw tooltip content
        p.fill(50);
        p.noStroke();
        p.textAlign(p.LEFT);
        p.textSize(12);
        p.text(memory.title, tooltipX + 10, tooltipY + 20);

        p.textSize(10);
        p.fill(100);
        p.text(memory.getFormattedDate(), tooltipX + 10, tooltipY + 40);
        p.text(`Emotional tone: ${memory.emotionalTone}`, tooltipX + 10, tooltipY + 55);

        if (memory.themes.userTags.length > 0) {
            p.text(memory.themes.userTags.join(', '), tooltipX + 10, tooltipY + 70);
        }
    }
}

// Global instance
window.timelineView = new TimelineView();
