// Connection for AWS S3

const STR_BUCKET_NAME = 'team-rot-fatcat-data';

// Get AWS SDK
function getAWSSDK() {
    var AWS = require("aws-sdk");

    AWS.config.getCredentials(function(err) {
      if (err) console.log(err.stack);
      // credentials not loaded
      else {

        console.log("Access key:", AWS.config.credentials.accessKeyId);
        console.log("Access key:", AWS.config.credentials.secretAccessKey);
        
        // set region from env
        const region = process.env.AWS_DEFAULT_REGION;
        AWS.config.update({region: region});

        console.log("Access key:", AWS.config.region);
      }
    });

}

// Get connection to S3
function getS3Connection() {

}


// Get image from S3
function getImageFromS3() {

}


// Upload image to S3
function pushImageToS3() {

}

// Test script
getAWSSDK();