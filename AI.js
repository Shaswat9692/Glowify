let originalImage = null;

// Function to preview the uploaded image
function previewImage(event) {
    const image = new Image();
    image.src = URL.createObjectURL(event.target.files[0]);
    image.onload = function () {
        originalImage = image;
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        document.getElementById('enhanceBtn').disabled = false;
    };
}

// Function to send the image to AI.py for enhancement
function enhanceImage() {
    const canvas = document.getElementById('canvas');
    const dataURL = canvas.toDataURL('image/png');
    
    // Send the image to the Python backend using fetch API
    fetch('http://localhost:5000/enhance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: dataURL })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to enhance the image.');
        }
        return response.json();
    })
    .then(data => {
        if (data.enhancedImage) {
            const enhancedImage = new Image();
            enhancedImage.src = data.enhancedImage;
            enhancedImage.onload = function () {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(enhancedImage, 0, 0);
                document.querySelector('.save-section').style.display = 'block';
            };
        } else {
            alert('Image enhancement failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error enhancing the image.');
    });
}

// Function to save the enhanced image
function saveEnhancedImage() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'enhanced_image.png';
    link.href = canvas.toDataURL();
    link.click();
}
