import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCartItems } from '../services/userCart';

class ShowCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberItem: '',
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

  render() {
    const { numberItem } = this.state;
    const { productsList } = this.props;

    return (
      <>
        <span data-testid="shopping-cart-product-quantity">{ numberItem }</span>
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
