import pickle
import matplotlib.pyplot as plt
from PIL import Image
import keras
from keras.preprocessing.image import load_img, img_to_array
from keras.models import load_model
import PIL
import sys
import os
from math import log
import numpy as np
import scipy as sp
import matplotlib.pyplot as plt
import cv2
import os




from tensorflow.keras.models import load_model

# Load the saved model
model_path = r"C:\Users\kaush\Downloads\Anuvansh\WEB_DEVELOPEMENT\Hackathon IIIT delhi\Backend\malware_in_img_detector.h5"  # Change to .h5 if needed
model = load_model(model_path)

# Now, you can use it for prediction
CATEGORIES = ['Adialer.C','Agent.FYI', 'Allaple.A', 'Allaple.L', 'Alueron.gen!J','Autorun.K', 'C2LOP.P','C2LOP.gen!g','Dialplatform.B', 'Dontovo.A', 'Fakerean', 'Instantaccess', 'Lolyda.AA1', 'Lolyda.AA2', 'Lolyda.AA3','Lolyda.AT', 'Malex.gen!J', 'Obfuscator.AD', 'Rbot!gen','Skintrim.N', 'Swizzor.gen!E', 'Swizzor.gen!I', 'VB.AT', 'Wintrim.BX', 'Yuner.A']



# Prediction for IMAGE
def prediction_in_img_opencv(img_path):
    img = load_img(img_path)
    img = img.resize((64, 64))
    # plt.imshow(img)
    # plt.show()  # Ensure it displays the image

    img = img_to_array(img)
    img = img.reshape(-1, 64, 64, 3)

    prediction = model.predict(img)
    pred_name = CATEGORIES[np.argmax(prediction)]
    print(f"Prediction: {pred_name}")
    print(f"Confidence Scores: {prediction}")

# Prediction for GIF
def prediction_in_gif_opencv(gif_path):
    cap = cv2.VideoCapture(gif_path)

    frame_num = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.resize(frame, (64, 64))  # Correct resizing method
        plt.imshow(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))  # Convert BGR to RGB
        plt.show()

        frame = img_to_array(frame)
        frame = frame.reshape(-1, 64, 64, 3)

        prediction = model.predict(frame)  # Assign prediction
        pred_name = CATEGORIES[np.argmax(prediction)]

        print(f"Frame {frame_num}: {pred_name}")
        print(f"Confidence Scores: {prediction}")

        frame_num += 1

    cap.release()

