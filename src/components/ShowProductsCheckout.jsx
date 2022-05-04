import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCartItems } from '../services/userCart';
import '../styles/ShowProductsCheckout.css';

class ShowProductsCheckout extends Component {
  constructor() {
    super();
    this.state = {
      numberItem: 0,
      priceTotal: 0,
    };
  }

  componentDidMount() {
    this.numberItem();
  }

  numberItem = () => {
    const { productsList } = this.props;
    const cartItems = getCartItems();
    const filteredCartItems = cartItems.filter((item) => item.id === productsList.id);
    this.sumPrice(filteredCartItems);
    this.setState({
      numberItem: filteredCartItems.length,
    });
  }

  sumPrice = (array) => {
    const priceTotal = array.reduce((total, item) => {
      total += item.price;
      return total;
    }, 0);
    this.setState({
      priceTotal,
    });
  }

  render() {
    const { productsList } = this.props;
    const { numberItem, priceTotal } = this.state;

    return (
      <div className="product-checkout">
        <img
          src={ productsList.thumbnail }
          alt={ productsList.title }
        />
        <div>
          <h2 data-testid="shopping-cart-product-name">
            { productsList.title }
          </h2>
          <div className="price">
            <span>
              { `Quant. ${numberItem}` }
            </span>
            <h3>
              { `R$ ${priceTotal.toFixed(2)}` }
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

ShowProductsCheckout.propTypes = {
  productsList: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default ShowProductsCheckout;
