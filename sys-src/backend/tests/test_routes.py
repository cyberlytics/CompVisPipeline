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
