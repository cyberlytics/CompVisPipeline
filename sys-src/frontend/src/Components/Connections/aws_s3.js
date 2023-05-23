// Connection for AWS S3
/*
Error Code
    - 403: AccessDenied
    - 404: NoSuchKey
    - 400: NoSuchBucket

*/



/**
 * Class to manage S3 Bucket
 * @param {string} accessKeyId      ->   AWS Access Key ID
 * @param {string} secretAccessKey  ->   AWS Secret Access Key
 * @param {string} region           ->   AWS Region
 * @param {string} bucketName       ->   Name of the S3 Bucket
 * @param {AWS-object} AWS          ->   AWS SDK
 * @param {S3-object} S3            ->   S3 Connection
 * 
 * @method deleteImageFromS3()      ->   Delete one image from S3 Bucket
 * @method deleteAllImagesFromS3()  ->   Delete all images from S3 Bucket
 * @method getImageFromS3()         ->   Get one image from S3 Bucket
 * @method pushImageToS3()          ->   Push one image to S3 Bucket
 */
class S3Manager {
    constructor() {
        // get credentials from env
        this.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
        this.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
        this.region = process.env.AWS_DEFAULT_REGION;

        this.bucketName = "team-rot-fatcat-data";

        // start connection to AWS
        this.AWS = this._getAWSSDK();

        // start connection to S3
        this.S3 = this._getS3Connection();
    }

    /**
     * Get AWS SDK object
     * @return {AWS-object} AWS -> AWS Object
     */
    _getAWSSDK() {
        // load AWS SDK
        let AWS = require("aws-sdk");

        // set credentials
        AWS.config.update({
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey,
            region: this.region,
        });

        AWS.config.getCredentials((err) => {
            if (err) console.log("AWS Credentials error", err.stack);
            else console.log("AWS Credentials loaded successfully");
        });

        return AWS
    }

    /**
     * Set S3 connection
     * @return {S3-object} S3 -> S3 Instance to interact with the S3 Buckets
    */
    _getS3Connection() {
        let S3 = new this.AWS.S3();

        return S3;
    }

    /**
     * Delete one image from S3 Bucket
     * @param {string} imageKey -> name/path of the image to delete
     * @return {Promise}        -> Promise of the delete action
     */
    deleteImageFromS3(imageKey) {
        // set delete params
        const params = {
            Bucket: this.bucketName,
            Key: imageKey,
        };

        // delete image from S3
        return this.S3.deleteObject(params).promise();
    }

    deleteAllImagesFromS3() {
        // set bucket params
        const params = {
            Bucket: this.bucketName,
        };

        // get all objects from bucket
        return this.S3.listObjects(params).promise()
            .then( (res) => {
                // if no objects in bucket
                if (res.Contents.length === 0) {
                    return Promise.resolve("No images to delete");
                }

                // get list of all objects
                const allObjectsFromBucket = res.Contents.map( (object) => ({Key: object.Key, }));
                
                // set delete params
                const deleteParams = {
                    Bucket: this.bucketName,
                    Delete: { Objects: allObjectsFromBucket}
                };

                // delete all objects from bucket
                return this.S3.deleteObjects(deleteParams).promise();
            } )
            .catch( (err) => {
                return Promise.reject(err);
            });
    }


    getImageFromS3() {

    }

    pushImageToS3() {

    }
}


let s3Manager = new S3Manager();
let response;

// response = s3Manager.deleteImageFromS3("test2.jpg");
response = s3Manager.deleteAllImagesFromS3();

response
    .then( (res) => {
        console.log("Success")
        console.log(res);
    } )
    .catch( (err) => {
        console.log("Error")
        console.log(err);
    } );

// export default S3Manager;