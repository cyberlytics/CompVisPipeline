import JSONTransformer from "./JSONTransformer";

const base = "http://127.0.0.1:5000";

class Controller {

    //Call to get available steps for
    static async getPipelineStepsFromBackend(set) {
        fetch(base + '/available-steps')
            .then(response => response.json())
            .then(response => set(response))
    }

    //Call to login in into develop mode
    static async login(username, password) {
        const loginCredentials = {
          username: username,
          password: password
        };

        return fetch(base + '/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginCredentials)
        })
        .then(response => {
          return response.status === 200
        })
        .catch(error => {
          console.log('Login request error:', error);
          return false;
        });
      }

      //Call to send Pipelinesteps to backend and receive results
      static async sendPipelineSteps(props, setLoading, setPipelineResult) {
        const path = base + "/start-pipeline/" + props.originalImageID;
        setLoading(true);
      
        let newJSON = JSONTransformer.transformJSON(props.steps)
      
        try {
          const response = await fetch(path, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newJSON)
          });
          setLoading(false);
      
          if (response.ok) {
            const result = await response.json();
            props.setPipelineResult(result)
          } 
          else {
            try {
              const errorResponse = await response.json();
              const errorMessage = errorResponse.error || 'Unknown error occurred';
              window.alert(errorMessage);
              console.error(errorMessage);
            } 
            catch (error) {
              window.alert('Failed to process image: Unknown error occurred');
              console.error('Failed to process image: Unknown error occurred');
            }
          }
        } 
        catch (error) {
          window.alert('An error occurred while communicating with the server');
          console.error('An error occurred while communicating with the server');
        }
    }

    //Call to get imagemetadata and histId from backend
    static async getImageMetadataFromBackend(imageId, setMetadata) {
      fetch(base + `/image-metadata/` + imageId)
        .then(response => response.json())
        .then(response => setMetadata(response))
        .catch(error => {
          console.log('Error retrieving image metadata:', error);
          setMetadata(null);
        });
    }
}

export default Controller;