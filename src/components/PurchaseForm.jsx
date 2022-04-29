import React, { Component } from 'react';
import './PurchaseForm.css';

class PurchaseForm extends Component {
  render() {
    return (
      <div className="PurchaseForm">
        <h2>Informações do Comprador</h2>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Nome Completo"
            data-testid="checkout-fullname"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            data-testid="checkout-email"
          />
          <input
            type="text"
            name="CPF"
            placeholder="CPF"
            data-testid="checkout-cpf"
          />
          <input
            type="text"
            name="telephone"
            placeholder="Telefone"
            data-testid="checkout-phone"
          />
          <input
            type="text"
            name="CEP"
            placeholder="CEP"
            data-testid="checkout-cep"
          />
          <input
            type="text"
            name="address"
            placeholder="Endereço"
            data-testid="checkout-address"
          />
          <input
            type="text"
            name="complent"
            placeholder="Complemento"
          />
          <input
            type="text"
            name="number"
            placeholder="Número"
          />
          <input
            type="text"
            name="city"
            placeholder="Cidade"
          />
          <select
            name="estado"
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

export default PurchaseForm;
