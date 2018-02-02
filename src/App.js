import React, { Component } from 'react';
import Board from './Grid'
import './App.css';
import 'semantic-ui-css/semantic.min.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board/>
      </div>
    );
  }
}

export default App;
