import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class DetailsProducts extends React.Component {
  constructor() {
    super();

    this.state = {
      productsDetail: [],
    };
    this.renderProduct = this.renderProduct.bind(this);
  }

  componentDidMount() {
    this.renderProduct();
  }

  async renderProduct() {
    const { match: { params: { id } } } = this.props;

    const produtos = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const response = await produtos.json();
    this.setState({ productsDetail: response });
  }

  render() {
    const { productsDetail } = this.state;

    return (
      <div>
        <h1>Details aqui</h1>
        <Link to="/cart">Carrinho de compra</Link>
        <p data-testid="product-detail-name">{ productsDetail.title }</p>
        <img src={ productsDetail.thumbnail } alt={ productsDetail.title } />
        <p>{productsDetail.price}</p>
      </div>
    );
  }
}

DetailsProducts.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DetailsProducts;
