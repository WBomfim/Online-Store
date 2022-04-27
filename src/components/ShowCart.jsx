import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShowCart extends Component {
  render() {
    const { productsList } = this.props;
    return (
      <div data-testid="product">
        <div data-testid="shopping-cart-product-name">
          <h1>
            { productsList.title }
          </h1>
        </div>
        <img
          src={ productsList.thumbnail }
          alt={ productsList.title }
        />
        <h3>
          { productsList.price }
        </h3>
      </div>
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
