from flask import Flask, request
from flask_cors import CORS
from pydantic import ValidationError
import json
import os
import random
from app.connections.aiFatCatManager import AiFatCatManager


from app.metadata import Metadata
from app.connections.aws_s3 import S3Manager
from app.exceptions import BaseError
from app.Models.startPipelineModels import PipelineStep
from app.Pipeline.pipeline import FUNCTION_LIST, Pipeline
import boto3   # for AWS credentials

app = Flask(__name__)
CORS(app)  # TODO: do not use this in production


@app.route("/", methods=["GET"])
def getAvailableRoutes():
    return {
        "available routes": [
            "/start-pipeline/<imageId>", 
            "/available-steps", 
            "/image-metadata/<imageId>", 
            "/login",
            ]
        }


@app.route("/start-pipeline/<imageId>", methods=["POST"])
def startPipeline(imageId):
    try:
        steps = [PipelineStep(**item) for item in request.json]
    except ValidationError as e:
        return app.response_class(
            response=json.dumps({"error": f"Invalid request: {e}"}),
            status=400,
            content_type="application/json",
        )
    pipeline = Pipeline(imageId, steps)
    try:
        result = pipeline.start()
        return app.response_class(
            response=json.dumps({"result": result}),
            status=200,
            content_type="application/json",
        )
    except BaseError as e:
        return app.response_class(
            response=json.dumps({"error": f"Failed to process image: {e.message}"}),
            status=400,
            content_type="application/json",
        )
    except Exception as e:
        return app.response_class(
            response=json.dumps({"error": f"Failed to process image: Unknown Exception occurred {e}"}),
            status=400,
            content_type="application/json",
        )


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
    except BaseError as e:
        return app.response_class(
            response=json.dumps({"error":f"Failed to get metadata: {e.message}"}),
            status=400,
            content_type="application/json",
        )
    except Exception as e:
        return app.response_class(
            response=json.dumps({"error": f"Failed to get metadata: Unknown Exception occured {e}"}),
            status=400,
            content_type="application/json",
        )
    return {
        "histId": result[0],
        "height": result[1],
        "width": result[2],
        "channels": result[3],
    }

@app.route("/login", methods=["POST"])
def login():
    # Erhalte die Anmeldeinformationen aus dem Anfragekörper
    username = request.json.get("username")
    password = request.json.get("password")

    if password == 'ILoveBDCC_2023' and username == 'Fatcat':
        return app.response_class(
            response="Login successful",
            status=200,
            content_type="application/json",
        )
    else:
        return app.response_class(
            response="Login failed",
            status=400,
            content_type="application/json",
        )

@app.route("/random-ai-fatcat", methods=["GET"])
def getRandomAiFatcat():
    try:
        aiFatCatManager = AiFatCatManager()
        result = aiFatCatManager.getRandomAiImage()
    except BaseError as e:
        app.response_class(
            response=json.dumps({"error": f"Failed to get random ai fat cat: {e.message}"}),
            status=400,
            content_type="application/json",
        )
    except Exception as e:
        app.response_class(
            response=json.dumps({"error": f"Failed to get random ai fat cat: Unknown Exception occured {e}"}),
            status=400,
            content_type="application/json",
        )
    return result

@app.route("/get_token", methods=["GET"])
def get_token():
    # authentication with AWS credentials and create a sts client
    try:
        session = boto3.Session(aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"], aws_secret_access_key=os.environ["AWS_SECURE_ACCESS_KEY"], region_name=os.environ["AWS_DEFAULT_REGION"])
        sessionTokenClient = session.client('sts')

        # assume role with the sts client (set this role up in the IAM Dashboard in AWS)
        roleARN = "arn:aws:iam::663000164586:role/role_to_access_s3_bdcc"   # arn role of the user -> IAM Dashboard in AWS
        roleSesssionName = "bdcc_backend_user_"+ str(random.randint(0, 10000))                        # name of the session

        response = sessionTokenClient.assume_role(RoleArn=roleARN, RoleSessionName=roleSesssionName, DurationSeconds=900)
        credentials = response['Credentials']
        accessKeyId = credentials['AccessKeyId']
        secretAccessKey = credentials['SecretAccessKey']
        sessionToken = credentials['SessionToken']
        Region = "eu-central-1"

        print("response: ", response)

        return {
            "accessKeyId": accessKeyId,
            "secretAccessKey": secretAccessKey,
            "sessionToken": sessionToken,
            "region": Region
        }
    except Exception as e:
        return app.response_class(
            response=json.dumps({"error": f"Failed to get token for aws credentials"}),
            status=400,
            content_type="application/json",
        )