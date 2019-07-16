import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from "react-router-dom";
import PetitionsContainer from './containers/PetitionsContainer'
import PetitionContainer from './containers/PetitionContainer'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={PetitionsContainer} exact />
        <Route path="/:petitionId" component={PetitionContainer} />        
      </div>
    </BrowserRouter>
  );
}

export default App;
