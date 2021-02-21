import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#1ed760'
      },
      secondary: {
        main: '#ffffff'
      },
      error: {
        main: '#ed3232'
      },
      background: {
        default: '#191414'
      }
    },
});

export { theme };