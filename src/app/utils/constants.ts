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
   PREPARATION_TIME: 'Preparation Time',
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
 * Validation error messages for Login form fields.
 * @constant
 * @type {Object}
 */
export const LOGIN_VALIDATION_ERRORS = {
  EMAIL_INVALID: 'Invalid email address',
  EMAIL_REQUIRED: 'Email is required',
  PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters',
  PASSWORD_REQUIRED: 'Password is required',
};

/**
 * Login form fields placeholder.
 * @constant
 * @type {Object}
 */
export const LOGIN_PLACEHOLDER= {
  EMAIL: 'Enter your email',
  PASSWORD: 'Enter your password',
};


/**
 * Login form fields label.
 * @constant
 * @type {Object}
 */
export const LOGIN_LABEL = {
  EMAIL: 'Email',
  PASSWORD: 'Password',
};


/**
 * Validation error messages for Register form fields.
 * @constant
 * @type {Object}
 */
export const REGISTER_VALIDATION_ERRORS = {
  ...LOGIN_VALIDATION_ERRORS,
  CONFIRM_PASSWORD: 'Confirm Password is required',
  CONFIRM_PASSWORD_MATCH: 'Passwords must match',
  NAME_REQUIRED: 'Name is required',

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

/**
 * Options for time filters
 * @constant
 * @type 
 */
 export const PREPARATION_TIME_FILTER_OPTIONS= [
  { value: 0, label: "Filter by Time" },
  { value: 15, label: "Up to 15 mins" },
  { value: 30, label: "Up to 30 mins" },
  { value: 45, label: "Up to 45 mins" },
  { value: 60, label: "Up to 60 mins" },
];

/**
 * Options for rating filters
 * @constant
 * @type 
 */
export const RATING_FILTER_OPTIONS = [
  { value: 0, label: "Filter by Rating" },
  { value: 1, label: "1 Star & above" },
  { value: 2, label: "2 Stars & above" },
  { value: 3, label: "3 Stars & above" },
  { value: 4, label: "4 Stars & above" },
  { value: 5, label: "5 Stars" },
];


export const EMAIL_REGED = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const BASE_URL = "http://localhost:8000/api/v1";

export const IMAGE_PLACEHOLDER = 'https://via.placeholder.com/350x150';

// Mock Data
export const mockRecipes = [
  {
    _id: "1",
    title: "Spaghetti Carbonara",
    ingredients: ["spaghetti", "egg", "parmesan", "bacon"],
    preparationTime: 20,
    steps: "Cook pasta, mix with eggs and cheese, add bacon.",
    ratings: [4, 5, 3],
    image: "https://via.placeholder.com/350x150",
    averageRating: 4.0,
  },
  {
    _id: "2",
    title: "Grilled Chicken Salad",
    ingredients: ["chicken", "lettuce", "tomato", "cucumber", "dressing"],
    preparationTime: 15,
    steps: "Grill chicken, mix with vegetables, add dressing.",
    ratings: [5, 4, 4],
    image: "https://via.placeholder.com/350x150",
    averageRating: 4.3,
  },
  {
    _id: "3",
    title: "Chocolate Cake",
    ingredients: ["flour", "sugar", "cocoa", "eggs", "butter"],
    preparationTime: 60,
    steps: "Mix ingredients, bake at 350°F for 30 minutes.",
    ratings: [5, 5, 4],
    image: "https://via.placeholder.com/350x150",
    averageRating: 4.7,
  },
];