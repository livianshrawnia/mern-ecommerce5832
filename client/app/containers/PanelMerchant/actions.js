/*
 *
 * Panel Merchant actions
 *
 */

import { push } from 'connected-react-router';
import { success, error, info } from 'react-notification-system-redux';
import axios from 'axios';

import { TOGGLE_PANEL_MERCHANT_MENU } from './constants';

export const togglePanelMerchantMenu = () => {
  return {
    type: TOGGLE_PANEL_MERCHANT_MENU
  };
};
