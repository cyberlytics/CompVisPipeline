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

def get_s3_object(s3_bucket, str_path_s3, str_path_local):
    """ Download the s3 object from the s3 bucket """
    s3_bucket.download_file(Key=str_path_s3, Filename=str_path_local)

def put_s3_object(s3_bucket, str_path_s3, str_path_local):
    """ Upload the s3 object to the s3 bucket """
    s3_bucket.upload_file(Filename=str_path_local, Key=str_path_s3)

def close_s3_connection(s3_ressource):
    """ Close the connection to AWS and the s3 bucket """
    s3_ressource.meta.client.close()


if __name__ == '__main__':
    s3_ressource = get_s3_connection()
    s3_bucket = get_s3_bucket(s3_ressource)

    # put_s3_object(s3_bucket, 'test/test.txt', '/Users/andrekestler/Library/Mobile Documents/3L68KQB4HG~com~readdle~CommonDocuments/Documents/2. Semester/Big Data und Cloud Computing/cv_pipeline_team_rot/sys-src/backend/app/connections/test.txt')
    # get_s3_object(s3_bucket, str_path_s3='test/test.txt', str_path_local='/Users/andrekestler/Library/Mobile Documents/3L68KQB4HG~com~readdle~CommonDocuments/Documents/2. Semester/Big Data und Cloud Computing/cv_pipeline_team_rot/sys-src/backend/app/connections/test.txt')

    close_s3_connection(s3_ressource)