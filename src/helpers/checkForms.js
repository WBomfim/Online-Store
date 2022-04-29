const checkPurchaseForm = (object) => {
  const {
    name,
    email,
    CPF,
    telephone,
    CEP,
    address,
    complent,
    number,
    city,
    state,
    paymentMethod,
  } = object;

  const errors = {};
  if (!name) {
    errors.notName = true;
  }
  if (!email) {
    errors.notEmail = true;
  }
  if (!CPF) {
    errors.notCPF = true;
  }
  if (!telephone) {
    errors.notTelephone = true;
  }
  if (!CEP) {
    errors.notCEP = true;
  }
  if (!address) {
    errors.notAddress = true;
  }
  if (!complent) {
    errors.notComplent = true;
  }
  if (!number) {
    errors.notNumber = true;
  }
  if (!city) {
    errors.notCity = true;
  }
  if (!state) {
    errors.notState = true;
  }
  if (!paymentMethod) {
    errors.notPaymentMethod = true;
  }

  return errors;
};

export default checkPurchaseForm;
