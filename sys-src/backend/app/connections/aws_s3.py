# Manage the connection to AWS S3
# s3 bucket: team-rot-fatcat-data
# TODO
import os
import boto3

def get_s3_connection():
    """ Get the connection to AWS and the s3 ressource """
    # get boto3 session to connect to AWS
    aws_session = boto3.Session(aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'], aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'], region_name=os.environ['AWS_DEFAULT_REGION'])
    
    # get s3 ressource
    s3_ressource = aws_session.resource('s3')

    return s3_ressource

def get_s3_bucket(s3_ressource):
    """ Get the s3 bucket from aws """
    str_bucket_name = 'team-rot-fatcat-data'        # bucket name
    # get s3 buckets
    s3_bucket = s3_ressource.Bucket(str_bucket_name)

    return s3_bucket

def get_s3_object(s3_bucket, data):
    pass

def put_s3_object(s3_bucket, data):
    pass

def close_s3_connection(s3_ressource):
    """ Close the connection to AWS and the s3 bucket """
    s3_ressource.meta.client.close()


if __name__ == '__main__':
    s3_ressource = get_s3_connection()
    s3_bucket = get_s3_bucket(s3_ressource)

    for obj in s3_bucket.objects.all():
        print(obj.key)

    close_s3_connection(s3_ressource)