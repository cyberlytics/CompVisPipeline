from flask import Flask, request
from flask_cors import CORS
from pydantic import ValidationError
from app.connections.aws_s3 import S3Manager

from app.metadata import Metadata, MetadataError
from app.Models.startPipelineModels import PipelineStep
from app.Pipeline.pipeline import FUNCTION_LIST, Pipeline

app = Flask(__name__)
CORS(app)  # TODO: do not use this in production


@app.route("/", methods=["GET"])
def getHelloWorld():
    return {"available routes": ["/start-pipeline/<imageId>", "/available-steps"]}


@app.route("/start-pipeline/<imageId>", methods=["POST"])
def startPipeline(imageId):
    try:
        steps = [PipelineStep(**item) for item in request.json]
    except ValidationError as e:
        return app.response_class(
            response=f"Invalid request: {e}",
            status=400,
            content_type="application/json",
        )
    pipeline = Pipeline(imageId, steps)
    try:
        result = pipeline.start()
    except Exception as e:
        try: # Our Errors have a message attribute where you can find information about the error
            return app.response_class(
                response=f"Failed to process image: {e.message}",
                status=400,
                content_type="application/json",
            )
        except Exception as e:
            return app.response_class(
                response=f"Failed to process image: Unknown Exception occured {e}",
                status=400,
                content_type="application/json",
            )
    return result


@app.route("/available-steps", methods=["GET"])
def getAvailableSteps():
    result = []
    for id, func in enumerate(FUNCTION_LIST):
        description = func.describe()
        description["id"] = id
        result.append(description)
    return result


@app.route("/image-metadata/<imageId>", methods=["GET"])
def sendMetadata(imageId):
    metadata = Metadata()
    try:
        image = S3Manager().getImageFromS3(imageId)
        result = metadata.getMetadata(image)
    except Exception as e:
        try:
            return app.response_class(
                response=f"Failed to get metadata: {e.message}",
                status=400,
                content_type="application/json",
            )
        except Exception as e: # Our Errors have a message attribute where you can find information about the error
            return app.response_class(
                response=f"Failed to get metadata: Unknown Exception occured {e}",
                status=400,
                content_type="application/json",
            )
    return {
        "histId": result[0],
        "height": result[1],
        "width": result[2],
        "channels": result[3],
        }



if __name__ == "__main__":
    app.run(host="0.0.0.0")
