const validateInput = (data) => {
  const errors = {};
  Object.keys(data).forEach((field) => {
    if (data[field] === '') {
      errors[field] = `Article ${field} is required`;
    }
  });
  return {
    errors,
    isValid: !errors,
  };
};

export default validateInput;
