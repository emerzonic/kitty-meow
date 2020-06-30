import React from 'react';
import {
  BrowserRouter as Router, Route} from "react-router-dom";
import Home from './areas/Home';
import './App.css';

function App() {


  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/:breed">
        <Home />
      </Route>
    </Router>
  );
}

export default App;
