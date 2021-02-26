/*
 *
 * Panel Merchant reducer
 *
 */

import { TOGGLE_PANEL_MERCHANT_MENU } from './constants';

const initialState = {
  isMenuOpen: false,
  panelMerchantLinks: [
    { to: '', name: 'Account Details' },
    { to: '/security', name: 'Account Security' },
    { to: '/products', name: 'Manage Products' },
    { to: '/brands', name: 'Manage Brands' },
    { to: '/orders', name: 'Manage Orders' }
  ]
};

const panelMerchantReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_PANEL_MERCHANT_MENU:
      return { ...state, isMenuOpen: !state.isMenuOpen };
    default:
      return state;
  }
};

export default panelMerchantReducer;
