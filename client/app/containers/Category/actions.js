/*
 *
 * Category actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_CATEGORIES,  
  FETCH_CATEGORIES_SELECT,
  CATEGORY_SELECT,
  CATEGORY_CHANGE,
  SET_CATEGORY_FORM_ERRORS,
  RESET_CATEGORY,
  TOGGLE_ADD_CATEGORY,
  ADD_CATEGORY,
  REMOVE_CATEGORY
} from './constants';

//import { RESET_PRODUCT } from '../Product/constants';

import handleError from '../../utils/error';
import { unformatSelectOptions } from '../../helpers/select';
import { allFieldsValidation } from '../../utils/validation';
import { formatSelectOptions } from '../../helpers/select';

export const categoryChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: CATEGORY_CHANGE,
    payload: formData
  };
};

export const toggleAddCategory = () => {
  return {
    type: TOGGLE_ADD_CATEGORY
  };
};

export const handleCategorySelect = value => {
  return {
    type: CATEGORY_SELECT,
    payload: value
  };
};

export const fetchCategoriesSelect = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/web/category/list`);

      let formattedCategories = formatSelectOptions(response.data.result.categories);

      dispatch({
        type: FETCH_CATEGORIES_SELECT,
        payload: formattedCategories
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const fetchCategories = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/web/category/list`);

      dispatch({
        type: FETCH_CATEGORIES,
        payload: response.data.result.categories
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const fetchCategoriesInterface = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/interface/category/list`);

      dispatch({
        type: FETCH_CATEGORIES,
        payload: response.data.result.categories
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const deleteCategory = (id, index) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/interface/category/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success == true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_CATEGORY,
          payload: index
        });
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const addCategory = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: 'required|min:3',
        description: 'required|min:10|max:100'
       // products: 'required'
      };

      const category = getState().category.categoryFormData;
      //const products = getState().product.selectedProducts;

      //let newProducts = unformatSelectOptions(products);

      let newCategory = {
        //products: newProducts,
        ...category
      };

      const { isValid, errors } = allFieldsValidation(newCategory, rules, {
        'required.name': 'Name is required.',
        'min.name': 'Name must be at least 3 characters.',
        'required.description': 'Description is required.',
        'min.description': 'Description must be at least 10 characters.',
        'max.description':
          'Description may not be greater than 100 characters.'
        //'required.products': 'Products is required.'
      });

      if (!isValid) {
        return dispatch({ type: SET_CATEGORY_FORM_ERRORS, payload: errors });
      }

      const response = await axios.post(`/api/interface/category/add`, newCategory);

      const successfulOptions = {
        title: `Category added successfully.`,
        position: 'tr',
        autoDismiss: 3
      };

      //if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_CATEGORY,
          payload: response.data.result.category
        });
        dispatch({ type: RESET_CATEGORY });
        //dispatch({ type: RESET_PRODUCT });
        dispatch(toggleAddCategory());
      //}
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};
