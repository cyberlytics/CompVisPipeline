// Connection for AWS S3
// S3.headBucket()
// headBucket(params = {}, callback) ⇒ AWS.Request
// This action is useful to determine if a bucket exists and you have permission to access it.

// Get AWS SDK
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
        region: region
    })

    AWS.config.getCredentials(function(err) {
      if (err) console.log(err.stack);
      // credentials not loaded
      // TODO: handle error
      else {
        console.log("AWS Credentials loaded successfully");     
      }
    });

    return AWS;
}

// Get connection to S3
function getS3Connection(AWS, bucketName='team-rot-fatcat-data') {
    // Creat S3 instance
    let s3 = new AWS.S3();

    const params = { Bucket: bucketName };

    console.log(s3.headBucket(params, function(err, data) {
        if (err) {
            console.log("Zugriff auf S3 Bucket fehlgeschlagen");
        } else {
            console.log("Zugriff auf S3 Bucket erfolgreich");
        }
    }));

    return s3;
}

function deleteImageFromS3() {

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

let S3_1 = getS3Connection(AWS, 'team-rot-fatcat-data');
let S3_2 = getS3Connection(AWS, 'bdcc-testbucket');
