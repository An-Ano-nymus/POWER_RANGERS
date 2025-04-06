from flask import Flask, request, jsonify
from model import predict_from_image
from PIL import Image
import io
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        image = Image.open(io.BytesIO(file.read()))
        prediction = predict_from_image(image)
        return jsonify({'result': prediction})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)



@app.route('/predict', methods=['POST'])
def predict():
    ...
    prediction, confidence = predict_from_image(image)
    return jsonify({'result': prediction, 'confidence': confidence})

def predict_from_image(image):
    # Actual model logic
    return "Malware", 92.4


