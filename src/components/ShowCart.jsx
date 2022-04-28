import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShowCart extends Component {
  render() {
    const { productsList } = this.props;

    return (
      <>
        <samp data-testid="shopping-cart-product-quantity">0</samp>
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
