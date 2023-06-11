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

    static async sendPipelineSteps(props, setLoading) {
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
            if(response.ok){
                window.alert("Pipeline started successfully");
            }
            else{
                window.alert("An error occured - Pipeline started unsuccessfully - Statuscode: "+ response.status);
            }

        } catch (error) {
            window.alert("An error occured");
            console.error('Fehler beim Aufrufen des Endpunkts:', error);
            setLoading(false);
        }
    }

    //Call to get imagemetadata from backend
    static async getImageMetadataFromBackend(imageId, setMetadata) {
      fetch(`http://127.0.0.1:5000/image-metadata/${imageId}`)
        .then(response => response.json())
        .then(response => setMetadata(response))
        .catch(error => {
          console.log('Error retrieving image metadata:', error);
          setMetadata(null);
        });
    }
}

export default Controller;
