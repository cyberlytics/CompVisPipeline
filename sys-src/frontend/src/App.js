import React, { useState, useEffect } from 'react';
import Header from './Components/Header/header';
import Upload from './Components/upload';
import ImageView from './Components/imageView';
import ImageDetails from './Components/imageDetails';
import Pipeline from './Components/Pipeline/pipeline';
import AvailablePipelineSteps from './Components/AvailableSteps/availablePipelineSteps';
import StartPipeline from './Components/startPipeline';
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import WindowToSmall from "./Components/windowToSmall";

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f0f0f0',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [theme, setTheme] = useState(true)
  const appliedTheme = createTheme(theme ? lightTheme : darkTheme)
  const [steps, setSteps] = useState([]);
  const [pipelineResult, setPipelineResult] = useState([]);

  const [originalImageID, setOriginalImageID] = useState(null);
  const [currentImageID, setCurrentImageID] = useState(null);
  const [currentHistogramIDandMetadata, setCurrentHistogramIDandMetadata] = useState(null);
  const [developMode, setDevelopMode] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Update the window size when resized
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if(pipelineResult.length != 0){
      let result = pipelineResult.result
      setCurrentImageID(result[result.length - 1].imageId)
      setCurrentHistogramIDandMetadata(result[result.length - 1])
    }
  }, [pipelineResult]);

  return (
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline className={'App-CssBaseline'} />
        <DndProvider className={'App-DndProvider'} backend={HTML5Backend}>
          <Grid style={{ paddingTop: 20, paddingRight: 10, paddingBottom: 10, paddingLeft: 10 }}>
            <Header theme={theme} setTheme={setTheme} developMode={developMode} setDevelopMode={setDevelopMode} />
          </Grid>

          {windowSize >= 900 ? (
              <Grid container style={{ paddingTop: 0, paddingRight: 10, paddingBottom: 10, paddingLeft: 10 }}>
                <Grid item md={4} style={{ paddingRight: 10 }}>
                  <Grid container direction="column">
                    <Grid item xs style={{ paddingBottom: 10 }}>
                      <Upload setOriginalImageID={setOriginalImageID} setCurrentImageID={setCurrentImageID} setCurrentHistogramIDandMetadata={setCurrentHistogramIDandMetadata} />
                    </Grid>
                    <Grid item xs style={{ paddingBottom: 10 }}>
                      <ImageView currentImageID={currentImageID} />
                    </Grid>
                    <Grid item xs>
                      <ImageDetails currentHistogramIDandMetadata={currentHistogramIDandMetadata}/>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item md={4} style={{ paddingRight: 10 }}>
                  <Grid container direction="column">
                    <Grid item xs style={{ paddingBottom: 10 }}>
                      <Pipeline steps={steps} setSteps={setSteps} />
                    </Grid>
                    <Grid item xs>
                      <StartPipeline steps={steps} originalImageID={originalImageID} setPipelineResult={setPipelineResult} isLoading={isLoading} setIsLoading={setIsLoading} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item md={4}>
                  <Grid container direction="column">
                    <Grid item xs>
                      <AvailablePipelineSteps />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
          ) : (
              <WindowToSmall/>
          )}
        </DndProvider>
      </ThemeProvider>
  );
}

export default App;