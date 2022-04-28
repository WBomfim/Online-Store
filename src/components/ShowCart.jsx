import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCartItems, removeItemCart } from '../services/userCart';

class ShowCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberItem: 0,
    };
  }

  componentDidMount() {
    this.numberItem();
  }

  numberItem = () => {
    const { productsList } = this.props;
    const cartItems = getCartItems();
    const filteredCartItems = cartItems.filter((item) => item.id === productsList.id);
    this.setState({
      numberItem: filteredCartItems.length,
    });
  }

  handleQuantityPlus = () => {
    this.setState((prevState) => ({
      numberItem: prevState.numberItem + 1,
    }));
  }

  handleQuantityMinus = () => {
    const { numberItem } = this.state;
    if (numberItem < 2) {
      this.setState(() => ({
        numberItem: 1,
      }));
    } else {
      this.setState((prevState) => ({
        numberItem: prevState.numberItem - 1,
      }));
    }
  }

  render() {
    const { numberItem } = this.state;
    const { productsList } = this.props;

    return (
      <>
        <button
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ this.handleQuantityMinus }
        >
          -
        </button>
        <span data-testid="shopping-cart-product-quantity">{ numberItem }</span>
        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={ this.handleQuantityPlus }
        >
          +
        </button>
        <h2 data-testid="shopping-cart-product-name">
          { productsList.title }
        </h2>
        <img
          src={ productsList.thumbnail }
          alt={ productsList.title }
        />
        <h3>
          { productsList.price }
        </h3>
        <button
          type="button"
          onClick={ () => removeItemCart(productsList) }
        >
          Remover Item
        </button>
      </>
    );
  }
}

ShowCart.propTypes = {
  productsList: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default ShowCart;
