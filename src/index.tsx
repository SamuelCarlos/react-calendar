import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from 'app/store'
import Main from './Main'
import reportWebVitals from './reportWebVitals'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from '@mui/system'
import { theme } from 'theme'

// import main sass file
import './sass/app.scss'

import persistStore from 'redux-persist/es/persistStore'

let persistor = persistStore(store)

const script = document.createElement('script')
script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`
document.body.appendChild(script)

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>
        <PersistGate loading={<div>Loading</div>} persistor={persistor}>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </PersistGate>
      </ReduxProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
