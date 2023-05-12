FROM python:3.10-alpine

# ENV variables for AWS credentials
ENV AWS_ACCESS_KEY_ID=AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=AWS_SECRET_ACCESS_KEY
ENV AWS_DEFAULT_REGION=AWS_DEFAULT_REGION

WORKDIR workdir
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . . 
EXPOSE 5000

CMD ["gunicorn", "--config", "gunicorn_config.py", "main:app"]