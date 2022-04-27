import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductsList extends Component {
  render() {
    const { productsList, addToCart } = this.props;
    return (
      <div data-testid="product" key={ productsList.id }>
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
          onClick={ () => addToCart(productsList) }
          data-testid="product-add-to-cart"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductsList.propTypes = {
  productsList: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  addToCart: PropTypes.func,
};

ProductsList.defaultProps = {
  addToCart: () => {},
};

export default ProductsList;
