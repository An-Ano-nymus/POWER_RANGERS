# from flask import Flask, request, jsonify
# from model import predict_from_image
# from PIL import Image
# import io
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# @app.route('/predict', methods=['POST'])
# def predict():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part'}), 400

#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({'error': 'No selected file'}), 400

#     try:
#         image = Image.open(io.BytesIO(file.read())).convert("RGB")
#         label, confidence = predict_from_image(image)
#         return jsonify({
#             'result': label,
#             'confidence': round(confidence, 2)
#         })
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(port=5000, debug=True)


# app.py

from flask import Flask, request, jsonify
from model import predict_from_image
from PIL import Image
import io
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    try:
        image = Image.open(file.stream)
        label, confidence = predict_from_image(image)
        return jsonify({
            "result": label,
            "confidence": f"{confidence:.2f}"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)


