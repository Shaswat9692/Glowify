const originalCanvas = document.getElementById('original-canvas');
const enhancedCanvas = document.getElementById('enhanced-canvas');
const originalCtx = originalCanvas.getContext('2d');
const enhancedCtx = enhancedCanvas.getContext('2d');
const slider = document.getElementById('slider');
const downloadBtn = document.getElementById('download-btn');
let isDragging = false;

// Load Image Functionality
document.getElementById('image-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = function () {
            // Ensure the container matches the image aspect ratio
            const container = document.querySelector('.comparison-container');
            const scale = 0.5; // Image scaling factor (50% of the original size)

            const newWidth = img.width * scale;
            const newHeight = img.height * scale;

            container.style.width = `${newWidth}px`;
            container.style.height = `${newHeight}px`;

            // Set canvas sizes to match the scaled image
            originalCanvas.width = enhancedCanvas.width = newWidth;
            originalCanvas.height = enhancedCanvas.height = newHeight;

            // Draw original image
            originalCtx.clearRect(0, 0, newWidth, newHeight);
            originalCtx.drawImage(img, 0, 0, newWidth, newHeight);
            
            // Simulate enhancement by slightly adjusting brightness for demonstration
            enhancedCtx.filter = 'brightness(1.2)';
            enhancedCtx.clearRect(0, 0, newWidth, newHeight);
            enhancedCtx.drawImage(img, 0, 0, newWidth, newHeight);

            // Make the download button visible after the image is loaded
            downloadBtn.style.display = 'block';
        };
    }
});

// Slider Drag Functionality
slider.addEventListener('mousedown', () => {
    isDragging = true;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const containerRect = originalCanvas.getBoundingClientRect();
        let newLeft = event.clientX - containerRect.left;

        // Constrain slider position to within canvas bounds
        if (newLeft < 0) newLeft = 0;
        if (newLeft > containerRect.width) newLeft = containerRect.width;

        // Update slider position
        slider.style.left = `${newLeft}px`;

        // Update canvas clip for enhanced image
        enhancedCanvas.style.clip = `rect(0px, ${newLeft}px, ${containerRect.height}px, 0px)`;
    }
});

// Download Enhanced Image Functionality
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'enhanced-image.png';
    
    // Create a temporary canvas to merge the original and enhanced sections
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    tempCanvas.width = originalCanvas.width;
    tempCanvas.height = originalCanvas.height;

    // Draw the enhanced image on the temporary canvas
    tempCtx.drawImage(enhancedCanvas, 0, 0);

    // Convert to data URL and trigger download
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
});
