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
function getS3Connection(AWS) {
    // Creat S3 instance
    let s3 = new AWS.S3();

    return s3;
}

function deleteImageFromS3(S3, bucketName='team-rot-fatcat-data', imageName) {
    // deleteObject()
    let params = {
        Bucket: bucketName,
        Key: imageName
    }

    S3.deleteObject(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log("Image deleted from S3");           // successful response
    });
}

function deleteAllImagesFromS3(S3, bucketName='team-rot-fatcat-data') {
    // deleteObjects()
}


// Get image from S3
function getImageFromS3(S3, bucketName='team-rot-fatcat-data', imageName) {

}


// Upload image to S3
function pushImageToS3(S3, bucketName='team-rot-fatcat-data', image) {

}


// Test script
let AWS = getAWSSDK();

console.log(AWS.config.credentials.accessKeyId);

let S3_1 = getS3Connection(AWS, 'team-rot-fatcat-data');
let S3_2 = getS3Connection(AWS, 'bdcc-testbucket');
