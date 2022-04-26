import React, { Component } from 'react';
import { getCategories } from '../services/api';
import './Categorias.css';

class Categorias extends Component {
  constructor() {
    super();
    this.state = {
      categorias: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  async fetchCategories() {
    const response = await getCategories();
    this.setState({ categorias: response });
    console.log(response);
  }

  render() {
    const { categorias } = this.state;

    return (
      <div className="Categorias">
        <h2>Categorias</h2>
        {categorias.map((categoria) => (
          <button
            type="button"
            key={ categoria.id }
            data-testid="category"
          >
            { categoria.name }
          </button>))}
      </div>
    );
  }
}

export default Categorias;
