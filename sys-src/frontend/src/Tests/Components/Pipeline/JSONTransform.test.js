import React from "react";
import "@testing-library/jest-dom/extend-expect";
import JSONTransformer from "../../../JSONTransformer";


describe('JSONT', () => {
        test('should transform a given JSON array correctly', () => {

            const jsonString = `[{"title":"Bilateral Filter","params":[{"defaultValue":3,"info":"Diameter of each pixel neighborhood used during filtering. Must be greater than 0","title":"Neighborhood Diameter","value":3},{"defaultValue":0.01,"info":"Filter sigma in the color space. Large value means farther colors of neigborhood will be mixed together.","title":"Sigma Color","value":0.02},{"defaultValue":0.01,"info":"Filter sigma in the coordinate space. Large value means farther pixels will influence each other.","title":"Sigma Space","value":0.02}],"info":"Reduce Noise using a Bilateral Filter","id":0,"uuid":"ee8fd13a-8b65-4433-b146-8aa0c4a4b940"},{"title":"Gaussian Blur","params":[{"defaultValue":3,"info":"Width of kernel used for gaussian blur. Must be bigger than 0","title":"Kernel Width","value":5},{"defaultValue":3,"info":"Height of kernel used for gaussian blur. Must be bigger than 0","title":"Kernel Height","value":5},{"defaultValue":0,"info":"Standard deviation of gaussian kernel in X direction","title":"Sigma X","value":0},{"defaultValue":0,"info":"Standard deviation of gaussian kernel in Y direction","title":"Sigma Y","value":0}],"info":"Reduce Noise using a Gaussian Blur","id":1,"uuid":"2a38c999-cb2f-4b7d-9a99-0b65ba66c09a"},{"title":"Anisotropic Diffusion","params":[{"defaultValue":0.1,"info":"Amount of time to step forward by in each iteration. Must be positive, normally between 0 and 1.","title":"Alpha Value","value":0.1},{"defaultValue":1,"info":"Sensitivity to the edges.","title":"Sensitivity","value":1},{"defaultValue":1,"info":"Number of iterations. Must be bigger than 0","title":"Iterations","value":1}],"info":"Reduce noise using anisotropic difussion.","id":2,"uuid":"a7ddb541-d198-40b6-b1c5-d9a317d60e2c"}]`;

            const expectedJSONString = '[{"id":0,"params":[3,0.02,0.02]},{"id":1,"params":[5,5,0,0]},{"id":2,"params":[0.1,1,1]}]'
            
            const transformedJSON = JSON.stringify(JSONTransformer.transformJSON(jsonString));

            expect(transformedJSON).toEqual(expectedJSONString);
        });

        test('should transform an empty JSON array correctly', () => {
            const inputJSON = [];

            const expectedOutput = [];

            const transformedJSON = JSONTransformer.transformJSON(inputJSON);

            expect(transformedJSON).toEqual(expectedOutput);
        });
});

