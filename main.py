import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from tensorflow.keras.models import load_model
import numpy as np
import cv2
from flask_cors import CORS

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  
CORS(app)

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

video_model = load_model("deepfake_model.h5")


def preprocess_video(video_path):
    try:
        cap = cv2.VideoCapture(video_path)
        frames = []
        success, frame = cap.read()
        while success and len(frames) < 20:  
            frame = cv2.resize(frame, (128, 128))
            frame = frame.astype('float32') / 255.0
            frames.append(frame)
            success, frame = cap.read()
        cap.release()
        return np.expand_dims(np.array(frames), axis=0)
    except Exception as e:
        raise ValueError(f"Error preprocessing video: {e}")


@app.route('/predict/video', methods=['POST'])
def predict_video():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in request"}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        video_input = preprocess_video(file_path)
        prediction = video_model.predict(video_input)[0][0]
        os.remove(file_path)

        result_label = "Deepfake" if prediction > 0.95 else "Real"
        return jsonify({"result": result_label})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)