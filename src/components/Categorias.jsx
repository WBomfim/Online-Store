import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';
import './Categorias.css';

class Categorias extends Component {
  constructor(props) {
    super(props);
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
  }

  render() {
    const { categorias } = this.state;
    const { handleCategory } = this.props;

    return (
      <div className="Categorias">
        <h2>Categorias</h2>
        {categorias.map((categoria) => (
          <button
            type="button"
            key={ categoria.id }
            onClick={ () => handleCategory(categoria.id) }
            data-testid="category"
          >
            { categoria.name }
          </button>))}
      </div>
    );
  }
}

Categorias.propTypes = {
  handleCategory: PropTypes.func.isRequired,
};

export default Categorias;
