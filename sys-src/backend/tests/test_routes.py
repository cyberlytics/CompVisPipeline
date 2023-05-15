import pytest
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

def test_startPipeline_route(client):
    response = client.post("/start-pipeline/123", json={"steps":[{"func":"test", "parameters":[1,2,3]}]})
    assert response is not None
