let images = [];
let currentLayout = "1:1";

// Toggle collage options
function toggleCollageOptions() {
    const options = document.getElementById("collageOptions");
    options.style.display = options.style.display === "none" ? "block" : "none";
}

// Load images
function loadImages(event) {
    const files = event.target.files;
    const collageContainer = document.getElementById("collageContainer");

    collageContainer.innerHTML = ""; // Clear any existing images

    for (let file of files) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.className = "collage-image";
        
        // Add drag and drop events
        img.draggable = true;
        img.ondragstart = (e) => dragStart(e);
        img.ondragend = (e) => dragEnd(e);

        collageContainer.appendChild(img);
        images.push(img);
    }
}

// Set collage grid layout
function setCollageGrid(layout) {
    const collageContainer = document.getElementById("collageContainer");
    currentLayout = layout;

    switch (layout) {
        case "1:1":
            collageContainer.style.width = "400px";
            collageContainer.style.height = "400px";
            break;
        case "4:3":
            collageContainer.style.width = "533px";
            collageContainer.style.height = "400px";
            break;
        case "3:4":
            collageContainer.style.width = "300px";
            collageContainer.style.height = "400px";
            break;
        case "851x315":
            collageContainer.style.width = "851px";
            collageContainer.style.height = "315px";
            break;
    }
}

// Add grid lines for guidance
function addGridLines() {
    const collageContainer = document.getElementById("collageContainer");
    collageContainer.querySelectorAll(".grid-line").forEach(line => line.remove()); // Remove old grid lines
    
    const gridSize = currentLayout === "851x315" ? 6 : 4;
    for (let i = 1; i < gridSize; i++) {
        // Horizontal line
        const hLine = document.createElement("div");
        hLine.className = "grid-line";
        hLine.style.top = `${(100 / gridSize) * i}%`;
        hLine.style.height = "1px";
        hLine.style.width = "100%";
        collageContainer.appendChild(hLine);
        
        // Vertical line
        const vLine = document.createElement("div");
        vLine.className = "grid-line";
        vLine.style.left = `${(100 / gridSize) * i}%`;
        vLine.style.width = "1px";
        vLine.style.height = "100%";
        collageContainer.appendChild(vLine);
    }
}

// Drag and drop functionality
let draggedImage = null;

function dragStart(event) {
    draggedImage = event.target;
    setTimeout(() => event.target.style.opacity = "0.5", 0);
}

function dragEnd(event) {
    setTimeout(() => {
        draggedImage.style.opacity = "1";
        draggedImage = null;
    }, 0);
}

// Save collage as an image
function saveCollage() {
    const collageContainer = document.getElementById("collageContainer");
    html2canvas(collageContainer).then(canvas => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "collage.png";
        link.click();
    });
}
