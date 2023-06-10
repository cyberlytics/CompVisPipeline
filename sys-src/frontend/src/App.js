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
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import WindowToSmall from "./Components/windowToSmall";

let AngryCat = require('./resources/AngryCat.png');

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
  const [theme, setTheme] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const appliedTheme = createTheme(theme ? lightTheme : darkTheme);
  const [steps, setSteps] = useState([]);

  const [originalImageID, setOriginalImageID] = useState(null);
  const [currentImageID, setCurrentImageID] = useState(null);
  const [developMode, setDevelopMode] = useState(false);

  const minWindowSize = 900;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isWindowTooSmall = windowWidth < minWindowSize;

  return (
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline className={'App-CssBaseline'} />
        <DndProvider className={'App-DndProvider'} backend={HTML5Backend}>
          <Grid style={{ paddingTop: 20, paddingRight: 10, paddingBottom: 10, paddingLeft: 10 }}>
            <Header theme={theme} setTheme={setTheme} developMode={developMode} setDevelopMode={setDevelopMode} />
          </Grid>

          {isWindowTooSmall ? (
              <WindowToSmall/>

          ) : (
              <Grid container style={{ paddingTop: 0, paddingRight: 10, paddingBottom: 10, paddingLeft: 10 }}>
                <Grid item md={4} style={{ paddingRight: 10 }}>
                  <Grid container direction="column">
                    <Grid item xs style={{ paddingBottom: 10 }}>
                      <Upload setOriginalImageID={setOriginalImageID} setCurrentImageID={setCurrentImageID} />
                    </Grid>
                    <Grid item xs style={{ paddingBottom: 10 }}>
                      <ImageView currentImageID={currentImageID} />
                    </Grid>
                    <Grid item xs>
                      <ImageDetails />
                    </Grid>
                  </Grid>
                </Grid>

          <Grid item md={4} style={{ paddingRight: 10 }}>
            <Grid container direction="column">
              <Grid item xs style={{ paddingBottom: 10 }}>
                <Pipeline steps={steps} setSteps={setSteps} />
              </Grid>
              <Grid item xs>
                <StartPipeline steps={steps} originalImageID={originalImageID}/>
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
          )}
        </DndProvider>
      </ThemeProvider>
  );
}

export default App;
