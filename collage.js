let images = [];
let collageLayout = '2x1';

function loadImages(event) {
    const files = event.target.files;
    images = Array.from(files);
    renderCollage();
}

function toggleCollageOptions() {
    const collageOptions = document.getElementById("collageOptions");
    collageOptions.style.display = collageOptions.style.display === "none" ? "block" : "none";
}

function setCollageGrid(layout) {
    collageLayout = layout;
    renderCollage();
}

function renderCollage() {
    const collageContainer = document.getElementById("collageContainer");
    collageContainer.innerHTML = ""; // Clear previous images
    
    collageContainer.className = "collage-container " + collageLayout; // Set layout class based on choice

    images.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.classList.add("collage-image");
            img.setAttribute("draggable", "true");
            img.setAttribute("data-index", index);

            // Add drag event listeners
            img.addEventListener("dragstart", dragStart);
            img.addEventListener("dragover", dragOver);
            img.addEventListener("drop", drop);

            collageContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
}

function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.dataset.index);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const draggedIndex = event.dataTransfer.getData("text");
    const targetIndex = event.target.dataset.index;

    if (draggedIndex !== targetIndex) {
        [images[draggedIndex], images[targetIndex]] = [images[targetIndex], images[draggedIndex]];
        renderCollage();
    }
}

function saveCollage() {
    html2canvas(document.getElementById("collageContainer")).then((canvas) => {
        const link = document.createElement("a");
        link.download = "collage.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}
