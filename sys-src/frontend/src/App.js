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
import LoadingWindow from './ModalWindow/LoadingWindow';
import Controller from './controller';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [headerIsLoading, setHeaderIsLoading] = useState(false)
  const [uploadIsLoading, setUploadIsLoading] = useState(false)
  const [imageDetailsIsLoading, setImageDetailsIsLoading] = useState(false)
  const [startPipelineIsLoading, setStartpipelineIsLoading] = useState(false)
  const [loadingScreenIsOpen, setLoadingScreenIsOpen] = useState(false);

  // Update isLoading Hook pending on other loading processes
  useEffect(() => {
    const componentsAreLoading = headerIsLoading || uploadIsLoading || imageDetailsIsLoading || startPipelineIsLoading;
    setIsLoading(componentsAreLoading);
  }, [headerIsLoading, uploadIsLoading, imageDetailsIsLoading, startPipelineIsLoading]);

  useEffect(() => {
    if (uploadIsLoading === true) {
      setImageDetailsIsLoading(true);
    }
  }, [uploadIsLoading]);

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
    if (pipelineResult.length !== 0) {
      let result = pipelineResult.result
      setCurrentImageID(result[result.length - 1].imageId)
      setImageDetailsIsLoading(true);
      setCurrentHistogramIDandMetadata(result[result.length - 1])
    }
  }, [pipelineResult]);

  //open loading window if isLoading
  useEffect(() => {
    setLoadingScreenIsOpen(isLoading);
  }, [isLoading]);

  //function to handle interrupt loading
  const handleCloseLoadingWindow = () => {
    setHeaderIsLoading(false)
    setUploadIsLoading(false)
    setImageDetailsIsLoading(false)
    setStartpipelineIsLoading(false)
    setIsLoading(false);
    setLoadingScreenIsOpen(false);
    Controller.abortFetch();
  }

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline className={'App-CssBaseline'} />
      <DndProvider className={'App-DndProvider'} backend={HTML5Backend}>
        <ToastContainer position="bottom-left" />
        <LoadingWindow open={loadingScreenIsOpen} onClose={handleCloseLoadingWindow} />
        {windowSize >= 1450 ?
          <>
            <Grid style={{ paddingTop: 20, paddingRight: 10, paddingBottom: 10, paddingLeft: 10 }}>
              <Header theme={theme} setTheme={setTheme} developMode={developMode} setDevelopMode={setDevelopMode} setIsLoading={setHeaderIsLoading} />
            </Grid>
            <Grid container style={{ paddingTop: 0, paddingRight: 10, paddingBottom: 10, paddingLeft: 10 }}>
              <Grid item md={4} style={{ paddingRight: 10 }}>
                <Grid container direction="column">
                  <Grid item xs style={{ paddingBottom: 10 }}>
                    <Upload setOriginalImageID={setOriginalImageID} setCurrentImageID={setCurrentImageID} setCurrentHistogramIDandMetadata={setCurrentHistogramIDandMetadata} setIsLoading={setUploadIsLoading} />
                  </Grid>
                  <Grid item xs style={{ paddingBottom: 10 }}>
                    <ImageView currentImageID={currentImageID} />
                  </Grid>
                  <Grid item xs>
                    <ImageDetails currentHistogramIDandMetadata={currentHistogramIDandMetadata} setIsLoading={setImageDetailsIsLoading} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={4} style={{ paddingRight: 10 }}>
                <Grid container direction="column">
                  <Grid item xs style={{ paddingBottom: 10 }}>
                    <Pipeline steps={steps} setSteps={setSteps} pipelineResult={pipelineResult} setPipelineResult={setPipelineResult} setCurrentImageID={setCurrentImageID} setCurrentHistogramIDandMetadata={setCurrentHistogramIDandMetadata} />
                  </Grid>
                  <Grid item xs>
                    <StartPipeline steps={steps} originalImageID={originalImageID} setPipelineResult={setPipelineResult} isLoading={startPipelineIsLoading} setIsLoading={setStartpipelineIsLoading} />
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
          </>
          :
          <WindowToSmall />
        }
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;