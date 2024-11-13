const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let originalImage = null;
let currentFilter = '';
let cropper = null;

function loadImage(event) {
    const image = new Image();
    image.src = URL.createObjectURL(event.target.files[0]);
    image.onload = function () {
        originalImage = image;
        canvas.width = image.width;
        canvas.height = image.height;
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
        case 'drop-shadow': filterValue = `drop-shadow(${intensity / 5}px ${intensity / 5}px ${Math.abs(intensity) / 5}px black)`; break;
        case 'warm': filterValue = `sepia(${Math.abs(intensity) / 200}) brightness(${1 + intensity / 200})`; break;
        case 'cold': filterValue = `hue-rotate(200deg) saturate(${1 + intensity / 200}) brightness(${1 - intensity / 300})`; break;
        case 'vibrance': filterValue = `saturate(${1 + intensity / 50}) contrast(${1 + intensity / 50})`; break;
        case 'moonlight': filterValue = `contrast(${1 + intensity / 200}) brightness(${1 + intensity / 200})`; break;
        case 'soften': filterValue = `blur(${Math.abs(intensity) / 50}px)`; break;
        case 'sharpen': filterValue = `contrast(${1 + intensity / 50}) saturate(${1 + intensity / 50})`; break;
        case 'lighten': filterValue = `brightness(${1 + intensity / 100})`; break;
        case 'darken': filterValue = `brightness(${1 - intensity / 100})`; break;
        case 'antique': filterValue = `sepia(${Math.abs(intensity) / 100}) contrast(${1 - intensity / 200})`; break;
        case 'vintage': filterValue = `sepia(${Math.abs(intensity) / 100}) saturate(${1 - intensity / 200})`; break;
        case 'highlights': filterValue = `brightness(${1 + intensity / 200}) contrast(${1 + intensity / 100})`; break;
    }

    ctx.filter = filterValue;
    ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
}

function activateCrop() {
    if (cropper) {
        cropper.destroy();
    }
    cropper = new Cropper(canvas, {
        aspectRatio: NaN,
        viewMode: 1,
        autoCropArea: 0.5,
        crop(event) {}
    });
    document.getElementById('saveBtn').style.display = 'block';
}

function saveImage() {
    if (cropper) {
        const croppedCanvas = cropper.getCroppedCanvas();
        const dataURL = croppedCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'edited-image.png';
        link.click();
        cropper.destroy();
        cropper = null;
        document.getElementById('saveBtn').style.display = 'none';
    }
}
