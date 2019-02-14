const validateInput = data => {
  let errors = {};
  Object.keys(data).forEach(field => {
    if (data[field] === "") {
      errors[field] = `Article ${field} is required`;
    }
  });
  return {
    errors,
    isValid: errors ? false : true
  };
};

export default validateInput;
