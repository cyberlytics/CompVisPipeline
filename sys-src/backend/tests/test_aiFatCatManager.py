import pytest

from app.connections.aiFatCatManager import AiFatCatManager


@pytest.mark.fatCatAi
def test_getImageFrom_fette_katze_de(fakeS3Manager):
    aiManager = AiFatCatManager(fakeS3Manager)
    result = aiManager.getRandomAiImage()
    assert set(result.keys()) == {"imageId", "histId", "height", "width", "channels"}
    assert fakeS3Manager.getImageFromS3(result["imageId"]).shape == (result["height"], result["width"], 3)
    assert fakeS3Manager.getImageFromS3(result["histId"]) is not None

# TODO: Test Error Handling, can this be tested?
