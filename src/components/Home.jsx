import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categorias from './Categorias';

class Home extends Component {
  render() {
    return (
      <div>
        <input type="text" />
        <button type="button">
          <Link to="/cart" data-testid="shopping-cart-button">
            Carrinho
          </Link>
        </button>
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <div>
          <Categorias />
        </div>
      </div>
    );
  }
}

export default Home;
