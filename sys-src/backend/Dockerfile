FROM python:3.10-alpine
WORKDIR workdir
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . . 
EXPOSE 5000

CMD ["gunicorn", "--config", "gunicorn_config.py", "main:app"]