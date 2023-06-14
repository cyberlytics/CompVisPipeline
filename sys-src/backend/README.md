Start local run:
python main.py

Available at:
localhost:5000

# How to run tests:
- to run the standard unit-tests run `pytest` in the command line
- there are some tests which are really slow because they depend on REST-Calls or up-/download to/from S3 these tests can be run with `pytest -m "aws"` or `pytest -m "fatCatAi"`
- To see the code coverage of our tests you can run `pytest --cov -m "aws or fatCatAi or unmarked"` this will run all tests even the slow ones and report the coverage