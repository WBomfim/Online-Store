import React, { Component } from 'react';
import { getCartItems } from '../services/userCart';
import ShowProductsCheckout from '../components/ShowProductsCheckout';
import PurchaseForm from '../components/PurchaseForm';
import PaymentMethod from '../components/PaymentMethod';
import './Checkout.css';

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
                    <strong>{ `Total: ${priceTotal}`}</strong>
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
                error={ errors.PaymentMethod }
                onChange={ this.handleChange }
              />
              <button
                type="button"
              >
                Finalizar Compra
              </button>
            </>)}
      </div>
    );
  }
}

export default Checkout;
