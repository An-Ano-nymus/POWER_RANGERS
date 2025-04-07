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

