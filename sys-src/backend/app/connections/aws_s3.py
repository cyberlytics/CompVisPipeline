# Manage the connection to AWS S3
# s3 bucket: team-rot-fatcat-data
# TODO
import os
import boto3

def get_s3_connection():
    # get boto3 session with access_key_id and secret_access_key from ./aws/credentials
    session = boto3.Session(aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'], aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'], region_name=os.environ['AWS_DEFAULT_REGION'])
    return session

def get_s3_bucket(session):
    # get s3 buckets
    s3_bucket = session.resource('s3')

    return s3_bucket

def get_s3_object():
    pass

def put_s3_object():
    pass


if __name__ == '__main__':
    aws_session = get_s3_connection()
    s3_bucket = get_s3_bucket(aws_session)

    print(s3_bucket)