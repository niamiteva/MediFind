import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    typography: {
    },
    palette: {
      primary: {
        light: '#B0BEC5',
        main: '#00BFA5',
        dark: '#006064',
        contrastText: '#263238',
      },
      secondary: {
        light: '#ff79b0',
        main: '#F44336',
        dark: '#D32F2F',
        contrastText: '#000',
      },
      type: 'light'
    }
  })

  export default theme