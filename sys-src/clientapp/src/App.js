import './App.css';
import Calculator from './calculator';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Comic Sans MS',
      textTransform: 'none',
    },
  },
});

function App() {
  return (
    <div className='Body'>
      <Typography theme={theme} sx={{width: '100%' }} align="center" variant="h1" component="div">BDCC</Typography>
      <Calculator />
    </div>
  );
}

export default App;