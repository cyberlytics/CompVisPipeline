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
    assert response.text == "Hello World"


def test_sum_route(client):
    response = client.get("/get-sum", query_string={"x": "1", "y": "2"})
    assert response.status_code == 200
    assert response.text == "12"


def test_startPipeline_route(client, create_rgb_image):
    s3Manager = S3Manager()
    s3Manager.pushImageToS3("123", create_rgb_image)
    response = client.post(
        "/start-pipeline/123",
        json=[],
    )
    assert len(response.json) == 1
    s3Manager.deleteImageFromS3("123")
    s3Manager.deleteImageFromS3(response.json[0])

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


