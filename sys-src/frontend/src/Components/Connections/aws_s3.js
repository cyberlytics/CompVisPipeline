// Connection for AWS S3
// S3.headBucket()
// headBucket(params = {}, callback) ⇒ AWS.Request
// This action is useful to determine if a bucket exists and you have permission to access it.
/*
Test AWSSDK
    Check Credentials
*/

/*
Test S3Connection
    const params = { Bucket: bucketName };

    console.log(s3.headBucket(params, function(err, data) {
        if (err) {
            console.log("Zugriff auf S3 Bucket fehlgeschlagen");
        } else {
            console.log("Zugriff auf S3 Bucket erfolgreich");
        }
    }));
*/

/*
DelteAllObjectsFromBucket()
    Check data.deleted.length === objectsToDelete.length
*/


class S3Manager {
    // set AWS credentials and bucket name
    constructor() {
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
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            region: region,
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

    deleteImageFromS3() {

    }

    deleteAllImagesFromS3() {

    }

    getImageFromS3() {

    }

    pushImageToS3() {

    }
}




/**
 * Set AWS Credentials from ENV and returns the AWS Instance
 * @return {AWS-object} AWS -> AWS Object
 */
function getAWSSDK() {
  // load AWS SDK
  var AWS = require("aws-sdk");

  // get credentials from env
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_DEFAULT_REGION;

  // set credentials
  AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region,
  });

  AWS.config.getCredentials((err) => {
    if (err) console.log("AWS Credentials error", err.stack);
    else console.log("AWS Credentials loaded successfully");
  });

  return AWS;
}

/**
 * Get connection to S3 Buckets
 * @param {AWS-object} AWS
 * @return {S3-object} S3 -> S3 Instance
 */
function getS3Connection(AWS) {
  // Creat S3 instance
  let S3 = new AWS.S3();

  return S3;
}

/**
 * Delete one object from S3 Bucket
 * @param {S3-object} S3
 * @param {string} bucketName  ->   Name of the bucket to delete from
 * @param {string} imageName   ->   Name/Path of the image to delete
 */
function deleteImageFromS3(S3, bucketName = "team-rot-fatcat-data", imageName) {
  // deleteObject()
  const params = {
    Bucket: bucketName,
    Key: imageName,
  };

  /*
    return S3.deleteObject(params, (err, data) => { 
        if (err) console.log("Error deleting image from S3");
        else console.log("Object deleted from S3");
    }).promise();
    */

  return S3.deleteObject(params).promise();
}

/**
 * Delete all objects from S3 Bucket
 * @param {S3-object} S3
 * @param {string} bucketName  ->   Name of the bucket to delete from
 */
function deleteAllImagesFromS3(S3, bucketName = "team-rot-fatcat-data") {
  // Get list of all objects in bucket
  const params = { Bucket: bucketName };

  return S3.listObjects(params)
    .promise()
    .then((res) => {
      // if no objects in bucket
      if (res.Contents.length === 0) {
        return Promise.resolve("No objects in bucket");
      }

      // get list of all objects
      const allObjectsFromBucket = res.Contents.map((object) => ({
        Key: object.Key,
      }));

      // define params for deleteObjects()
      const deleteObjectsParams = {
        Bucket: params.Bucket,
        Delete: { Objects: allObjectsFromBucket },
      };

      // delete all objects from bucket
      return S3.deleteObjects(deleteObjectsParams)
        .promise()
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}


/**
 * Get image from S3 Bucket
 * @param {S3-object} S3      ->   S3 connection
 * @param {string} bucketName ->   name of the S3 bucket
 * @param {*} imageKey        ->   name/path of the image
 * @return {image-object}     ->   image from S3 
*/
function getImageFromS3(S3, bucketName = "team-rot-fatcat-data", imageKey) {
    // define params
    const params = {
        Bucket: bucketName,
        Key: imageKey,
    };

    // get image from S3
    return S3.getObject(params).promise();
}


/**
 * Upload image to S3 Bucket
 * @param {S3-object} S3      ->   S3 connection
 * @param {string} bucketName ->   name of the S3 bucket
 * @param {image-object}      ->   image to upload to S3
 * @param {*} imageKey        ->   name/path of the image to upload
*/
function pushImageToS3(S3, bucketName = "team-rot-fatcat-data", image, imageKey) {
    // define params 
    const params = {
        Bucket: bucketName,
        Key: imageKey,
        Body: image,
        ContentType: "image/jpeg",
    };
  
    // upload image to S3
    return S3.putObject(params).promise();
}


// Test script
let response;

// Get AWS SDK
let AWS = getAWSSDK();
console.log(AWS.config.credentials.accessKeyId);

// Get S3 connection
let S3_1 = getS3Connection(AWS, "team-rot-fatcat-data");

// Delete image from S3
// response = deleteImageFromS3(S3_1, 'team-rot-fatcat-data', 'test.jpg');


// Delete all images from S3
// response = deleteAllImagesFromS3(S3_1, "team-rot-fatcat-data");

// Push image to S3
// read image from file
const fs = require("fs");
const path = "/Users/andrekestler/Downloads/test2.jpg"
const image = fs.readFileSync(path);

response = getImageFromS3(S3_1, "team-rot-fatcat-data", "test.jpg");

response
    .then( (res) => {
        console.log("Success");
        console.log(res);
    } )
    .catch( (err) => {
        console.log("Error code: ", err.code);
    } );

response = pushImageToS3(S3_1, "team-rot-fatcat-data", image, "test2.jpg");

response
    .then( (res) => {
        console.log("Success");
        console.log(res);
    } )
    .catch( (err) => {
        console.log("Error code: ", err.code);
    } );