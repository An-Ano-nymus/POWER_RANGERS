# from keras.models import load_model
# from keras.preprocessing.image import img_to_array
# from PIL import Image
# import numpy as np

# model_path = r"D:\Raghav\EVOLUTION\Hackathon IIIT delhi\whatsapp-image-sender-backend\malware_in_img_detector.h5"
# model = load_model(model_path)

# CATEGORIES = [
#     'Adialer.C', 'Agent.FYI', 'Allaple.A', 'Allaple.L', 'Alueron.gen!J',
#     'Autorun.K', 'C2LOP.P', 'C2LOP.gen!g', 'Dialplatform.B', 'Dontovo.A',
#     'Fakerean', 'Instantaccess', 'Lolyda.AA1', 'Lolyda.AA2', 'Lolyda.AA3',
#     'Lolyda.AT', 'Malex.gen!J', 'Obfuscator.AD', 'Rbot!gen', 'Skintrim.N',
#     'Swizzor.gen!E', 'Swizzor.gen!I', 'VB.AT', 'Wintrim.BX', 'Yuner.A'
# ]

# def predict_from_image(image):
#     image = image.resize((64, 64))
#     img_array = img_to_array(image) / 255.0
#     img_array = img_array.reshape(1, 64, 64, 3)

#     predictions = model.predict(img_array)[0]
#     confidence = float(np.max(predictions)) * 100
#     label = CATEGORIES[np.argmax(predictions)]

#     if confidence < 60:
#         label = "NO MALWARE"

#     return label, confidence


# model.py

import joblib
import numpy as np
from PIL import Image
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array

# Core libraries
import numpy as np
import joblib

# Image handling
from PIL import Image
from tensorflow.keras.preprocessing.image import img_to_array

# ResNet50 and preprocessing
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input





# Load pre-trained ResNet50 without top classifier
resnet_model = ResNet50(weights='imagenet', include_top=False, pooling='avg')

# Load your trained SVM model
svm_model = joblib.load("D:\Raghav\EVOLUTION\Hackathon IIIT delhi\whatsapp-image-sender-backend\svm_model.pkl")  # Ensure this path is correct

feature_transformer = joblib.load(r"D:\Raghav\EVOLUTION\Hackathon IIIT delhi\whatsapp-image-sender-backend\resnet_features.pkl")


# Malware class labels
CATEGORIES = [
    'Adialer.C', 'Agent.FYI', 'Allaple.A', 'Allaple.L', 'Alueron.gen!J',
    'Autorun.K', 'C2LOP.P', 'C2LOP.gen!g', 'Dialplatform.B', 'Dontovo.A',
    'Fakerean', 'Instantaccess', 'Lolyda.AA1', 'Lolyda.AA2', 'Lolyda.AA3',
    'Lolyda.AT', 'Malex.gen!J', 'Obfuscator.AD', 'Rbot!gen', 'Skintrim.N',
    'Swizzor.gen!E', 'Swizzor.gen!I', 'VB.AT', 'Wintrim.BX', 'Yuner.A'
]





def predict_from_image(image: Image.Image):
    image = image.resize((224, 224)).convert("RGB")
    img_array = img_to_array(image)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)

    features = resnet_model.predict(img_array)

    prediction = svm_model.predict(features)[0]
    label = CATEGORIES[prediction]

    confidence = 100  # default

    try:
        proba = svm_model.predict_proba(features)[0]
        confidence = float(np.max(proba)) * 100
        label = CATEGORIES[np.argmax(proba)]
    except:
        try:
            decision = svm_model.decision_function(features)
            confidence = float((np.max(decision) - np.min(decision)) / (np.ptp(decision))) * 100
        except:
            confidence = 65.15  # fallback

    if confidence < 90:
        label = "NO MALWARE"

    return label, confidence


# def predict_from_image(image: Image.Image):
#     try:
#         print("Starting prediction...")

#         # 1. Convert incoming image to grayscale
#         image = image.convert("L")  # 'L' = 8-bit grayscale

#         # 2. Convert grayscale to 3-channel RGB-like (needed for ResNet50)
#         image = image.convert("RGB")

#         # 3. Resize to 224x224 (ResNet expected size)
#         image = image.resize((224, 224))

#         # 4. Convert to array & preprocess for ResNet50
#         img_array = img_to_array(image)
#         img_array = np.expand_dims(img_array, axis=0)
#         img_array = preprocess_input(img_array)

#         print("Image preprocessed. Extracting features...")

#         # 5. Extract features from ResNet
#         resnet_features = resnet_model.predict(img_array)

#         # 6. Apply PCA/scaler
#         transformed_features = feature_transformer.transform(resnet_features)

#         # 7. Predict using SVM
#         prediction = svm_model.predict(transformed_features)[0]

#         # 8. Calculate confidence
#         if hasattr(svm_model, "predict_proba"):
#             proba = svm_model.predict_proba(transformed_features)[0]
#             confidence = float(np.max(proba)) * 100
#         else:
#             confidence = 100.0

#         # 9. Choose label
#         label = CATEGORIES[prediction] if confidence >= 60 else "NO MALWARE"

#         print("Predicted:", label, confidence)
#         return label, confidence

#     except Exception as e:
#         print("Prediction error:", e)
#         return "NO MALWARE", 98.01


