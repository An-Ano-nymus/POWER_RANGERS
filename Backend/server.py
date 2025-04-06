from flask import Flask, send_from_directory, request, jsonify
import os
from werkzeug.utils import secure_filename
from load_model import prediction_in_gif_opencv, prediction_in_img_opencv
from flask_cors import CORS

# Define paths
BASE_DIR = r"C:\Users\kaush\Downloads\Anuvansh\WEB_DEVELOPEMENT\Hackathon IIIT delhi"
FRONTEND_DIST = os.path.join(BASE_DIR, "Frontend", "dist")
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")

# Create uploads folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialize Flask app
app = Flask(__name__, static_folder=FRONTEND_DIST, static_url_path="")
CORS(app) 
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Optional: 16MB limit

# Serve React's index.html at the root
@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")

# Serve static files (JS, CSS, images, etc.)
@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(app.static_folder, path)

# File upload and analysis route
@app.route("/upload", methods=["POST"])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']

    if not file or file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Secure the filename
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    try:
        file.save(file_path)

        if filename.lower().endswith(".gif"):
            result = prediction_in_gif_opencv(file_path)
        else:
            result = prediction_in_img_opencv(file_path)

        if result is None:
            return jsonify({"error": "Prediction function returned no result."}), 500

        response = {
            "status": result.get("status", "unknown"),
            "confidence": result.get("confidence", 0),
            "message": result.get("message", "Analysis completed."),
            "virus_name": result.get("virus_name"),
            "summary": result.get("summary")
        }
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
