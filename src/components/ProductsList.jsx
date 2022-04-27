import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductsList extends Component {
  render() {
    const { productsList } = this.props;
    return (
      <div data-testid="product" key={ productsList.id }>
        <h3>
          { productsList.title }
        </h3>
        <img
          src={ productsList.thumbnail }
          alt={ productsList.title }
        />
        <h3>
          { productsList.price }
        </h3>
        <Link to={ `/details/${productsList.id}` } data-testid="product-detail-link">
          Details
        </Link>
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
};
export default ProductsList;
