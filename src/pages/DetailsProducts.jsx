import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addToCart } from '../services/userCart';

class DetailsProducts extends React.Component {
  constructor() {
    super();

    this.state = {
      productsDetail: [],
      theAmount: 0,
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
    const quant = response.available_quantity;
    this.setState({
      productsDetail: response,
      theAmount: quant,
    });
  }

  render() {
    const { productsDetail, theAmount } = this.state;

    return (
      <div>
        <h1>Details aqui</h1>
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho de compra</Link>
        <p data-testid="product-detail-name">{ productsDetail.title }</p>
        <img src={ productsDetail.thumbnail } alt={ productsDetail.title } />
        <p>{productsDetail.price}</p>
        <p>{`Em estoque: ${theAmount} unidades`}</p>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => addToCart(productsDetail) }
        >
          Adicionar ao carrinho
        </button>
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
