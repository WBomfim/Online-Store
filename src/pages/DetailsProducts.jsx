import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaShoppingCart } from 'react-icons/fa';
import UserComments from '../components/UserComments';
import { addToCart, getCartItems } from '../services/userCart';
import './DetailsProducts.css';

class DetailsProducts extends React.Component {
  constructor() {
    super();

    this.state = {
      productsDetail: [],
      shippingDetail: [],
      theAmount: 0,
      numberItemsInCart: 0,
    };
    this.renderProduct = this.renderProduct.bind(this);
    this.renderShipping = this.renderShipping.bind(this);
  }

  componentDidMount() {
    this.renderProduct();
    this.renderShipping();
    this.numberItemsInCart();
  }

  numberItemsInCart = () => {
    this.setState({
      numberItemsInCart: getCartItems().length,
    });
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

  async renderShipping() {
    const { match: { params: { id } } } = this.props;
    const frete = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const response = await frete.json();
    this.setState({ shippingDetail: response.shipping });
  }

  render() {
    const { productsDetail, shippingDetail, numberItemsInCart, theAmount } = this.state;
    const { match: { params: { id } } } = this.props;

    return (
      <div className="container-details">
        <header className="detail-shopping-cart">
          <Link
            to="/cart"
            data-testid="shopping-cart-button"
          >
            <FaShoppingCart style={ { fontSize: '20px', color: 'black' } } />

          </Link>
          <span
            data-testid="shopping-cart-size"
          >
            { numberItemsInCart === 0 ? null : numberItemsInCart }
          </span>
        </header>
        <p
          data-testid="product-detail-name"
          className="products-detail-text"
        >
          { productsDetail.title }

        </p>
        <p>

          {shippingDetail.free_shipping
          && (
            <p
              className="products-detail-text"
              data-testid="free-shipping"
            >
              Frete Grátis

            </p>
          )}

        </p>
        <div className="img-frame">
          <img src={ productsDetail.thumbnail } alt={ productsDetail.title } />
        </div>
        <p className="products-detail-text">{productsDetail.price}</p>
        <p className="products-detail-text">{`Em estoque: ${theAmount} unidades`}</p>
        <div className="button-frame">
          <button
            type="button"
            className="button-details"
            data-testid="product-detail-add-to-cart"
            onClick={ () => addToCart(productsDetail) }
          >
            Adicionar ao carrinho
          </button>
        </div>

        <UserComments itemId={ id } />
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
