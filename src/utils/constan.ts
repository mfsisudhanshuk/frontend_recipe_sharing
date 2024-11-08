/**
 * Menu items for navigation in the application.
 * @constant
 * @type {Array<{url: string, menu: string}>}
 */
export const MENU_ITEMS = [
  {
    URL: '/',
    MENU: "Home"
  },
  {
    URL: '/add-recipe',
    MENU: "Add Recipe"
  }
];

/**
 * Validation error messages for recipe form fields.
 * @constant
 * @type {Object}
 */
export const RECIPE_VALIDATION_ERRORS = {
   TITLE_REQUIRED: 'Title is required',
   INGREDIENT_REQUIRED: 'Ingredient is required',
   INGREDIENT_LENGTH: 'At least one ingredient is required',
   PREPARATION_TIME_REQUIRED:'Preparation time is required',
   PREPARATION_TIME_MIN: 'Preparation time must be at least 1 minute',
   STEPS_REQUIRED: 'Steps are required',
   RATING_REQUIRED: 'Rating is required',
   RATING_MIN_MAX: 'Rating is required' 
};

/**
 * Recipe form fields placeholder.
 * @constant
 * @type {Object}
 */
export const RECIPE_PLACEHOLDER= {
   TITLE: 'Recipe Title',
   PREPARATION_TIME: 'Preparation TimE',
   STEPS: 'Step-by-step instructions',
   RATING: 'Recipe Rating',
};

/**
 * Recipe form fields label.
 * @constant
 * @type {Object}
 */
export const RECIPE_LABEL = {
  TITLE: 'Title',
  INGREDIENTS: 'Ingredients',
  PREPARATION_TIME: 'Preparation Time (minutes)',
  STEPS: 'Steps',
  RATING: 'Rating (1-5)',
  IMAGE: 'Image',
};

/**
 * Success and failure messages for recipe operations.
 * @constant
 * @type {Object}
 */
//TODO : Add this message on toast UI .
export const RECIPE_MESSAGES = {
  ADD_SUCCESS: 'Recipe added successfully!',
  ADD_FAILURE: 'Failed to add recipe. Please try again.',
  UPDATE_SUCCESS: 'Recipe updated successfully!',
  UPDATE_FAILURE: 'Failed to update recipe. Please try again.',
  DELETE_SUCCESS: 'Recipe deleted successfully!',
  DELETE_FAILURE: 'Failed to delete recipe. Please try again.',
  FETCH_FAILURE: 'Failed to fetch recipes. Please check your connection and try again.',
};


export const EMAIL_REGED = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
