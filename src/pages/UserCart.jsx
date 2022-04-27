import React, { Component } from 'react';
import { getCartItems } from '../services/userCart';
import ProductsList from '../components/ProductsList';

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
              <ProductsList
                key={ product.id }
                productsList={ product }
              />
            ))}
        </div>
      </div>
    );
  }
}

export default UserCart;
