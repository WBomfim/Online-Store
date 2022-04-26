import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductsList from './ProductsList';
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
    const { searchInput, productsList } = this.state;
    return (
      <div>
        <input
          data-testid="query-input"
          type="text"
          name="searchInput"
          value={ searchInput }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="query-button"
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
        { productsList.map((product) => (
          <ProductsList productsList={ product } key={ product.id } />
        )) }
      </div>
    );
  }
}

export default Home;
