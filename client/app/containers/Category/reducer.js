/*
 *
 * Category reducer
 *
 */

import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SELECT,
  CATEGORY_CHANGE,
  SET_CATEGORY_FORM_ERRORS,
  RESET_CATEGORY,
  TOGGLE_ADD_CATEGORY,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  CATEGORY_SELECT
} from './constants';

const initialState = {
  categories: [],
  categoriesSelect: [],
  selectedCategories: [],
  isCategoryAddOpen: false,
  categoryFormData: {
    name: '',
    description: ''
  },
  formErrors: {},
  columns: [
    {
      hidden: true,
      dataField: '_id',
      text: ''
    },
    {
      dataField: 'name',
      text: 'Category Name',
      sort: true
    },
    {
      dataField: 'description',
      text: 'Category Description',
      classes: 'desc-column'
    }
  ]
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case CATEGORY_SELECT:
      return {
        ...state,
        selectedCategories: action.payload
      };
    case FETCH_CATEGORIES_SELECT:
      return {
        ...state,
        categoriesSelect: action.payload
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload]
      };
    case REMOVE_CATEGORY:
      return {
        ...state,
        categories: [
          ...state.categories.slice(0, action.payload),
          ...state.categories.slice(action.payload + 1)
        ]
      };
    case CATEGORY_CHANGE:
      return {
        ...state,
        categoryFormData: { ...state.categoryFormData, ...action.payload }
      };
    case SET_CATEGORY_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case RESET_CATEGORY:
      return {
        ...state,
        categoryFormData: {
          name: '',
          description: ''
        },
        selectedCategories: [],
        formErrors: {}
      };
    case TOGGLE_ADD_CATEGORY:
      return { ...state, isCategoryAddOpen: !state.isCategoryAddOpen };
    default:
      return state;
  }
};

export default categoryReducer;
