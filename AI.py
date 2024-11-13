# from flask import Flask, request, send_file, jsonify
# from PIL import Image, ImageEnhance
# import os
# import traceback

# app = Flask(__name__)

# # Define the upload folder path
# UPLOAD_FOLDER = 'uploads'
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)

# @app.route('/')
# def home():
#     return 'Image Enhancement Service is Running!'

# @app.route('/enhance', methods=['POST'])
# def enhance_image():
#     if 'image' not in request.files:
#         return jsonify({'error': 'No image uploaded'}), 400

#     image_file = request.files['image']
#     if image_file.filename == '':
#         return jsonify({'error': 'No selected image'}), 400

#     try:
#         # Save the uploaded image
#         input_image_path = os.path.join(UPLOAD_FOLDER, image_file.filename)
#         print(f"Saving uploaded image to: {input_image_path}")
#         image_file.save(input_image_path)

#         # Open the image and convert to RGB if necessary
#         image = Image.open(input_image_path)
#         if image.mode != 'RGB':
#             image = image.convert('RGB')
#         print("Image opened successfully for enhancement.")

#         # Enhance the image
#         enhancer = ImageEnhance.Sharpness(image)
#         enhanced_image = enhancer.enhance(2.0)  # Adjust this value to enhance clarity

#         # Save enhanced image
#         enhanced_image_path = os.path.join(UPLOAD_FOLDER, 'enhanced_' + image_file.filename)
#         print(f"Saving enhanced image to: {enhanced_image_path}")
#         enhanced_image.save(enhanced_image_path)

#         # Determine MIME type for response
#         mimetype = 'image/png' if image_file.filename.lower().endswith('.png') else 'image/jpeg'
        
#         # Send enhanced image back to the client
#         return send_file(enhanced_image_path, mimetype=mimetype)

#     except Exception as e:
#         print(f"Error during image enhancement: {e}")
#         traceback.print_exc()  # Print the full error traceback for detailed debugging
#         return jsonify({'error': 'Error processing image', 'details': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)
