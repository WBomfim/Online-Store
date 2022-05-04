import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  getCartItems,
  addToCart,
  removeItemCart } from '../services/userCart';
import style from './ShowCart.module.css';

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

  componentDidUpdate() {
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
    const quantItemFilter = quantItem.filter((item) => item.id === productsList.id);
    const quantity = productsList.available_quantity;
    if (quantity > quantItemFilter.length) {
      this.setState({ isEnable: false });
    } else {
      this.setState({ isEnable: true });
    }
  }

  handleQuantityPlus = () => {
    const { productsList } = this.props;
    addToCart(productsList);
    this.setState((prevState) => ({
      numberItem: prevState.numberItem + 1,
    }), () => {
      this.isEnableButton();
    });
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
  }

  render() {
    const { numberItem, isEnable } = this.state;
    const { productsList, removeAll } = this.props;

    return (
      <div className={ style.container }>
        <div className={ style.price }>
          <div>
            <button
              className={ style.buttonLeft }
              type="button"
              data-testid="product-decrease-quantity"
              onClick={ this.handleQuantityMinus }
            >
              -
            </button>
            <span data-testid="shopping-cart-product-quantity">{ numberItem }</span>
            <button
              className={ style.buttonRight }
              type="button"
              data-testid="product-increase-quantity"
              onClick={ this.handleQuantityPlus }
              disabled={ isEnable }
            >
              +
            </button>
          </div>
          <h3>
            {`R$${productsList.price}`}
          </h3>

        </div>
        <h2 data-testid="shopping-cart-product-name">
          { productsList.title }
        </h2>
        <img
          src={ productsList.thumbnail }
          alt={ productsList.title }
        />
        <button
          className={ style.buttonRemove }
          type="button"
          onClick={ () => removeAll(productsList) }
        >
          Remover Item
        </button>
        <br />
      </div>
    );
  }
}

ShowCart.propTypes = {
  removeAll: PropTypes.func.isRequired,
  productsList: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    available_quantity: PropTypes.number,
  }).isRequired,
};

export default ShowCart;
