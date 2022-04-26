import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import UserCart from './components/UserCart';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/cart" component={ UserCart } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
