import React, { Component } from 'react';
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

  getListCart = () => {
    const productsCart = getCartItems();
    if (productsCart.length === 0) {
      this.setState({
        noProducts: true,
      });
    } else {
      this.setState({
        productsCart,
        noProducts: false,
      });
    }
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
          : productsCart.map((product) => (
            <ShowCart
              key={ product.id }
              productsList={ product }
            />
          ))}
      </div>
    );
  }
}

export default UserCart;
