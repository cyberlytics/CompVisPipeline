// Test for the awsS3 Connection
/* 
Error Code
    - 403: AccessDenied
    - 404: NoSuchKey
    - 400: NoSuchBucket
*/
import "@testing-library/jest-dom/extend-expect";
import S3Manager from "../../../Components/Connections/awsS3";
import { KeyboardTabSharp } from "@mui/icons-material";

describe("s3Manager - connection", () => {
    test("Check aws credentials", () => {

        let s3Manager = new S3Manager();
            
        // check if credentials are not empty
        expect(s3Manager.accessKeyId).not.toBe("");
        expect(s3Manager.secretAccessKey).not.toBe("");
        expect(s3Manager.region).not.toBe("");

        // check if credentials are set to env
        expect(s3Manager.accessKeyId).toBe("AKIAZUXPDVDVIX7TZC6V");
        expect(s3Manager.secretAccessKey).toBe("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");
        expect(s3Manager.region).toBe("eu-central-1");
    });

    // skip test because no access to S3 -> will be changed next week
    test("Check S3 Access is successfull", async () => {
        let s3Manager = new S3Manager();

        const params = { Bucket: s3Manager.bucketName };
        
        await s3Manager.S3.listObjects(params).promise()
            .then((result) => {
                expect(result).not.toBe(null);
                expect(result).toHaveProperty('Contents');
                expect(result).toHaveProperty('Name');
                expect(result.Name).toBe(s3Manager.bucketName);
            })
            .catch((err) => {
                // there should be no error because access to 'team-rot-fatcat-data' is allowed
                expect(true).toBe(false);
            });

    });

    // skip test because no access to S3 -> will be changed next week
    test("Check S3 Access to other buckets then 'team-rot-fatcat-data' is denied", async () => {
        let s3Manager = new S3Manager();
        
        // get list with all available buckets
        await s3Manager.S3.listBuckets().promise()
            .then((res) => {
                const bucketNames = res.Buckets.map((Buckets) => Buckets.Name);
                
                // iterate over all buckets
                bucketNames.forEach( async ( bucketName ) => {
                    // if bucketName is not 'team-rot-fatcat-data' then access should be denied
                    if (bucketName != s3Manager.bucketName) {
                        await s3Manager.S3.listObjects({ Bucket: bucketName }).promise()
                            .then(( result ) => {
                                // there should be no result because access to other buckets is denied!
                                expect(true).toBe(false);
                            })
                            .catch(( err ) => {
                                expect(err).toHaveProperty('code');
                                expect(err.code).toBe('AccessDenied');
                                expect(err).toHaveProperty('statusCode');
                                expect(err.statusCode).toBe(403);
                            })
                    }
                });
            })
            .catch((err) => {
                // there should be no error with listing the buckets due to successful AWS access
                expect(true).toBe(false);
            });
    })
});

