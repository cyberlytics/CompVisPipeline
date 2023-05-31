class Controller {


    //Call to get available steps for
    static async getPipelineStepsFromBackend(set) {
        fetch('http://127.0.0.1:5000/available-steps')
            .then(response => response.json())
            .then(response => set(response))
    }

    static async sendPipelineSteps(props, setLoading, imageID) {
        const base = "http://127.0.0.1:5000/start-pipeline/";
        const path = base + imageID;
        setLoading(true);

        try {
            const response = await fetch(path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(props.steps)
            });
            setLoading(false);
        } catch (error) {
            console.error('Fehler beim Aufrufen des Endpunkts:', error);
            setLoading(false);
        }
    }


}

export default Controller;