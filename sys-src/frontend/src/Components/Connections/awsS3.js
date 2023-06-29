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
 * 
 * deleteImageFromS3(), deleteAllImagesFromS3(), getImageFromS3(), pushImageToS3()
 * - are all async functions
 * - they all return a Promise
 * use it like this:
 * response = function();
 * response
 *    .then( (res) => { Do stuff with success }
 *    .catch( (err) => { Do stuff with error } );
 */
class S3Manager {
    constructor() {
        // process.env.AWS_ACCESS_KEY_ID = ;
        // process.env.AWS_SECRET_ACCESS_KEY = '';
        // process.env.AWS_DEFAULT_REGION = 'eu-central-1';

        // get credentials from env
        this.accessKeyId = 'AKIAZUXPDVDVIX7TZC6V'; // process.env.AWS_ACCESS_KEY_ID;
        this.secretAccessKey = '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'; // process.env.AWS_SECRET_ACCESS_KEY;
        this.region = 'eu-central-1'; // process.env.AWS_DEFAULT_REGION;

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

        /* 
        AWS.config.getCredentials((err) => {
            if (err) console.log("AWS Credentials error", err.stack);
            else console.log("AWS Credentials loaded successfully");
        });
        */

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
    async deleteImageFromS3(imageKey) {
        // set delete params

        if (imageKey === "defaultImage.jpg") {
            return Promise.reject(new Error("Can't delete default image with key: defaultImage.jpg"));
        }
        else {
            const params = {
                Bucket: this.bucketName,
                Key: imageKey,
            };
    
            // delete image from S3
            return this.S3.deleteObject(params).promise();
        }
    }

    /**
     * Delete all images from S3 Bucket
     * @returns {Promise} -> Promise of the delete action
     */
    async deleteAllImagesFromS3() {
        // set bucket params
        const params = {
            Bucket: this.bucketName,
        };

        // get all objects from bucket
        return this.S3.listObjects(params).promise()
            .then( (res) => {
                // if no objects in bucket
                if (res.Contents.length === 0) {
                    return Promise.reject(new Error("No images to delete"));
                }

                // get list of all objects
                const allObjectsFromBucket = res.Contents.map( (object) => ({Key: object.Key, }));
                const allObjectsFiltered = allObjectsFromBucket.filter( (element) => { return element.Key !== "defaultImage.jpg" });
                
                // set delete params
                const deleteParams = {
                    Bucket: this.bucketName,
                    Delete: { Objects: allObjectsFiltered}
                };

                // delete all objects from bucket
                return this.S3.deleteObjects(deleteParams).promise();
            } )
            .catch( (err) => {
                return Promise.reject(err);
            });
    }

    /**
     * Get one image from S3 Bucket
     * @param {string} imageKey -> name/path of the image to get
     * @returns {Promise}       -> Promise of the get action, data is in res.Body
     */
    async getImageFromS3(imageKey) {
        // define params
        const params = {
            Bucket: this.bucketName,
            Key: imageKey,
        };
        
        // get image from S3
        return this.S3.getObject(params).promise();
    }
    
    /**
     * 
     * Upload image to S3 Bucket
     * @param {image-object}      ->   image to upload to S3
     * @param {*} imageKey        ->   name/path of the image to upload
     * @return {Promise}          ->   Promise of the upload action
    */
    async pushImageToS3(image, imageKey, type="image/jpeg") {
        // define params 
        const params = {
            Bucket: this.bucketName,
            Key: imageKey,
            Body: image,
            ContentType: type
        };
  
        // upload image to S3
        return this.S3.putObject(params).promise();
    }
}

export default S3Manager;