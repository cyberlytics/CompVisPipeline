// Connection for AWS S3

// Get AWS SDK
function getAWSSDK() {
    var AWS = require("aws-sdk");

    // get credentials from env
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const region = process.env.AWS_DEFAULT_REGION;


    // set credentials
    AWS.config.update({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
        region: region
    })

    AWS.config.getCredentials(function(err) {
      if (err) console.log(err.stack);
      // credentials not loaded
      else {
        console.log("AWS Credentials loaded successfully");     
      }
    });

    return AWS;
}

// Get connection to S3
function getS3Connection(AWS, bucketName='team-rot-fatcat-data') {

}


// Get image from S3
function getImageFromS3() {

}


// Upload image to S3
function pushImageToS3() {

}

// Test script
let AWS = getAWSSDK();

console.log(AWS.config.credentials.accessKeyId);