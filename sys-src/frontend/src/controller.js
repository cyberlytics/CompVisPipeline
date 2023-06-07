class Controller {

    //Call to get available steps for
    static async getPipelineStepsFromBackend(set) {
        fetch('http://127.0.0.1:5000/available-steps')
            .then(response => response.json())
            .then(response => set(response))
    }

    //Call to login in into develop mode
    static async login(username, password) {
        const loginCredentials = {
          username: username,
          password: password
        };
    
        return fetch('http://127.0.0.1:5000/login', {
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
}

export default Controller;