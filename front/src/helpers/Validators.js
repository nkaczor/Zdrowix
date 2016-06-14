let formCopy = {};

export default function validate(form, validatorsMap) {
  let errors = {};
  let status = true;

  formCopy = form;
  for (let field in form) {
    let errorInfo = validateField(field, form[field], validatorsMap[field]);

    errors[field] = errorInfo.error;
    if (!errorInfo.status) {
      status = false;
    }
  }
  return {
    errors,
    status
  };
}

function splitCamelCaseToString(s) {
  let string = s.split(/(?=[A-Z])/).join(' ').toLowerCase();

  string = string.charAt(0).toUpperCase() + string.slice(1);
  return string;
}

export function validateField(name, value, validators) {
  let error = '';
  let status = true;

  if (validators) {
    for (let validator of validators) {
      ({ error, status } = validator(value));
      if (!status) {
        error = `${ splitCamelCaseToString(name) } ${ error }`;
        break;
      }
    }
  }
  return {
    error,
    status
  };
}
export function required() {
  return function(value) {
    if (!value) {
      return {
        status: false,
        error: 'is required.'
      };
    }
    return { status: true };
  };
}

export function maxLength(length) {
  return function(value) {
    let error = `has more than ${ length } characters.`;

    if (!value) {
      return { status: true };
    }
    if (value.toString().length > length) {
      return {
        status: false,
        error
      };
    }
    return { status: true };
  };
}

export function minLength(length) {
  return function(value) {
    let error = `has less than ${ length } characters.`;

    if (!value) {
      return {
        status: false,
        error
      };
    }
    if (value.toString().length < length) {
      return {
        status: false,
        error
      };
    }
    return { status: true };
  };
}

export function theSameAs(name) {
  return function(value) {
    let error = `must be the same as ${ name }`;

    if (value.toString() !== formCopy[name].toString()) {
      return {
        status: false,
        error
      };
    }
    return { status: true };
  };
}

export function isEmail() {
  return function(value) {
    let error = 'is not correct email adress';
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!regex.test(value)) {
      return {
        status: false,
        error
      };
    }
    return { status: true }
  }
}