import React from 'react'
import MainRouter from './base/Router'
import {BrowserRouter} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import theme from './base/Theme'
//import { hot } from 'react-hot-loader'

const App = () => {
  // React.useEffect(() => {
  //   const jssStyles = document.querySelector('#jss-server-side')
  //   if (jssStyles) {
  //     jssStyles.parentNode.removeChild(jssStyles)
  //   }
  // }, [])
  return (
  <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainRouter/>
      </ThemeProvider>
  </BrowserRouter>
)}

export default (App)
//export default hot(module)(App)

