import { combineReducers } from 'redux';
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  FETCH_ITEMS_SUCCESS,
  UPDATE_ITEM_STATUS_SUCCESS
} from './types';

const initialState = {
  user: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    amount: '',
    email: '',
    password: ''
  },
  signedUp: false,
  error: null,
  items: []
};

function user(state = initialState.user, { type, payload }) {
  switch (type) {
    case SIGN_UP_SUCCESS:
      return payload;

    default:
      return state;
  }
}

function signedUp(state = initialState.signedUp, { type }) {
  switch (type) {
    case SIGN_UP_SUCCESS:
      return true;

    default:
      return state;
  }
}

function error(state = initialState.error, { type, payload }) {
  switch (type) {
    case SIGN_UP_REQUEST:
    case SIGN_UP_SUCCESS:
      return null;

    case SIGN_UP_FAIL:
      return payload;

    default:
      return state;
  }
}

function items(state = initialState.items, { type, payload }) {
  switch (type) {
    case FETCH_ITEMS_SUCCESS:
      return payload;

    case UPDATE_ITEM_STATUS_SUCCESS:
      return state.map(item =>
        item.id === payload.id
          ? { ...item, onVacation: payload.onVacation }
          : item
      );

    default:
      return state;
  }
}

export default combineReducers({
  user,
  signedUp,
  error,
  items
});
