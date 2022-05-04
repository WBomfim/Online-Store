import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserCart from './pages/UserCart';
import DetailsProducts from './pages/DetailsProducts';
import Checkout from './pages/Checkout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/cart" component={ UserCart } />
            <Route
              exact
              path="/details/:id"
              render={ (props) => <DetailsProducts { ...props } /> }
            />
            <Route
              exact
              path="/checkout"
              render={ (props) => <Checkout { ...props } /> }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
