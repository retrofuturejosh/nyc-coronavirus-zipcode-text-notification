import Routes from './components/Routes';
import NavBar from './components/NavBar';
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import deepPurple from '@material-ui/core/colors/deepPurple';


let darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: deepPurple[100],
      main: deepPurple[200],
      dark: deepPurple[700],
      contrastText: 'white',
    },
  },
});
darkTheme = responsiveFontSizes(darkTheme);

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <NavBar />
        <Routes />
      </div>
    </ThemeProvider>
  );
}

export default App;
