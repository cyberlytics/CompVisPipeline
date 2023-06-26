import os
import random

import boto3   # for AWS credentials

@app.route("/get_token", methods=["GET"])
def get_token():
    # authentication with AWS credentials and create a sts client
    try:
        session = boto3.Session(aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"], aws_secret_access_key=os.environ["AWS_SECURE_ACCESS_KEY"], region_name=os.environ["AWS_DEFAULT_REGION"])
        sessionTokenClient = session.client('sts')

        # assume role with the sts client (set this role up in the IAM Dashboard in AWS)
        roleARN = "arn:aws:iam::663000164586:role/role_to_access_s3_bdcc"   # arn role of the user -> IAM Dashboard in AWS
        roleSesssionName = "bdcc_backend_user_"+ str(random.randint(0, 10000))                        # name of the session

        response = sessionTokenClient.assume_role(RoleArn=roleARN, RoleSessionName=roleSesssionName, DurationSeconds=900)
        credentials = response['Credentials']
        accessKeyId = credentials['AccessKeyId']
        secretAccessKey = credentials['SecretAccessKey']
        sessionToken = credentials['SessionToken']
        Region = "eu-central-1"

        print("response: ", response)

        return {
            "accessKeyId": accessKeyId,
            "secretAccessKey": secretAccessKey,
            "sessionToken": sessionToken,
            "region": Region
        }
    except Exception as e:
        return app.response_class(
            response=json.dumps({"error": f"Failed to get token for aws credentials"}),
            status=400,
            content_type="application/json",
        )