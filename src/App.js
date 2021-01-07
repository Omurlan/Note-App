import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Alert from './components/Alert'
import Navbar from './components/Navbar'
import AlertState from './context/alert/AlertState'

import { FirebaseState } from './context/Firebase/FirebaseState'
import About from './pages/About'
import Home from './pages/Home'

function App() {
  return (
    <FirebaseState>
    <AlertState>
    <BrowserRouter>
      <Navbar/>
      <div className="container pt-4">
        <Alert/>
        <Switch>
          <Route exact path={'/'} component={Home}/>
          <Route exact path={'/about'} component={About}/>
        </Switch>
      </div>
    </BrowserRouter>
    </AlertState>
    </FirebaseState>
  )
}

export default App