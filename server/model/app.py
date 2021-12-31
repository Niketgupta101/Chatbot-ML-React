from flask import Flask, render_template, request, jsonify
from infer import talk_my_bot
from train import train_my_bot

app = Flask(__name__)
chatbot = talk_my_bot()
trainbot = train_my_bot()

# @app.route('/', methods=["GET"])
# def home():
#     return render_template("home.html")

@app.route('/train', methods=['POST'])
def training():
    id = request.get_json().get("id")
    trainbot.train(id, "./Data/intent.json", "./Data/hyperparams.json")
    return "Training Finished....Model Saved Successfully!"

@app.route('/instantiate', methods=["POST"])
def instantiate():
    id = request.get_json().get("id")
    path = request.get_json().get("path")
    chatbot.prepare_to_chat(id, "./Data/intent.json", path)
    return "Model Loaded Succefully!"

@app.route('/predict', methods=["POST"])
def predict():
    msg = request.get_json().get("message")
    reply = chatbot.chat(msg)
    text = jsonify({"response": reply})
    print(text)
    return text

if __name__ == "__main__":
    app.run(debug=True)