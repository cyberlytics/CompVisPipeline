import Controller from "../../controller";


static async getSessionTokenFromBackend() {
    await fetch(base+'/get_token', {
      signal: Controller.abortController.signal,
    })
    .then(response => response.json())
    .then(response => {
      console.log("in controller: ", response);
      return {accessKeyId: response.accessKeyId, secretAccessKey: response.secretAccessKey, region: response.region};
    })
    .catch(error => {
      if (error.name === 'AbortError') {
        toast.error('Fetch aborted');
      }
      else {
        toast.error('Error retrieving session token:', error);
      }
    });
  }