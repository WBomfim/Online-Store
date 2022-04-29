import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PaymentMethod.css';

class PaymentMethod extends Component {
  render() {
    const { onChange, error } = this.props;
    return (
      <div className="paymentMethod">
        <h2>Método de Pagamento</h2>
        <form>
          <div>
            <h3>Boleto</h3>
            <div>
              { error && <p>Selecione um método de pagamento</p> }
            </div>
            <label htmlFor="boleto">
              <input
                id="boleto"
                type="radio"
                name="payment"
                value="boleto"
                onChange={ (event) => onChange(event) }
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
                onChange={ (event) => onChange(event) }
              />
              Visa
            </label>
            <label htmlFor="masterCard">
              <input
                id="MasterCard"
                type="radio"
                name="payment"
                value="masterCard"
                onChange={ (event) => onChange(event) }
              />
              Master Card
            </label>
            <label htmlFor="elo">
              <input
                id="elo"
                type="radio"
                name="payment"
                value="elo"
                onChange={ (event) => onChange(event) }
              />
              Elo
            </label>
          </div>
        </form>
      </div>
    );
  }
}

PaymentMethod.propTypes = {
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
};

PaymentMethod.defaultProps = {
  error: false,
};

export default PaymentMethod;
