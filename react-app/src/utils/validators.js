export const isValidEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

export const isRequired = (value) =>
  typeof value === 'string' && value.trim().length > 0;

export const isMinLength = (value, min) =>
  typeof value === 'string' && value.trim().length >= min;

export const isPhone = (phone) => {
  if (!phone) return true;
  const re = /^[+]?[\d\s()-]{7,20}$/;
  return re.test(phone);
};

export const validateQuoteForm = (data) => {
  const errors = {};
  if (!isRequired(data.name)) errors.name = 'Name is required';
  if (!isRequired(data.email)) errors.email = 'Email is required';
  else if (!isValidEmail(data.email)) errors.email = 'Invalid email address';
  if (!isPhone(data.phone)) errors.phone = 'Invalid phone number';
  if (!data.services?.length) errors.services = 'Please select at least one service';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateContactForm = (data) => {
  const errors = {};
  if (!isRequired(data.name)) errors.name = 'Name is required';
  if (!isRequired(data.email)) errors.email = 'Email is required';
  else if (!isValidEmail(data.email)) errors.email = 'Invalid email address';
  if (!isRequired(data.message)) errors.message = 'Message is required';
  else if (!isMinLength(data.message, 10)) errors.message = 'Message must be at least 10 characters';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateNewsletter = (email) => {
  if (!isRequired(email)) return { isValid: false, error: 'Email is required' };
  if (!isValidEmail(email)) return { isValid: false, error: 'Invalid email address' };
  return { isValid: true, error: null };
};
