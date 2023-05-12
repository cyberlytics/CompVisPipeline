FROM python:3.10-alpine

# copy aws credentials from local machine to docker container -> for s3 bucket access from python
MKDIR ~/.aws
COPY ~/.aws/credentials ~/.aws

WORKDIR workdir
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . . 
EXPOSE 5000

CMD ["gunicorn", "--config", "gunicorn_config.py", "main:app"]