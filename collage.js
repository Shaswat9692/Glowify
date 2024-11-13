let uploadedPhotos = [];
let selectedGrid = null;
let selectedFrameLayout = null;

document.getElementById('photoUpload').addEventListener('change', (event) => {
    const files = event.target.files;
    uploadedPhotos = Array.from(files).map(file => URL.createObjectURL(file));
    displayCollagePreview();
});

function selectGrid(grid) {
    selectedGrid = grid;
    generateUniqueFrames();
}

function generateUniqueFrames() {
    const frameSelection = document.getElementById('frameSelection');
    frameSelection.innerHTML = '';

    // Define unique frame layouts for demonstration
    const frameLayouts = [
        { id: 1, pattern: 'grid-2x2' },
        { id: 2, pattern: 'grid-3x3' },
        { id: 3, pattern: 'grid-1x3' },
        // Add more layouts as needed for each grid
    ];

    frameLayouts.forEach(layout => {
        const frameOption = document.createElement('div');
        frameOption.classList.add('frame-option');
        frameOption.onclick = () => selectFrame(layout.pattern);

        const framePreview = createFramePreview(layout.pattern);
        frameOption.appendChild(framePreview);

        frameSelection.appendChild(frameOption);
    });
}

function createFramePreview(pattern) {
    const framePreview = document.createElement('div');
    framePreview.classList.add('frame-preview', pattern);
    return framePreview;
}

function selectFrame(pattern) {
    selectedFrameLayout = pattern;
    displayCollagePreview();
}

function displayCollagePreview() {
    const collagePreview = document.getElementById('collagePreview');
    collagePreview.innerHTML = '';

    if (!selectedFrameLayout || uploadedPhotos.length === 0) return;

    const frameContainer = document.createElement('div');
    frameContainer.classList.add('frame', selectedFrameLayout);

    uploadedPhotos.forEach((photo, index) => {
        const imgSlot = document.createElement('div');
        imgSlot.classList.add('photo-slot');

        const img = document.createElement('img');
        img.src = photo;
        img.draggable = true;
        img.ondragstart = (e) => drag(e, index);
        img.ondrop = (e) => drop(e, index);
        img.ondragover = (e) => allowDrop(e);

        imgSlot.appendChild(img);
        frameContainer.appendChild(imgSlot);
    });

    collagePreview.appendChild(frameContainer);
}

function saveCollage() {
    const collagePreview = document.getElementById('collagePreview');
    html2canvas(collagePreview).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'collage.png';
        link.click();
    });
}

// Drag-and-drop functions
function drag(event, index) {
    event.dataTransfer.setData("text", index);
}

function drop(event, index) {
    event.preventDefault();
    const draggedIndex = event.dataTransfer.getData("text");

    [uploadedPhotos[index], uploadedPhotos[draggedIndex]] = [uploadedPhotos[draggedIndex], uploadedPhotos[index]];

    displayCollagePreview();
}

function allowDrop(event) {
    event.preventDefault();
}

// Initial call to load frame options based on grid selection
generateUniqueFrames();
