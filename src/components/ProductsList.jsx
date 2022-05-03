import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../styles/ProductsList.module.css';

class ProductsList extends Component {
  render() {
    const { productsList, addToCart } = this.props;
    const { shipping } = productsList;
    return (
      <div data-testid="product" className={ styles.container }>
        <h3 data-testid="shopping-cart-product-name">
          { productsList.title }
        </h3>
        <h2>

          {shipping.free_shipping && <p data-testid="free-shipping">Frete Grátis</p>}

        </h2>
        <img
          src={ productsList.thumbnail }
          alt={ productsList.title }
        />
        <h3>
          Preço:
          {' '}
          { productsList.price }
        </h3>
        <div className={ styles.userChoise }>
          <button
            className={ styles.addToCart }
            type="button"
            onClick={ () => addToCart(productsList) }
            data-testid="product-add-to-cart"
          >
            Adicionar ao Carrinho
          </button>
          <Link
            className={ styles.link }
            to={ `/details/${productsList.id}` }
            data-testid="product-detail-link"
          >
            Details
          </Link>
        </div>
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
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool,
    }).isRequired,
  }).isRequired,
  addToCart: PropTypes.func,
};

ProductsList.defaultProps = {
  addToCart: () => {},
};

export default ProductsList;
