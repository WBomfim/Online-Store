import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ProductsList from '../components/ProductsList';
import Categorias from '../components/Categorias';
import { addToCart, getCartItems } from '../services/userCart';
import styles from '../styles/Home.module.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      noProducts: false,
      productsList: [],
      searchInput: '',
      numberItemsInCart: 0,
      showBar: false,
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

  handleKey = async (e) => {
    if (e.key === 'Enter') {
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

  ShowBar = () => {
    const { showBar } = this.state;
    this.setState({
      showBar: !showBar,
    });
  }

  render() {
    const {
      searchInput,
      productsList,
      noProducts,
      numberItemsInCart,
      showBar } = this.state;
    return (
      <div className={ styles.container }>
        <span className={ styles.inputContainer }>
          <div className={ styles.inputIcon }>
            <button
              className={ styles.searchBtn }
              type="button"
              data-testid="query-button"
              onClick={ this.handleSearch }
            >
              <FaSearch style={ { fontSize: '18px' } } />
            </button>
            <input
              data-testid="query-input"
              className={ styles.searchInput }
              type="text"
              name="searchInput"
              value={ searchInput }
              onKeyPress={ this.handleKey }
              onChange={ this.handleChange }
            />

          </div>
        </span>
        <button
          className={ styles.shoppingCartBtn }
          type="button"
        >
          <Link to="/cart" data-testid="shopping-cart-button">
            <FaShoppingCart style={ { fontSize: '25px', color: 'black' } } />
          </Link>
          <div className={ numberItemsInCart > 0 ? styles.shoppingCartNumber : null }>
            <span
              data-testid="shopping-cart-size"
            >
              { numberItemsInCart === 0 ? null : numberItemsInCart }
            </span>
          </div>
        </button>
        {productsList.length > 0 ? null : (
          <h4 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h4>
        )}
        <div className={ styles.mainProducts }>
          <div className={ styles.productsList }>
            {noProducts
              ? <p>Nenhum produto foi encontrado</p>
              : productsList.map((product, index) => (
                <ProductsList
                  key={ index }
                  productsList={ product }
                  addToCart={ this.addItemToCart }
                />
              )) }
          </div>
          <div className={ styles.categories }>
            <span className={ styles.menu }>
              <h2>Categorias</h2>
              <div className={ styles.icon }>
                { showBar ? <FaAngleUp
                  onClick={ this.ShowBar }
                  style={ { fontSize: '30px', color: 'black' } }
                /> : <FaAngleDown
                  onClick={ this.ShowBar }
                  style={ { fontSize: '30px', color: 'black' } }
                />}
              </div>

            </span>
            <div className={ showBar ? styles.categoryMenuOn : styles.categoryMenuOff }>
              <Categorias handleCategory={ this.handleCategory } />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Home;
