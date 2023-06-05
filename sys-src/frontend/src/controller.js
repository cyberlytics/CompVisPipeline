class JSONTransformer {


    static transformJSON(json) {
        let obj = JSON.parse(JSON.stringify(json));
        console.log("Das originale JSON: "+ JSON.stringify(json))
        let transformedObj = [];

        for (let i = 0; i < obj.length; i++) {
            let currentObj = obj[i];
            let transformedParams = [];

            for (let j = 0; j < currentObj.params.length; j++) {
                let currentParam = currentObj.params[j];
                transformedParams.push(currentParam.value);
            }

            let transformedJSONObj = {
                id: currentObj.id,
                params: transformedParams,
            };

            transformedObj.push(transformedJSONObj);
        }
        console.log("Das neue JSON: " + JSON.stringify(transformedObj))
        return transformedObj;
    }


}

class Controller extends JSONTransformer {


    //Call to get available steps for
    static async getPipelineStepsFromBackend(set) {
        fetch('http://127.0.0.1:5000/available-steps')
            .then(response => response.json())
            .then(response => set(response))
    }

    static async sendPipelineSteps(props, setLoading) {
        const base = "http://127.0.0.1:5000/start-pipeline/";
        const path = base + props.originalImageID;
        setLoading(true);

        let newJSON = this.transformJSON(props.steps);


        try {
            const response = await fetch(path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newJSON)
            });
            setLoading(false);
        } catch (error) {
            console.error('Fehler beim Aufrufen des Endpunkts:', error);
            setLoading(false);
        }
    }
}

export default Controller;