// Test for the awsS3 Connection
/* 
Error Code
    - 403: AccessDenied
    - 404: NoSuchKey
    - 400: NoSuchBucket
*/
import S3Manager from "../../../Components/Connections/awsS3";

describe("s3Manager - connection", () => {
    test("Check aws credentials", () => {

        let s3Manager = new S3Manager();
            
        // check if credentials are not empty
        expect(s3Manager.accessKeyId).not.toBe("");
        expect(s3Manager.secretAccessKey).not.toBe("");
        expect(s3Manager.region).not.toBe("");

        // check if credentials are set to env
        expect(s3Manager.accessKeyId).toBe(process.env.AWS_ACCESS_KEY_ID);
        expect(s3Manager.secretAccessKey).toBe(process.env.AWS_SECRET_ACCESS_KEY);
        expect(s3Manager.region).toBe(process.env.AWS_DEFAULT_REGION);
    });

    test("Check S3 Access is successfull", () => {
        //TODO
    });

    test("Check S3 Access is denied", () => {
        //TODO
    })
});

describe("s3Manager - delete Functions", () => {
    test("Check S3Manager.deleteImageFromS3", async () => {
        // Mock the deleteImageFromS3 function
        deleteImageFromS3Mock = jest.fn();
        deleteImageFromS3Mock.mockImplementation((imageKey) => {
            return new Promise((resolve, reject) => {
                const deleteImage = {};
                resolve(deleteImage);
            })
        });

        let s3Manager = new S3Manager();    
        s3Manager.deleteImageFromS3 = deleteImageFromS3Mock;

        // Use mock in test
        s3Manager.deleteImageFromS3("test_key.jpg")
            // check if promise is resolved
            .then((result) => {
                // Check if promise is empty 
                expect(result).toEqual({});
                // Check if mock was 1 time called
                expect(deleteImageFromS3Mock).toHaveBeenCalledTimes(1);
                // Check if mock was called with correct parameters
                expect(deleteImageFromS3Mock).toHaveBeenCalledWith("test_key.jpg");
            });
    });
});