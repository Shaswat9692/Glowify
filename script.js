const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let originalImage = null;
let currentFilter = '';
let cropper = null;
let zoomLevel = 0.5;  // Initial zoom level

function loadImage(event) {
    const image = new Image();
    image.src = URL.createObjectURL(event.target.files[0]);
    image.onload = function () {
        originalImage = image;
        canvas.width = image.width * zoomLevel;
        canvas.height = image.height * zoomLevel;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        document.getElementById('saveBtn').style.display = 'none';
    };
}

function toggleFilterOptions() {
    const filterOptions = document.getElementById('filterOptions');
    filterOptions.style.display = filterOptions.style.display === 'none' ? 'block' : 'none';
}

function resetImage() {
    if (originalImage) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
    }
}

function applyFilter(filter) {
    currentFilter = filter;
    document.getElementById('sliderContainer').style.display = 'block';
    adjustFilter();
}

function adjustFilter() {
    resetImage();
    const intensity = document.getElementById('filterSlider').value;
    document.getElementById('filterValue').textContent = `${intensity}%`;
    let filterValue = '';

    switch (currentFilter) {
        case 'grayscale': filterValue = `grayscale(${Math.abs(intensity)}%)`; break;
        case 'sepia': filterValue = `sepia(${Math.abs(intensity)}%)`; break;
        case 'invert': filterValue = `invert(${Math.abs(intensity)}%)`; break;
        case 'brightness': filterValue = `brightness(${1 + intensity / 100})`; break;
        case 'contrast': filterValue = `contrast(${1 + intensity / 100})`; break;
        case 'saturate': filterValue = `saturate(${1 + intensity / 100})`; break;
        case 'hue-rotate': filterValue = `hue-rotate(${intensity * 3.6}deg)`; break;
        case 'blur': filterValue = `blur(${Math.abs(intensity) / 10}px)`; break;
        case 'opacity': filterValue = `opacity(${1 - Math.abs(intensity) / 100})`; break;
        case 'drop-shadow': filterValue = `drop-shadow(${intensity / 5}px ${intensity / 5}px ${intensity / 10}px black)`; break;
        case 'warm': filterValue = `brightness(${1 + intensity / 200}) sepia(${Math.abs(intensity) / 200})`; break;
        case 'cold': filterValue = `brightness(${1 + intensity / 200}) hue-rotate(${intensity < 0 ? 240 : 60}deg)`; break;
        case 'vibrance': filterValue = `saturate(${1 + intensity / 200}) contrast(${1 + intensity / 200})`; break;
        case 'moonlight': filterValue = `grayscale(${Math.abs(intensity) / 2}%) brightness(${1 + intensity / 300})`; break;
        case 'soften': filterValue = `blur(${Math.abs(intensity) / 15}px)`; break;
        case 'sharpen': filterValue = `contrast(${1 + intensity / 100}) brightness(${1 + intensity / 300})`; break;
        case 'lighten': filterValue = `brightness(${1 + intensity / 100})`; break;
        case 'darken': filterValue = `brightness(${1 - Math.abs(intensity) / 100})`; break;
        case 'antique': filterValue = `sepia(${Math.abs(intensity) / 100}) contrast(${1 - Math.abs(intensity) / 400})`; break;
        case 'vintage': filterValue = `sepia(${Math.abs(intensity) / 200}) contrast(${1 - Math.abs(intensity) / 500})`; break;
        case 'highlights': filterValue = `contrast(${1 + intensity / 200}) brightness(${1 + intensity / 200})`; break;
    }

    ctx.filter = filterValue;
    ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
    document.getElementById('saveBtn').style.display = 'inline';
}

function activateCrop() {
    if (cropper) cropper.destroy();

    cropper = new Cropper(canvas, {
        aspectRatio: NaN,
        viewMode: 1,
        background: false,
        autoCropArea: 1
    });

    const cropApplyButton = document.createElement('button');
    cropApplyButton.textContent = 'Apply Crop';
    cropApplyButton.onclick = applyCrop;
    document.body.appendChild(cropApplyButton);

    const cropCloseButton = document.createElement('button');
    cropCloseButton.textContent = 'Close Crop';
    cropCloseButton.onclick = () => {
        cropper.destroy();
        cropApplyButton.remove();
        cropCloseButton.remove();
    };
    document.body.appendChild(cropCloseButton);
}

function applyCrop() {
    const croppedCanvas = cropper.getCroppedCanvas();
    canvas.width = croppedCanvas.width;
    canvas.height = croppedCanvas.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(croppedCanvas, 0, 0);
    cropper.destroy();
}
  
function saveImage() {
    const link = document.createElement('a');
    link.download = 'edited_image.png';
    link.href = canvas.toDataURL();
    link.click();
}
