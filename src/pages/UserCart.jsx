import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCartItems } from '../services/userCart';
import ShowCart from '../components/ShowCart';

class UserCart extends Component {
  constructor() {
    super();
    this.state = {
      productsCart: [],
      noProducts: false,
    };
  }

  componentDidMount() {
    this.getListCart();
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

  render() {
    const { productsCart, noProducts } = this.state;

    return (
      <div>
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
              <div>
                <button
                  type="button"
                  onClick={ () => this.directionCheckout() }
                  data-testid="checkout-products"
                >
                  Finalizar a compra
                </button>
              </div>
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
