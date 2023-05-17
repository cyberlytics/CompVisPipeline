class Controller {

    //Call to get available steps for
    static async getAvailableSteps () {
        const response = await fetch('http://127.0.0.1:5000/available-steps')
        const responseJson = await response.json()
        return responseJson
    }

  }

  export default Controller;