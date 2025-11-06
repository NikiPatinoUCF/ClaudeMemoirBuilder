// Memory Map Visualization using P5.js

class MemoryMapView {
    constructor() {
        this.sketch = null;
        this.nodes = [];
        this.connections = [];
        this.selectedNode = null;
        this.draggedNode = null;
        this.offset = { x: 0, y: 0 };
        this.zoom = 1;
        this.isPanning = false;
        this.panStart = { x: 0, y: 0 };
        this.showConnections = true;

        this.setupControls();
    }

    setupControls() {
        const resetZoomBtn = document.getElementById('resetZoomBtn');
        const toggleConnectionsBtn = document.getElementById('toggleConnectionsBtn');

        if (resetZoomBtn) {
            resetZoomBtn.addEventListener('click', () => this.resetView());
        }

        if (toggleConnectionsBtn) {
            toggleConnectionsBtn.addEventListener('click', () => {
                this.showConnections = !this.showConnections;
                toggleConnectionsBtn.textContent = this.showConnections
                    ? 'Hide Connections'
                    : 'Show Connections';
            });
        }
    }

    render() {
        const project = projectManager.getCurrentProject();
        if (!project) return;

        // Remove existing canvas if any
        if (this.sketch) {
            this.sketch.remove();
        }

        // Create P5 sketch
        const container = document.getElementById('memoryMapCanvas');
        if (!container) return;

        // Prepare data
        this.prepareData(project);

        // Create sketch
        this.sketch = new p5((p) => {
            p.setup = () => {
                const canvas = p.createCanvas(container.clientWidth, container.clientHeight);
                canvas.parent(container);
                p.textAlign(p.CENTER, p.CENTER);
            };

            p.draw = () => {
                p.background(255);
                p.push();
                p.translate(this.offset.x, this.offset.y);
                p.scale(this.zoom);

                // Draw connections
                if (this.showConnections) {
                    this.connections.forEach(conn => {
                        this.drawConnection(p, conn);
                    });
                }

                // Draw nodes
                this.nodes.forEach(node => {
                    this.drawNode(p, node);
                });

                p.pop();
            };

            p.mousePressed = () => {
                const worldX = (p.mouseX - this.offset.x) / this.zoom;
                const worldY = (p.mouseY - this.offset.y) / this.zoom;

                // Check if clicking on a node
                const clickedNode = this.nodes.find(node =>
                    p.dist(worldX, worldY, node.x, node.y) < 30
                );

                if (clickedNode) {
                    this.draggedNode = clickedNode;
                    this.selectedNode = clickedNode;
                } else {
                    // Start panning
                    this.isPanning = true;
                    this.panStart = { x: p.mouseX - this.offset.x, y: p.mouseY - this.offset.y };
                    this.selectedNode = null;
                }
            };

            p.mouseDragged = () => {
                if (this.draggedNode) {
                    const worldX = (p.mouseX - this.offset.x) / this.zoom;
                    const worldY = (p.mouseY - this.offset.y) / this.zoom;
                    this.draggedNode.x = worldX;
                    this.draggedNode.y = worldY;

                    // Update memory position
                    const memory = project.memories.find(m => m.id === this.draggedNode.id);
                    if (memory) {
                        memory.position = { x: worldX, y: worldY };
                        projectManager.autoSave();
                    }
                } else if (this.isPanning) {
                    this.offset.x = p.mouseX - this.panStart.x;
                    this.offset.y = p.mouseY - this.panStart.y;
                }
            };

            p.mouseReleased = () => {
                this.draggedNode = null;
                this.isPanning = false;
            };

            p.mouseWheel = (event) => {
                const zoomFactor = event.delta > 0 ? 0.95 : 1.05;
                this.zoom = p.constrain(this.zoom * zoomFactor, 0.5, 3);
                return false;
            };

            p.windowResized = () => {
                if (container) {
                    p.resizeCanvas(container.clientWidth, container.clientHeight);
                }
            };
        }, container);
    }

    prepareData(project) {
        // Initialize nodes from memories
        this.nodes = project.memories.map(memory => {
            // Use saved position or generate initial position
            const hasPosition = memory.position && memory.position.x && memory.position.y;
            return {
                id: memory.id,
                title: memory.title,
                x: hasPosition ? memory.position.x : Math.random() * 600 + 100,
                y: hasPosition ? memory.position.y : Math.random() * 400 + 100,
                emotionalTone: memory.emotionalTone,
                color: memory.getEmotionColor()
            };
        });

        // Set up connections
        this.connections = project.connections.map(conn => {
            const fromNode = this.nodes.find(n => n.id === conn.from);
            const toNode = this.nodes.find(n => n.id === conn.to);
            return {
                from: fromNode,
                to: toNode,
                strength: conn.strength
            };
        });
    }

    drawNode(p, node) {
        // Highlight if selected
        if (this.selectedNode === node) {
            p.fill(255, 200);
            p.stroke(50);
            p.strokeWeight(3);
            p.circle(node.x, node.y, 70);
        }

        // Draw node
        p.fill(node.color);
        p.stroke(50);
        p.strokeWeight(2);
        p.circle(node.x, node.y, 50);

        // Draw title
        p.fill(255);
        p.noStroke();
        p.textSize(10);
        p.textStyle(p.BOLD);
        const title = node.title.length > 20 ? node.title.substring(0, 20) + '...' : node.title;
        p.text(title, node.x, node.y);
    }

    drawConnection(p, conn) {
        if (!conn.from || !conn.to) return;

        p.stroke(100, 100, 100, 50 + conn.strength * 20);
        p.strokeWeight(conn.strength / 5);
        p.line(conn.from.x, conn.from.y, conn.to.x, conn.to.y);
    }

    resetView() {
        this.offset = { x: 0, y: 0 };
        this.zoom = 1;
    }
}

// Global instance
const memoryMapView = new MemoryMapView();
