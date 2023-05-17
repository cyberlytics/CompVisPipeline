class Controller {

    //example rest call
    static async calculateClick (number1, number2) {
        const response = await fetch('http://127.0.0.1:5000/get-sum?x=' + number1 + '&y=' + number2)
        const responseText = await response.text()
        return responseText
    }
  
  }

  export default Controller;