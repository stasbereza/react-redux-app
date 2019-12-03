import * as api from '../utils/signUpApi';
import * as itemsApi from '../utils/itemsApi';
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  FETCH_ITEMS_SUCCESS,
  UPDATE_ITEM_STATUS_SUCCESS
} from './types';

export const signUp = credentials => dispatch => {
  dispatch({ type: SIGN_UP_REQUEST });

  api.signUp(credentials).then(
    response => {
      dispatch({ type: SIGN_UP_SUCCESS, payload: response });
    },
    error => dispatch({ type: SIGN_UP_FAIL, payload: error })
  );
};

export const fetchItemsSuccess = items => ({
  type: FETCH_ITEMS_SUCCESS,
  payload: items
});

export const updateItemStatusSuccess = item => ({
  type: UPDATE_ITEM_STATUS_SUCCESS,
  payload: item
});

export const fetchItems = () => dispatch => {
  itemsApi.fetchItems().then(items => {
    dispatch(fetchItemsSuccess(items));
  });
};

export const updateItemStatus = ({ id, onVacation }) => dispatch => {
  const itemToUpdate = { id, onVacation };

  itemsApi.updateOnVacationStatus(itemToUpdate).then(response => {
    dispatch(updateItemStatusSuccess(response));
  });
};
