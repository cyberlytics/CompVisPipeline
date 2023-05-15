import json
from flask import Flask, request, Response
from flask_cors import CORS
from pydantic import ValidationError

from app.Models.startPipelineModels import PipelineSteps
from app.Pipeline.pipeline import Pipeline

app = Flask(__name__)
CORS(app) # TODO: do not use this in production

@app.route("/", methods=["GET"])
@app.route('/get-hello-world', methods=["GET"])
def getHelloWorld():
    return "Hello World"

@app.route("/get-sum", methods=["GET"])
def getSum():
    """
    http://127.0.0.1:5000/get-sum?x=<x>&y=<y>
    """
    x = request.args.get("x")
    y = request.args.get("y")
    return x+y

@app.route("/start-pipeline/<imageId>", methods=["POST"])
def startPipeline(imageId):
    try:
        steps = PipelineSteps(**request.json)
    except ValidationError:
        return Response(status=400)
    pipeline = Pipeline(imageId, steps)
    result = pipeline.start()
    return result


    

if __name__ == "__main__":
    app.run(host="0.0.0.0")