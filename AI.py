from flask import Flask, request, jsonify
from PIL import Image, ImageEnhance
import io
import base64

app = Flask(__name__)

# AI enhancement function (brightness, contrast adjustments)
def enhance_image(image_data):
    try:
        image = Image.open(io.BytesIO(image_data))
        
        # Example AI enhancements (adjust as needed)
        enhancer = ImageEnhance.Contrast(image)
        image = enhancer.enhance(1.5)  # Increase contrast
        enhancer = ImageEnhance.Brightness(image)
        image = enhancer.enhance(1.2)  # Increase brightness

        # Convert enhanced image back to base64
        buffer = io.BytesIO()
        image.save(buffer, format="PNG")
        enhanced_image_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
        
        return enhanced_image_base64

    except Exception as e:
        print(f"[Error] Image enhancement failed: {e}")
        return None

@app.route('/enhance', methods=['POST'])
def enhance():
    try:
        data = request.get_json()
        if not data or 'image' not in data:
            print("[Error] Invalid request data.")
            return jsonify({'error': 'Invalid request data'}), 400
        
        image_data = base64.b64decode(data['image'].split(',')[1])
        enhanced_image_base64 = enhance_image(image_data)
        
        if enhanced_image_base64:
            return jsonify({'enhancedImage': f'data:image/png;base64,{enhanced_image_base64}'})
        else:
            print("[Error] Enhancement returned None.")
            return jsonify({'error': 'Image enhancement failed'}), 500

    except Exception as e:
        print(f"[Error] Processing request failed: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
