import React, { Component } from 'react'
import MainRouter from './base/Router'
import {BrowserRouter} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import theme from './base/Theme'
class App extends Component {
  state = {
    theme: theme
  }

  render() {
    return (
      <BrowserRouter>
          <ThemeProvider theme={this.state.theme}>
            <MainRouter/>
          </ThemeProvider>
      </BrowserRouter>
    )
  };
 
}

export default App;