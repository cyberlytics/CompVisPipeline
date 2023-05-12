# Manage the connection to AWS S3
# s3 bucket: team-rot-fatcat-data
# TODO
import boto3

def get_s3_connection():
    # get boto3 session with access_key_id and secret_access_key from ./aws/credentials
    session = boto3.Session(profile_name='default', region_name='eu-central-1')
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