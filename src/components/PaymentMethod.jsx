import React, { Component } from 'react';
import './PaymentMethod.css';

class PaymentMethod extends Component {
  render() {
    return (
      <div className="paymentMethod">
        <h2>Método de Pagamento</h2>
        <form>
          <div>
            <h3>Boleto</h3>
            <label htmlFor="boleto">
              <input
                id="boleto"
                type="radio"
                name="payment"
                value="boleto"
              />
              Boleto
            </label>
          </div>
          <div>
            <h3>Cartão de Crédito</h3>
            <label htmlFor="visa">
              <input
                id="visa"
                type="radio"
                name="payment"
                value="visa"
              />
              Visa
            </label>
            <label htmlFor="masterCard">
              <input
                id="MasterCard"
                type="radio"
                name="payment"
                value="masterCard"
              />
              Master Card
            </label>
            <label htmlFor="elo">
              <input
                id="elo"
                type="radio"
                name="payment"
                value="elo"
              />
              Elo
            </label>
          </div>
        </form>
      </div>
    );
  }
}

export default PaymentMethod;
