import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ProductsList from '../components/ProductsList';
import Categorias from '../components/Categorias';
import { addToCart, getCartItems } from '../services/userCart';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      noProducts: false,
      productsList: [],
      searchInput: '',
      numberItemsInCart: 0,
    };
  }

  componentDidMount() {
    this.numberItemsInCart();
  }

  handleSearch = async () => {
    const { searchInput } = this.state;
    const products = await getProductsFromCategoryAndQuery('', searchInput);
    if (!products) {
      this.setState({
        noProducts: true,
      });
    } else {
      this.setState({
        noProducts: false,
        productsList: products.results,
      });
    }
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleCategory = async (id) => {
    const products = await getProductsFromCategoryAndQuery(id, '');
    if (!products) {
      this.setState({
        noProducts: true,
      });
    } else {
      this.setState({
        noProducts: false,
        productsList: products.results,
      });
    }

  addItemToCart = (product) => {
    addToCart(product);
    this.numberItemsInCart();
  }

  numberItemsInCart = () => {
    this.setState({
      numberItemsInCart: getCartItems().length,
    });

  }

  render() {
    const { searchInput, productsList, noProducts, numberItemsInCart } = this.state;
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
          <div>
            <span
              data-testid="shopping-cart-product-quantity"
            >
              { numberItemsInCart === 0 ? null : numberItemsInCart }
            </span>
          </div>
        </button>
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        {noProducts
          ? <p>Nenhum produto foi encontrado</p>
          : productsList.map((product) => (
            <ProductsList
              key={ product.id }
              productsList={ product }
              addToCart={ this.addItemToCart }
            />
          )) }
        <div>
          <Categorias handleCategory={ this.handleCategory } />
        </div>
      </div>
    );
  }
}

export default Home;
