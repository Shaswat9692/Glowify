// script.js

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let uploadedImage;

function uploadImage() {
    const fileInput = document.getElementById('upload');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                uploadedImage = img;
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function applyGlow() {
    ctx.filter = 'brightness(1.2)';
    ctx.drawImage(uploadedImage, 0, 0);
}

function applyFilter(filter) {
    ctx.filter = filter;
    ctx.drawImage(uploadedImage, 0, 0);
}

function cropImage() {
    // Basic crop function
    ctx.drawImage(uploadedImage, 50, 50, canvas.width - 100, canvas.height - 100, 0, 0, canvas.width, canvas.height);
}

function rotateImage() {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.height;
    tempCanvas.height = canvas.width;
    tempCtx.rotate(Math.PI / 2);
    tempCtx.drawImage(canvas, 0, -canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = tempCanvas.width;
    canvas.height = tempCanvas.height;
    ctx.drawImage(tempCanvas, 0, 0);
}

function createCollage() {
    // Placeholder for collage feature
    alert('Collage feature coming soon!');
}
