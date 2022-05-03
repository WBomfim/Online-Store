import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { getCartItems } from '../services/userCart';
import ShowCart from '../components/ShowCart';
import style from './UserCart.module.css';

class UserCart extends Component {
  constructor() {
    super();
    this.state = {
      productsCart: [],
      noProducts: false,
      totalPrice: 0,
    };
  }

  componentDidMount() {
    this.getListCart();
    this.priceTotal();
  }

  /*
  Usamos a seguinte função em getListCart para que retornasse somente 1 array de objetos, se houvessem outros iguais, não criando duplicatas na página de UserCart
  link para referencia: https://medium.com/trainingcenter/removendo-objetos-duplicados-de-dentro-de-um-array-usando-set-ef4ea1319f4b
  */

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

  directionCheckout = () => {
    const { history } = this.props;
    history.push('/checkout');
  }

  priceTotal = () => {
    const cartItems = getCartItems();
    const priceTotal = cartItems.reduce((total, item) => {
      total += item.price;
      return total;
    }, 0);
    this.setState({
      totalPrice: priceTotal,
    });
  }

  render() {
    const { productsCart, noProducts, totalPrice } = this.state;

    return (
      <div className={ style.container }>
        <Link to="/">Voltar à home</Link>
        <br />
        <div className={ style.containerCar }>
          <AiOutlineShoppingCart style={ { fontSize: '80px', color: 'black' } } />
          <p>Carrinho de compras</p>
        </div>
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
              <div className={ style.btnFinalizarCompra }>
                <button
                  className={ style.buttonFinCompra }
                  type="button"
                  onClick={ () => this.directionCheckout() }
                  data-testid="checkout-products"
                >
                  Finalizar a compra
                </button>
              </div>
              <p className={ style.containerTotalPrice }>
                {`Valor total da Compra: R$ ${totalPrice.toFixed(2)}`}
              </p>
              { productsCart.map((product, index) => (
                <ShowCart
                  key={ index }
                  productsList={ product }
                />
              ))}
            </>)}
      </div>
    );
  }
}

UserCart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default UserCart;
