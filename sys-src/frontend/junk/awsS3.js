
class S3Manager {
    constructor() {
        this.initialize();
    }

    async initialize() {
        try {
            const response = await Controller.getSessionTokenFromBackend();

            console.log("in S3Manager: ", response);

            this.accessKeyId = response.accessKeyId;
            this.secretAccessKey = response.secretAccessKey;
            this.region = response.region;
        } catch (error) {
            console.log("Error in S3Manager: ", error);
        }
    }
}