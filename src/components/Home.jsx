import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      productsList: [],
      searchInput: '',
    };
  }

  handleSearch = async () => {
    const { searchInput } = this.state;
    const products = await getProductsFromCategoryAndQuery('', searchInput);
    this.setState({
      productsList: products.results,
    });
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { searchInput } = this.state;
    return (
      <div>
        <input
          type="text"
          name="searchInput"
          value={ searchInput }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          onClick={ this.handleSearch }
        >
          Pesquisar Produto
        </button>
        <button
          type="button"
        >
          <Link to="/cart" data-testid="shopping-cart-button">
            Carrinho
          </Link>
        </button>
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
      </div>
    );
  }
}

export default Home;
