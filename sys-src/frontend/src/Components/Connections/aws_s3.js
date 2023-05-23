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
    const params = {
        Bucket: bucketName,
        Key: imageName
    }

    //S3.deleteObject(params, (err, data) => { return data })

    S3.deleteObject(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log("Image deleted from S3");           // successful response
    });
}

function deleteAllImagesFromS3(S3, bucketName='team-rot-fatcat-data') {
    // Get list of all objects in bucket
    const params = { Bucket: bucketName };

    let data = S3.listObjects(params, function(err, data) {
        if (err) {
            console.log("Error getting objects from S3" , err);
        } else {
            // get list of all objects
            const allObjectsFromBucket = data.Contents.map((object) => ({ Key: object.Key }));

            console.log(allObjectsFromBucket);

            if (allObjectsFromBucket.length > 0) {
                // Define params for deleteObjects()
                const deleteObjectsParams = {
                    Bucket: params.Bucket,
                    Delete: { Objects: allObjectsFromBucket }
                };
                return data = S3.deleteObjects(deleteObjectsParams, (err, data) => { return data } );

            } else { 
                return null;
            }
        }
    });

    return data;
}


// Get image from S3
function getImageFromS3(S3, bucketName='team-rot-fatcat-data', imageName) {

}


// Upload image to S3
function pushImageToS3(S3, bucketName='team-rot-fatcat-data', image) {

}


// Test script
// Get AWS SDK
let AWS = getAWSSDK();

console.log(AWS.config.credentials.accessKeyId);

// Get S3 connection
let S3_1 = getS3Connection(AWS, 'team-rot-fatcat-data');

// Delete image from S3

// Delete all images from S3
data = deleteAllImagesFromS3(S3_1);