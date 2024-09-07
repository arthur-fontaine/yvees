import os
import numpy as np
from qreader import QReader
import cv2
import flask


app = flask.Flask(__name__)

QR_DECODE_SERVICE_PORT_ENV_KEY = "QR_DECODE_SERVICE_PORT"
PORT = os.environ.get(QR_DECODE_SERVICE_PORT_ENV_KEY)
if PORT is None:
    raise ValueError(
        f"Environment variable {QR_DECODE_SERVICE_PORT_ENV_KEY} is not set."
    )
else:
    PORT = int(PORT)


def decode_qr(image):
    qreader = QReader("n", 0.01)
    decoded_text = qreader.detect_and_decode(image=image)
    return decoded_text


@app.route("/", methods=["POST"])
def decode_qr_route():
    file = flask.request.files["file"]
    image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    decoded_text = decode_qr(image)
    return flask.jsonify(decoded_text)


def warmup():
    image = np.zeros((512, 512, 3), np.uint8)
    decode_qr(image)


if __name__ == "__main__":
    warmup()  # Measured with the same image, with warmup, the first request takes around 0.4 seconds, without warmup, it takes around 1 second.
    app.run(port=PORT)
