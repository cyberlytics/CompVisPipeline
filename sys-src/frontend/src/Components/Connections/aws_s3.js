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

/**
 * Set AWS Credentials from ENV and returns the AWS Instance
 * @return {object} AWS -> AWS Object
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
 * @param {object} AWS
 * @return {object} S3 -> S3 Instance
 */
function getS3Connection(AWS) {
  // Creat S3 instance
  let S3 = new AWS.S3();

  return S3;
}

/**
 * Delete one object from S3 Bucket
 * @param {object} S3
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
 * @param {object} S3
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

// Get image from S3
function getImageFromS3(S3, bucketName = "team-rot-fatcat-data", imageName) {}

// Upload image to S3
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
response = pushImageToS3(S3_1, "team-rot-fatcat-data", image, "test.jpg");


response
    .then((res) => {
        console.log("Success", res);
    })
    .catch((err) => {
        console.log("Error");
        console.log(err);
    });
