from flask import Flask
import pandas as pd

app = Flask(__name__)

@app.route("/")
def index():
    return "Hello"

if __name__ == ("__name__"):
    app.run(debug=True)
