export const signUp = ({
  firstName,
  lastName,
  phoneNumber,
  amount,
  email,
  confirmEmail,
  password,
  confirmPassword
}) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (firstName.length < 2 || firstName.length > 12) {
        reject('First Name must contain at least 2 and max 12 chars!');
        return;
      }

      if (lastName.length < 2 || lastName.length > 12) {
        reject('Last Name must contain at least 2 and max 12 chars!');
        return;
      }

      if (amount === '') {
        reject('Please, select the amount!');
        return;
      }

      if (password.length < 8) {
        reject('Password must contain at least 8 chars!');
        return;
      }

      if (email !== confirmEmail) {
        reject('Email Addresses are not equal!');
        return;
      }

      if (password !== confirmPassword) {
        reject('Passwords are not equal!');
        return;
      }

      resolve({
        firstName,
        lastName,
        phoneNumber,
        amount,
        email,
        password
      });
    }, 500);
  });
};
