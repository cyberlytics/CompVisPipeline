import json
from flask import Flask, request

app = Flask(__name__)

@app.route("/", methods=["GET"])
@app.route('/get-hello-world', methods=["GET"])
def getHelloWorld():
    return "Hello World"

@app.route("/get-sum", methods=["GET"])
def getSum():
    """
    localhost:5000/get-sum?x=<x>&y=<y>
    """
    x = request.args.get("x")
    y = request.args.get("y")
    return x+y

def start():
    app.run(host="0.0.0.0")