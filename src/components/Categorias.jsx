import React, { Component } from 'react';
import { getCategories } from '../services/api';

class Categorias extends Component {
  constructor() {
    super();
    this.state = {
      categorias: []
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
    return (
      <div className="Categorias">
        <h2>Categorias</h2>
      </div>
    );
  }
}

export default Categorias;
