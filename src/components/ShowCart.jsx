import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCartItems, addToCart, removeItemCart } from '../services/userCart';

class ShowCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberItem: 0,
      isEnable: true,
    };
  }

  componentDidMount() {
    this.numberItem();
    this.isEnableButton();
  }

  numberItem = () => {
    const { productsList } = this.props;
    const cartItems = getCartItems();
    const filteredCartItems = cartItems.filter((item) => item.id === productsList.id);
    this.setState({
      numberItem: filteredCartItems.length,
    });
  }

  isEnableButton = () => {
    const { productsList } = this.props;
    const quantItem = getCartItems();
    const quantity = productsList.available_quantity;
    if (quantity > quantItem.length) {
      return this.setState({ isEnable: false });
    }
    return this.setState({ isEnable: true });
  }

  handleQuantityPlus = () => {
    const { productsList } = this.props;
    addToCart(productsList);
    this.setState((prevState) => ({
      numberItem: prevState.numberItem + 1,
    }));
    this.isEnableButton();
  }

  handleQuantityMinus = () => {
    const { numberItem } = this.state;
    const { productsList } = this.props;
    if (numberItem < 2) {
      this.setState(() => ({
        numberItem: 1,
      }));
    } else {
      removeItemCart(productsList);
      this.setState((prevState) => ({
        numberItem: prevState.numberItem - 1,
      }));
    }
    this.isEnableButton();
  }

  render() {
    const { numberItem, isEnable } = this.state;
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
          disabled={ isEnable }
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
        <br />
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
    available_quantity: PropTypes.number,
  }).isRequired,
};

export default ShowCart;
