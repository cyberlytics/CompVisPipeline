import pytest
from app.Pipeline.pipeline import FUNCTION_LIST
from app.connections.aws_s3 import S3Manager
from app.routes import app


@pytest.fixture
def client():
    app.config.update({"TESTING": True})
    client = app.test_client()
    yield client


def test_hello_world_route(client):
    response = client.get("/")
    assert response.status_code == 200


@pytest.mark.aws
def test_startPipeline_route(client, create_rgb_image):
    s3Manager = S3Manager()
    s3Manager.pushImageToS3("123", create_rgb_image)
    response = client.post(
        "/start-pipeline/123",
        json=[],
    )
    assert len(response.json["result"]) == 1
    assert "imageId" in response.json["result"][0]
    assert "histId" in response.json["result"][0]
    assert "height" in response.json["result"][0]
    assert "width" in response.json["result"][0]
    assert "channels" in response.json["result"][0]
    s3Manager.deleteImageFromS3("123")
    s3Manager.deleteImageFromS3(response.json["result"][0]["imageId"])
    s3Manager.deleteImageFromS3(response.json["result"][0]["histId"])


def test_availableSteps_route(client):
    response = client.get("/available-steps")
    assert len(response.json) == len(FUNCTION_LIST)
    for step in response.json:
        assert "id" in step.keys()
        assert "params" in step.keys()
        assert "info" in step.keys()
        assert "title" in step.keys()
        assert type(step["id"]) == int
        assert type(step["params"]) == list
        for param in step["params"]:
            assert "title" in param.keys()
            assert "info" in param.keys()
            assert "defaultValue" in param.keys()


@pytest.mark.aws
def test_imageMetadata_route(client, prepared_bgr_img):
    s3Manager = S3Manager()
    s3Manager.pushImageToS3("123", prepared_bgr_img)
    response = client.get("/image-metadata/123")
    assert set(response.json.keys()) == set(["histId", "height", "width", "channels"])
    s3Manager.deleteImageFromS3("123")
    s3Manager.deleteImageFromS3(response.json["histId"])


@pytest.mark.aws
def test_imageMetadata_route_invalid_image_id(client):
    response = client.get("/image-metadata/this_is_an_invalid_image_id")
    assert response.status_code == 400

def test_login_route(client):
    # Test with correct login credentials
    response = client.post("/login", json={"username": "Fatcat", "password": "ILoveBDCC_2023"})
    assert response.status_code == 200
    assert response.data == b"Login successful"

    # Test with incorrect login credentials
    response = client.post("/login", json={"username": "WrongUser", "password": "WrongPassword"})
    assert response.status_code == 400
    assert response.data == b"Login failed"

@pytest.mark.aws
@pytest.mark.fatCatAi
def test_random_ai_fatcat_route(client):
    s3Manager = S3Manager()
    response = client.get("/random-ai-fatcat")
    assert response.status_code == 200
    assert set(response.json.keys()) == {"imageId", "histId", "height", "width", "channels"}
    assert s3Manager.getImageFromS3(response.json["imageId"]) is not None
    assert s3Manager.getImageFromS3(response.json["histId"]) is not None
    s3Manager.deleteImageFromS3(response.json["imageId"])
    s3Manager.deleteImageFromS3(response.json["histId"])