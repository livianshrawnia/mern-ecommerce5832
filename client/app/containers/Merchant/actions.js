/*
 *
 * Merchant actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_MERCHANTS,
  SELL_FORM_CHANGE,
  SET_SELL_FORM_ERRORS,
  SELL_FORM_RESET
} from './constants';

import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';

export const sellFormChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: SELL_FORM_CHANGE,
    payload: formData
  };
};

export const sellWithUs = () => {
  return async (dispatch, getState) => {
    try {
      const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

      const rules = {
        firstName: 'required',
        lastName: 'required',
        email: 'required|email',
        mobileNumber: ['required', `regex:${phoneno}`],
        brand: 'required',
        business: 'required|min:10'
      };

      const merchant = getState().merchant.sellFormData;

      const { isValid, errors } = allFieldsValidation(merchant, rules, {
        'required.firstName': 'First name is required.',
        'required.lastName': 'Last name is required.',
        'required.email': 'Email is required.',
        'email.email': 'Email format is invalid.',
        'required.mobileNumber': 'Mobile number is required.',
        'regex.mobileNumber': 'Mobile number format is invalid.',
        'required.brand': 'Brand is required.',
        'required.business': 'Business is required.',
        'min.business': 'Business must be at least 10 characters.'
      });

      if (!isValid) {
        return dispatch({ type: SET_SELL_FORM_ERRORS, payload: errors });
      }

      const response = await axios.post('/api/mer/account/signup', merchant);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 3
      };

      dispatch({ type: SELL_FORM_RESET });
      dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const fetchMerchants = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/mer/account/list`);

      dispatch({
        type: FETCH_MERCHANTS,
        payload: response.data.result.merchants
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};
