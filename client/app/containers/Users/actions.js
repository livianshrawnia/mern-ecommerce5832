/*
 *
 * Users actions
 *
 */

import axios from 'axios';

import { FETCH_USERS } from './constants';

import handleError from '../../utils/error';

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/interface/account/list`);

      dispatch({ type: FETCH_USERS, payload: response.data.result.users });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};