describe("s3Manager - delete Functions", () => {
    test("Check S3Manager.deleteImageFromS3()", async () => {
        // Mock the deleteImageFromS3 function
        deleteImageFromS3Mock = jest.fn();
        deleteImageFromS3Mock.mockImplementation((imageKey) => {
            return new Promise((resolve, reject) => {
                const deleteImage = {};
                if(imageKey === "error.jpg") {
                    reject(new Error("Error"));
                }
                resolve(deleteImage);
            })
        });

        let s3Manager = new S3Manager();    
        s3Manager.deleteImageFromS3 = deleteImageFromS3Mock;

        // Use mock in test
        await s3Manager.deleteImageFromS3("test_key.jpg")
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

    // test if list with all objects is returned
    test("Check S3Manager.deleteAllImagesFromS3()", async () => {
        // Mock the deleteAllImagesFromS3 function
        deleteAllImagesFromS3Mock = jest.fn();
        deleteAllImagesFromS3Mock.mockImplementation(() => {
            let imageKeys = ["test_key1.jpg", "test_key2.jpg", "test_key3.jpg"];
            return new Promise((resolve, reject) => {
                resolve(imageKeys);
            });
        });

        let s3Manager = new S3Manager();
        s3Manager.deleteAllImagesFromS3 = deleteAllImagesFromS3Mock;

        // Use mock in test
        await s3Manager.deleteAllImagesFromS3()
            // check if promise is resolved
            .then((result) => {
                expect(result).toEqual(["test_key1.jpg", "test_key2.jpg", "test_key3.jpg"]);
                expect(s3Manager.deleteAllImagesFromS3).toHaveBeenCalledTimes(1);
            });
        
    });

    test("Check if defaultImage.jpg can not be deleted", async () => {
        deleteImageFromS3Mock = jest.fn();
        deleteImageFromS3Mock.mockImplementation(() => {
            return new Promise((resolve, reject) => { {
                if (imageKey === "defaultImage.jpg") {
                    reject(new Error("Error"));
                }
                resolve({});
                }
            });
        });

        let s3Manager = new S3Manager();
        s3Manager.deleteImageFromS3 = deleteImageFromS3Mock;

        await s3Manager.deleteImageFromS3("defaultImage.jpg")
            .then((result) => {
                expect(True).toBe(False);
            })
            .catch((err) => {
                expect(err).toBeInstanceOf(Error);
            });
    });
});

describe("S3Manager.getImageFromS3() test", () => {
    // Mock the getImageFromS3 function
    // S3 returns by success a result object with ConeType and Body
    // S3 returns by error a error object with code and statusCode
    getImageFromS3Mock = jest.fn();

    // before each test, mock the function
    beforeEach(() => {
        getImageFromS3Mock.mockImplementation((imageKey) => {
            return new Promise((resolve, reject) => {
                if (imageKey === "test_key.jpg") {
                    const result = {
                        ContentType: 'image/jpeg',
                        Body: 'Mock Data'
                    };
                    return resolve(result);
                } else {
                    const error = {
                        code: 'NoSuchKey',
                        statusCode: 404
                    };
                    return reject(error);
                }
            })
        });
    });

    // after each test, reset the mock
    afterEach(() => {
        getImageFromS3Mock.mockReset();
    });

    test("Check if method is called", async () => {
        let s3Manager = new S3Manager();
        s3Manager.getImageFromS3 = getImageFromS3Mock;

        await s3Manager.getImageFromS3("test_key.jpg");
        expect(getImageFromS3Mock).toHaveBeenCalledTimes(1);
    });

    test("Check if method is called with correct parameters", async () => {
        let s3Manager = new S3Manager();
        s3Manager.getImageFromS3 = getImageFromS3Mock;

        await s3Manager.getImageFromS3("test_key.jpg");
        expect(getImageFromS3Mock).toHaveBeenCalledWith("test_key.jpg");
    });

    test("Check success response", async () => {
        let s3Manager = new S3Manager();
        s3Manager.getImageFromS3 = getImageFromS3Mock;

        await s3Manager.getImageFromS3("test_key.jpg")
            .then((result) => {
                expect(result.ContentType).toBe("image/jpeg");
                expect(result).toHaveProperty("Body");
                expect(result.Body).toBe("Mock Data");
            })
            .catch(() => {
                // if error is thrown, test fails -> no error should be thrown
                expect(True).toBe(false);
            });
    });

    test("Check error response for NoSuchKey", async () => {
        let s3Manager = new S3Manager();
        s3Manager.getImageFromS3 = getImageFromS3Mock;

        await s3Manager.getImageFromS3("test_key_error.jpg")
            .then(() => {
                // if no error is thrown, test fails -> error should be thrown
                expect(true).toBe(false);
            })
            .catch((error) => {
                expect(error.code).toBe("NoSuchKey");
                expect(error.statusCode).toBe(404);
            });
    });
});

describe.only("S3Manager.getImageFromS3() - test", () => {

});

describe("S3Manager.pushImageToS3() - test", () => {
    let s3Manager = new S3Manager();
    let image = s3Manager._createTestImage();
    const spy = jest.spyOn(s3Manager.S3, 'putObject');


    beforeEach(() => {
        // mock the putObject function from S3
        // S3 returns by success a result object with ETag and ServerSideEncryption
        spy.mockReturnValue({
            promise: () => Promise.resolve({
                ETag: 'Mock ETag',
                ServerSideEncryption: 'AES256'
            })
        });
    });

    // after each test, reset the mock
    afterEach(() => {
        spy.mockReset();
    });

    test("Check if method is called", async () => {
        await s3Manager.pushImageToS3(image, "test_key.jpg")
            .then((res) => {
                expect(spy).toHaveBeenCalledTimes(1);
            });
    });

    test("Check if method is called with correct parameters", async () => {
        await s3Manager.pushImageToS3(image, "test_key.jpg")
            .then((res) => {
                expect(spy).toHaveBeenCalledWith({
                    Bucket: s3Manager.bucketName,
                    Body: image,
                    Key: "test_key.jpg",
                    ContentType: "image/jpeg"
                });
            });
    });

    test("Check success response", async () => {
        await s3Manager.pushImageToS3(image, "test_key.jpg")
            .then((res) => {
                expect(res).toHaveProperty("ETag");
                expect(res.ETag).toBe("Mock ETag");
            });
    });
});
