import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PurchaseForm.css';

class PurchaseForm extends Component {
  render() {
    const { state, onChange } = this.props;

    return (
      <div className="PurchaseForm">
        <h2>Informações do Comprador</h2>
        <form>
          <input
            type="text"
            name="name"
            style={ { backgroundColor: '' } }
            placeholder="Nome Completo"
            value={ state.name }
            onChange={ (event) => onChange(event) }
            data-testid="checkout-fullname"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={ state.email }
            onChange={ (event) => onChange(event) }
            data-testid="checkout-email"
          />
          <input
            type="text"
            name="CPF"
            placeholder="CPF"
            value={ state.CPF }
            onChange={ (event) => onChange(event) }
            data-testid="checkout-cpf"
          />
          <input
            type="text"
            name="telephone"
            placeholder="Telefone"
            value={ state.telephone }
            onChange={ (event) => onChange(event) }
            data-testid="checkout-phone"
          />
          <input
            type="text"
            name="CEP"
            placeholder="CEP"
            value={ state.CEP }
            onChange={ (event) => onChange(event) }
            data-testid="checkout-cep"
          />
          <input
            type="text"
            name="address"
            placeholder="Endereço"
            value={ state.address }
            onChange={ (event) => onChange(event) }
            data-testid="checkout-address"
          />
          <input
            type="text"
            name="complent"
            placeholder="Complemento"
            onChange={ (event) => onChange(event) }
            value={ state.complent }
          />
          <input
            type="text"
            name="number"
            placeholder="Número"
            value={ state.number }
            onChange={ (event) => onChange(event) }
          />
          <input
            type="text"
            name="city"
            placeholder="Cidade"
            value={ state.city }
            onChange={ (event) => onChange(event) }
          />
          <select
            name="estado"
            value={ state.estado }
            onChange={ (event) => onChange(event) }
          >
            <option value="">Estado</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>
        </form>
      </div>
    );
  }
}

PurchaseForm.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    CPF: PropTypes.string.isRequired,
    telephone: PropTypes.string.isRequired,
    CEP: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    complent: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    estado: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PurchaseForm;
