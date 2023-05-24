import React, { useState } from 'react';
import Header from './Components/header';
import Upload from './Components/upload';
import ImageView from './Components/imageView';
import ImageDetails from './Components/imageDetails';
import Pipeline from './Components/Pipeline/pipeline';
import PipelineSteps from './Components/PipelineSteps/pipelineSteps';
import StartPipeline from './Components/startPipeline';
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

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

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline className={"App-CssBaseline"} />
      <DndProvider className={"App-DndProvider"} backend={HTML5Backend}>
        <Grid style={{ paddingTop: 20, paddingRight: 10, paddingBottom: 10, paddingLeft: 10 }}>
          <Header theme={theme} setTheme={setTheme} />
        </Grid>

        <Grid container style={{ paddingTop: 0, paddingRight: 10, paddingBottom: 10, paddingLeft: 10 }}>

          <Grid item md={4} style={{ paddingRight: 10 }}>
            <Grid container direction="column">
              <Grid item xs style={{ paddingBottom: 10 }}>
                <Upload />
              </Grid>
              <Grid item xs style={{ paddingBottom: 10 }}>
                <ImageView />
              </Grid>
              <Grid item xs >
                <ImageDetails />
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={4} style={{ paddingRight: 10 }}>
            <Grid container direction="column">
              <Grid item xs style={{ paddingBottom: 10 }}>
                <Pipeline />
              </Grid>
              <Grid item xs>
                <StartPipeline />
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={4}>
            <Grid container direction="column">
              <Grid item xs>
                <PipelineSteps />
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;