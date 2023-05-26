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
});

describe("s3Manager.deleteImageFromS3()", () => {
    test("Check delete Image from S3", async () => {
        // Mock the deleteImageFromS3 function
        deleteImageFromS3Mock = jest.fn();
        deleteImageFromS3Mock.mockImplementation((imageKey) => {
            return new Promise((resolve, reject) => {
                resolve("Success");
            })
        });

        let s3Manager = new S3Manager();    
        s3Manager.deleteImageFromS3 = deleteImageFromS3Mock;

        // Use mock in test
        const response = await s3Manager.deleteImageFromS3("test_key.jpg")
        expect(response).toBe("Success");
        expect(deleteImageFromS3Mock).toHaveBeenCalledTimes(1);
    });



});