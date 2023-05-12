FROM python:3.10-alpine

# copy aws credentials from local machine to docker container -> for s3 bucket access from python
MKDIR ~/.aws
COPY ~/.aws/credentials ~/.aws

WORKDIR workdir

COPY requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt && \
    rm /tmp/requirements.txt

CMD ["bin/bash"]