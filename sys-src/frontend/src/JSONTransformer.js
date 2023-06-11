export default class JSONTransformer {
    static transformJSON(json) {
        let obj = undefined
        if(!this.isJsonString(json)){
            obj = JSON.parse(JSON.stringify(json))
        }
        else{
            obj = JSON.parse((json));
        }

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
        return transformedObj;
    }

    static isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

}