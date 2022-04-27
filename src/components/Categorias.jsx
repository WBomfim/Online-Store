import React, { Component } from 'react';
import ProductsList from './ProductsList';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import './Categorias.css';

class Categorias extends Component {
  constructor() {
    super();
    this.state = {
      categorias: [],
      produtos: [],
      semProdutos: false,
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  async handleClick(id) {
    const products = await getProductsFromCategoryAndQuery(id, '');
    if (!products) {
      this.setState({
        semProdutos: true,
      });
    } else {
      this.setState({
        semProdutos: false,
        produtos: products.results,
      });
    }
  }

  async fetchCategories() {
    const response = await getCategories();
    this.setState({ categorias: response });
  }

  render() {
    const { categorias, produtos, semProdutos } = this.state;

    return (
      <div className="Categorias">
        <h2>Categorias</h2>
        {categorias.map((categoria) => (
          <button
            type="button"
            key={ categoria.id }
            onClick={ () => this.handleClick(categoria.id) }
            data-testid="category"
          >
            { categoria.name }
          </button>))}
        {semProdutos ? false : produtos.map((produto) => (
          <ProductsList productsList={ produto } key={ produto.id } />
        ))}
      </div>
    );
  }
}

export default Categorias;
