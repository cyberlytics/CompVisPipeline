import JSONTransformer from "./JSONTransformer";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const base = "http://127.0.0.1:5000";

class Controller {

  static abortController = new AbortController();

  //Function to abort a fetch
  static abortFetch(){
    Controller.abortController.abort();
    Controller.abortController = new AbortController();
  }

  //Call to get available steps for
  static async getPipelineStepsFromBackend(set) {
    fetch(base + '/available-steps',
      {
        signal: Controller.abortController.signal
      })
      .then(response => response.json())
      .then(response => set(response))
      .catch(error => {
        if (error.name === 'AbortError') {
          toast.error('Fetch available-steps aborted.');
        } 
        else {
          toast.error('An error occurred:', error);
        }
      });
  }

  //Call to login in into develop mode
  static async login(username, password) {
    const loginCredentials = {
      username: username,
      password: password
    };

    return fetch(base + '/login', {
      signal: Controller.abortController.signal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginCredentials)
    })
      .then(response => {
        toast.success('Successful login as a developer.');
        return response.status === 200
      })
      .catch(error => {
        if (error.name === 'AbortError') {
          toast.error('Fetch login aborted.');
        } 
        else {
          toast.error('Login request error:', error);
        }   
        return false;
      });
  }

  //Call to send Pipelinesteps to backend and receive results
  static async sendPipelineSteps(props) {
    const path = base + "/start-pipeline/" + props.originalImageID;
    let newJSON = JSONTransformer.transformJSON(props.steps)

    try {
      const response = await fetch(path, {
        signal: Controller.abortController.signal,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newJSON)
      });

      if (response.ok) {
        const result = await response.json();
        props.setPipelineResult(result)
        toast.success('Pipeline completed successfully.')
      }
      else {
        try {
          const errorResponse = await response.json();
          const errorMessage = errorResponse.error || 'Unknown error occurred';
          toast.error(errorMessage);
        }
        catch (error) {
          toast.error('Failed to process image: Unknown error occurred.');
        }
        props.setPipelineResult([])
      }
    }
    catch (error) {
      if (error.name === 'AbortError') {
        toast.error('Fetch start-pipeline aborted.');
      } 
      else {
        toast.error('An error occurred while communicating with the server.');
      }   
      props.setPipelineResult([])
    }
  }

  //Call to get imagemetadata and histId from backend
  static async getImageMetadataFromBackend(imageId, setMetadata) {
    fetch(base + `/image-metadata/` + imageId,
      {
        signal: Controller.abortController.signal
      })
      .then(response => response.json())
      .then(response => setMetadata(response))
      .catch(error => {
        if (error.name === 'AbortError') {
          toast.error('Fetch aborted');
        } 
        else {
          toast.error('Error retrieving image metadata:', error);
        }  
        setMetadata(null);
      });
  }

  // Call to get AI generated image from backend
  static async getAiImageFromBackend(setOriginalImageID, setCurrentImageID, setMetadata) {
    fetch(base + '/random-ai-fatcat', 
      {
        signal: Controller.abortController.signal
      })
      .then( response => response.json())
      .then( response => {
        // set the original image id to the id of the ai generated image
        setOriginalImageID(response.imageId);
        setCurrentImageID(response.imageId);
        // delete the id from the response
        delete response.imageId;
        // set the metadata of the ai generated image
        setMetadata(response);
        toast.success('AI generated image retrieved successfully.');
      })
      .catch(error => {
        if (error.name === 'AbortError') {
          toast.error('Fetch aborted');
        }
        else {
          toast.error('Error retrieving ai generated image', error);
        }
        setMetadata(null);
      });

  }
}

export default Controller;