import items from './items-db';

export const fetchItems = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(items);
    }, 500);
  });
};

export const updateOnVacationStatus = ({ id, onVacation }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id, onVacation });
    }, 500);
  });
};
