import React, { useState, useEffect } from 'react'
import HomePage from './Components/HomePage/HomePage'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Dashboard from './Components/Dashboard/Dashboard'
import EditData from "./Components/EditData/EditData"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline, CircularProgress } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import firebase from './Components/firebase'
import './App.css';
import { Provider } from 'react-redux'
import { store} from './Redux/store'; 


const theme = createMuiTheme()

function App() {
 
    const [firebaseInitialized, setFirebaseInitialized] = useState(false)

    useEffect(() => {
      firebase.isInitialized().then(val => {
        setFirebaseInitialized(val)
      })
    })
  
  
    return firebaseInitialized !== false ? (
      <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
             <Route exact path="/login" component={Login} />
             <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />  
            <Route exact path="/editData" component={EditData} />  
          </Switch>
        </Router>
      </MuiThemeProvider>
      </Provider>
    ) : <div id="loader"><CircularProgress /></div>
  
}

export default App;
