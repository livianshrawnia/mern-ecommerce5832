/*
 *
 * Merchant reducer
 *
 */

import {
  FETCH_MERCHANTS,
  SELL_FORM_CHANGE,
  SET_SELL_FORM_ERRORS,
  SELL_FORM_RESET
} from './constants';

const initialState = {
  merchants: [],
  sellFormData: {
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    brand: '',
    business: ''
  },
  formErrors: {},
  columns: [
    {
      hidden: true,
      dataField: '_id',
      text: ''
    },
    {
      dataField: 'firstName',
      text: 'First Name'
    },
    {
      dataField: 'lastName',
      text: 'Last Name'
    },
    {
      dataField: 'mobileNumber',
      text: 'Mobile Number'
    },
    {
      dataField: 'merchant.status',
      text: 'Status'
    },
    {
      dataField: 'merchant.brand',
      text: 'Brand'
    },
    {
      dataField: 'merchant.business',
      text: 'Business Description'
    }
  ]
};

const merchantReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MERCHANTS:
      return {
        ...state,
        merchants: action.payload
      };
    case SELL_FORM_CHANGE:
      return {
        ...state,
        sellFormData: { ...state.sellFormData, ...action.payload }
      };
    case SET_SELL_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case SELL_FORM_RESET:
      return {
        ...state,
        sellFormData: {
          firstName: '',
          lastName: '',
          email: '',
          mobileNumber: '',
          brand: '',
          business: ''
        },
        formErrors: {}
      };
    default:
      return state;
  }
};

export default merchantReducer;
