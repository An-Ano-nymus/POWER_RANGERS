# 🔒 SMARTSHIELD : Secure Image Sharing & Malware Detection System

**SmartShield** is a dual-layer security system that detects malware in visual files and restricts unauthorized access.

**1. Malware Detection:**
Detect malware and classify them into 25 different classes based on our dataset.

**2.Secure File Access:**
Each file is embedded with user or device-specific data, allowing access only to the intended recipient. Unauthorized attempts trigger file destruction or corruption.

---

## 📌 Features

- 🔐 **User Authentication** – Login-secured access via email & password.
- 🧠 **Malware Detection** – Uses ResNet50 with an ensemble of SVM, Random Forest, and Logistic Regression.
- 🖼️ **Steganography** – Embeds allowed recipient emails inside images.
- 🚫 **Access Control** – Only authorized users can decode and access images.
- 💥 **Tamper Protection** – Unauthorized access attempts result in image destruction or corruption.
- 🌐 **Browser Extension** – Detects malicious images shared via chat platforms like WhatsApp Web.
- 🧠 **LLM Assistant (Optional)** – Explains detections, suggests security policies, and supports forensic reporting.

---

## 🧠 AI/ML Tech Stack

- **ResNet50** – Used as a feature extractor for malware images.
- **Ensemble Classifier** – Combination of:
  - Support Vector Machine (SVM)
  - Random Forest
  - Logistic Regression
- **VotingClassifier** – Implements soft voting for better accuracy.
- **Malimg Dataset** – Dataset of malware images used for training and evaluation.
- **Joblib** – Used for saving and loading the trained model (`svm_model.pkl`).

---

## 🖥️ Web Tech Stack

| Layer       | Tech Used                |
|-------------|--------------------------|
| Frontend    | React.js, Tailwind CSS   |
| Backend     | Flask (Python)           |
| Steganography | Stegano (Python)        |
| Database    | MongoDB                  |
| Auth        | Email/Password Login     |

---

## 📁 Project Structure

├── frontend/             # React frontend
├── backend/
├── models/            # ML models (.pkl, .h5)
├── secure stegano/ 
│   ├── app.py             # Flask backend
│   ├── stegano_utils.py   # Image steganography functions
├── whataspp-image-sender backend/   
├── whataspp-image-sender-frontend/   


---

## 🔄 Project Workflow

1. User logs in using email/password.
2. Uploads an image to check for malware.
3. Image is scanned using the AI model.
4. If clean, allowed emails are embedded via steganography.
5. The image is sent for download or to the recipient.
6. When the recipient logs in and accesses the file:
   - Email is verified.
   - If valid, the image is decoded.
   - If invalid, the image is corrupted or self-destructs.

---

## 🔐 Authentication Flow

- User credentials are stored securely in MongoDB.
- Login form collects and verifies credentials.
- Session or token management protects access to routes.
- Email is associated with uploaded and encoded files.
- Each image has a list of allowed emails stored in MongoDB.

---

## 🖼️ Steganography Logic

- `stegano_utils.py` handles embedding and extraction.
- Uses **Least Significant Bit (LSB)** technique.
- Hides allowed email(s) inside the image's pixels.
- Does **not use** cryptography (just hiding, not encrypting).
- Secure by limiting access at decoding based on verified email.

---

## 🧠 Malware Detection Flow

- ResNet50 pre-trained model is used for feature extraction.
- Extracted features are passed to a soft voting ensemble model:
  - SVM (linear kernel)
  - Random Forest (n=100)
  - Logistic Regression
- Predicts one of the 25 malware classes from **Malimg dataset**.
- If confidence < threshold (e.g., 60%), returns "No Malware".

---

## ⚙️ Backend Route Summary (Flask)

| Endpoint          | Method | Description                              |
|-------------------|--------|------------------------------------------|
| `/`               | GET    | Login form                               |
| `/login`          | POST   | Validates user login                     |
| `/upload`         | POST   | Uploads image, runs malware detection    |
| `/encode`         | POST   | Steganographically embeds email          |
| `/decode`         | POST   | Decodes image if email is authorized     |

---

## 📦 Dependencies

<details>
<summary>Click to expand</summary>

```bash
Flask
Pillow
numpy
scikit-learn
joblib
keras
tensorflow
stegano
pymongo
Flask-Login
Flask-Cors
python-dotenv

---

## 🔮 Future Scope

1. **Device-Level Locking**  
   Bind image access to device fingerprints or MAC addresses. Ensures only specific machines can decode or view sensitive files.

2. **Time-Based Access Control**  
   Auto-expire access after a set time window (e.g., 24 hours after download link is generated).

3. **IP Whitelisting**  
   Restrict file access to predefined IP ranges (great for enterprise/internal networks).

4. **Cryptographic Enhancement**  
   Integrate AES encryption in addition to steganography for dual-layer security.

5. **Blockchain Audit Trails**  
   Maintain tamper-proof logs of image modifications, access attempts, and transmission.

6. **Watermarking + Steganography**  
   Combine visible and invisible markings to prevent both unauthorized use and tampering.

---

## 🤖 LLM (Large Language Model) Integration

We plan to integrate an LLM-powered chatbot into the platform to assist with:

1. **User Queries**  
   - "Why was my file blocked?"  
   - "How can I securely send this image?"

2. **Forensic & Security Insights**  
   - "This image was modified twice and attempted to be accessed by an unauthorized system."  
   - "Tampering suspected. Recommend isolating source device."

3. **Dynamic Policy Generation**  
   - “For healthcare images, only allow access from these 3 IPs and auto-delete after 24 hours.”

4. **Security Recommendations**  
   - Based on image metadata and usage patterns, recommend firewall rules or access restrictions.

✅ Perfect for **enterprise clients**, **security analysts**, and **forensics teams** looking to enforce adaptive policies.

---




