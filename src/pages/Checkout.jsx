import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCartItems, clearCart } from '../services/userCart';
import ShowProductsCheckout from '../components/ShowProductsCheckout';
import PurchaseForm from '../components/PurchaseForm';
import PaymentMethod from '../components/PaymentMethod';
import checkPurchaseForm from '../helpers/checkForms';
import '../styles/Checkout.css';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      productsCart: [],
      noProducts: false,
      priceTotal: 0,
      name: '',
      email: '',
      CPF: '',
      telephone: '',
      CEP: '',
      address: '',
      complent: '',
      number: '',
      city: '',
      state: '',
      paymentMethod: '',
      errors: {},
    };
  }

  componentDidMount() {
    this.getListCart();
    this.sumPrice();
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
    this.clearErros();
  }

  getListCart = () => {
    const productsCart = getCartItems();
    const setItem = new Set();
    const filterProducts = productsCart.filter((item) => {
      const duplicateItem = setItem.has(item.id);
      setItem.add(item.id);
      return !duplicateItem;
    });
    if (productsCart.length === 0) {
      this.setState({
        noProducts: true,
      });
    } else {
      this.setState({
        productsCart: filterProducts,
        noProducts: false,
      });
    }
  }

  sumPrice = () => {
    const cartItems = getCartItems();
    const priceTotal = cartItems.reduce((total, item) => {
      total += item.price;
      return total;
    }, 0);
    this.setState({
      priceTotal,
    });
  }

  checkForm = () => {
    const { state } = this;
    const { history } = this.props;
    const errors = checkPurchaseForm(state);
    if (Object.keys(errors).length === 0) {
      clearCart();
      history.push('/');
    } else {
      this.setState({
        errors,
      });
    }
  }

  clearErros = () => {
    this.setState({
      errors: {},
    });
  }

  render() {
    const {
      productsCart,
      noProducts,
      priceTotal,
      name,
      email,
      CPF,
      telephone,
      CEP,
      address,
      complent,
      number,
      city,
      state,
      paymentMethod,
      errors,
    } = this.state;

    const states = {
      name,
      email,
      CPF,
      telephone,
      CEP,
      address,
      complent,
      number,
      city,
      state,
    };

    return (
      <div className="Checkout">
        { noProducts
          ? (
            <h3
              data-testid="shopping-cart-empty-message"
            >
              Seu carrinho está vazio
            </h3>
          )
          : (
            <>
              <div className="showRevProducts">
                <div className="title">
                  <h2>Revise seus Produtos</h2>
                </div>
                <div className="showProducts">
                  { productsCart.map((product, index) => (
                    <ShowProductsCheckout
                      key={ index }
                      productsList={ product }
                    />
                  ))}
                </div>
                <div className="price-cart">
                  <p>
                    <strong>{ `Total: ${priceTotal.toFixed(2)}`}</strong>
                  </p>
                </div>
              </div>
              <PurchaseForm
                state={ states }
                errors={ errors }
                onChange={ this.handleChange }
              />
              <PaymentMethod
                paymentMethod={ paymentMethod }
                error={ errors.notPaymentMethod }
                onChange={ this.handleChange }
              />
              <button
                className="checkout-button"
                type="button"
                onClick={ () => this.checkForm() }
              >
                Finalizar Compra
              </button>
            </>)}
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
