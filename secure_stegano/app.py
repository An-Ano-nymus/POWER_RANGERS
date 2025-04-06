from flask import Flask, request, render_template, redirect, send_file
from stegano_utils import encode_message, decode_message
from pymongo import MongoClient
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

client = MongoClient("mongodb+srv://raghavultimate92004:tZaLJKcQuuYHLHA0@powerranger.2wnn5wt.mongodb.net/?retryWrites=true&w=majority&appName=PowerRanger")
db = client["secure_steg"]
collection = db["images"]

@app.route('/verification/upload', methods=['POST'])
def upload():
    email = request.form['email']
    file = request.files['image']
    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    # Steganographically embed allowed email
    out_path = os.path.join(UPLOAD_FOLDER, 'stego_' + filename)
    encode_message(filepath, email, out_path)

    # Save email & filename in DB
    collection.insert_one({
        'filename': 'stego_' + filename,
        'allowed_email': email
    })

    return f"✅ File saved with email lock for {email}. Download: <a href='/download/stego_{filename}'>Download</a>"

@app.route('/verification/download/<filename>')
def download(filename):
    return send_file(os.path.join(UPLOAD_FOLDER, filename), as_attachment=True)

@app.route('/verification/view', methods=['GET', 'POST'])
def view():
    if request.method == 'POST':
        email = request.form['email']
        file = request.files['image']
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)

        decoded_email = decode_message(filepath)

        record = collection.find_one({'filename': filename})
        if record and decoded_email == email:
            return f"✅ Access granted. Hidden email: {decoded_email}"
        else:
            return "❌ Unauthorized access detected. Image destroyed or corrupted."

    return render_template('view_image.html')