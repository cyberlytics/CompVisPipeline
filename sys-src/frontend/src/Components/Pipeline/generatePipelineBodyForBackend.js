export const generatePipelineBodyForBackend = (pipelineSteps) => {
    console.log(pipelineSteps)

    //TODO: Implementieren und Testen

    //Ueber Pipelinesteps mappen und für jeden Step:
    // {
    //  id: step.id,
    //  params: [ueber alle parameter mappen und hier alle values auflisten]
    // },


    //Beispiel:
    // {
    //  id: 1,
    //  params: [1, 2, true]
    // },
    // {
    //  id: 5,
    //  params: ['gray', 4]
    // },
    //.....


    //Aktueller Aufbau von pipelineSteps, so wie es hier übergeben wird.
    // [
    //     {
    //       "id": 0,
    //       "info": "Reduce Noise using a Bilateral Filter",
    //       "params": [
    //         {
    //           "defaultValue": 3,
    //           "info": "Diameter of each pixel neighborhood used during filtering. Must be greater than 0",
    //           "title": "Neighborhood Diameter",
    //           "value": 3
    //         },
    //         {
    //           "defaultValue": 0.01,
    //           "info": "Filter sigma in the color space. Large value means other colors of neighborhood will be mixed together.",
    //           "title": "Sigma Color",
    //           "value": 0.01
    //         },
    //         {
    //           "defaultValue": 0.01,
    //           "info": "Filter sigma in the coordinate space. Large value means farther pixels will influence each other.",
    //           "title": "Sigma Space",
    //           "value": 0.01
    //         }
    //       ],
    //       "title": "Bilateral Filter",
    //       "uuid": "a0a303ec-6995-4f99-9415-79cd994c132b"
    //     },
    //     {
    //       "id": 3,
    //       "info": "Reduce noise using an averaging filter.",
    //       "params": [
    //         ...
    //       ],
    //       "title": "Averaging Filter",
    //       "uuid": "b08f8b12-381f-4ae7-ab2b-f82df7c84d3e"
    //     },
    //     {
    //       "id": 11,
    //       "info": "Dilates image using a specific structuring element.",
    //       "params": [
    //         ...
    //       ],
    //       "title": "Dilation",
    //       "uuid": "fc852037-df04-48a4-ba16-006612048a86"
    //     }
    //   ]
      
}