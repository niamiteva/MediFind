import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    typography: {
    },
    palette: {
      primary: {
        light: '#33cbb7',
        main: '#00BFA5',
        dark: '#008573',
        contrastText: '#212121',
      },
      secondary: {
        light: '#f6685e',
        main: '#F44336',
        dark: '#aa2e25',
        contrastText: '#fff',
      },
      //type: 'light'
    }
  })

  export default theme