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
  } else if (!email) {
    errors.notEmail = true;
  } else if (!CPF) {
    errors.notCPF = true;
  } else if (!telephone) {
    errors.notTelephone = true;
  } else if (!CEP) {
    errors.notCEP = true;
  } else if (!address) {
    errors.notAddress = true;
  } else if (!complent) {
    errors.notComplent = true;
  } else if (!number) {
    errors.notNumber = true;
  } else if (!city) {
    errors.notCity = true;
  } else if (!state) {
    errors.notState = true;
  } else if (!paymentMethod) {
    errors.notPaymentMethod = true;
  }

  return errors;
};

export default { checkPurchaseForm };
