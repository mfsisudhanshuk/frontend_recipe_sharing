## Frontend Recipe Sharing

- We will build a recipe-sharing platform using the MERN stack (MongoDB, Express, React, Node.js). The platform will allow users to share recipes, search for recipes by ingredients, and rate and comment on other users' recipes.

## Folder structure :-

```
src/
├── assets/                     # Static files (images, icons, etc.)
├── components/                 # Reusable components across the app
│   ├── Button.tsx              # Example of a reusable button component
│   ├── Card.tsx                # Card component for recipe previews
│   └── ...                     # Other reusable components
├── layouts/                    # Layout components
│   └── MainLayout.tsx          # Main layout component with Header/Footer
├── pages/                      # Pages for routes
│   ├── Home/                   # Homepage components
│   │   ├── Home.tsx            # Homepage main component
│   │   └── RecipeCard.tsx      # Recipe card for homepage listing
│   ├── Recipe/                 # Recipe-related pages and components
│   │   ├── RecipeDetail.tsx    # Recipe detail view
│   │   ├── AddRecipe.tsx       # Form to add a recipe
│   │   └── RateRecipe.tsx      # Component for rating a recipe
│   └── User/                   # User-related pages
│       ├── Login.tsx           # Login page
│       ├── Register.tsx        # Registration page
│       └── Profile.tsx         # User profile page
├── services/                   # API service functions
│   ├── api.ts                  # Axios or Fetch instance
│   ├── recipeService.ts        # Functions for recipe-related API calls
│   └── userService.ts          # Functions for user-related API calls
├── store/                      # State management (e.g., using Redux or Context API)
│   ├── authSlice.ts            # Auth-related state (if using Redux)
│   └── recipeSlice.ts          # Recipe-related state
├── styles/                     # Tailwind CSS and global styles
│   ├── globals.css             # Global CSS and Tailwind base imports
├── utils/                      # Utility functions and helpers
│   ├── formatDate.ts           # Function to format dates
│   ├── validateForm.ts         # Form validation helpers
│   └── constants.ts            # Constants used across the app
├── App.tsx                     # Main App component with Routes
├── main.tsx                    # ReactDOM entry point
└── index.html                  # HTML template for the app

```

## Screenshot

> Home page

![Screenshot from 2024-11-06 18-53-11](https://github.com/user-attachments/assets/52c72bc2-00f6-4985-b189-ac4ddfa3bc4e)


> Detail Page
![Screenshot from 2024-11-06 17-57-54](https://github.com/user-attachments/assets/2368925e-e877-4e6c-8767-78f66b340033)



> Register Page

![Screenshot from 2024-11-06 18-54-06](https://github.com/user-attachments/assets/4fe3030e-42a6-485f-9e2c-05beefa1aea5)


> Login Page

![Screenshot from 2024-11-06 18-53-32](https://github.com/user-attachments/assets/c953b3b1-7849-448a-a5c4-d5e2d89b14fe)


## How to start the Project



## Contribution guidelines



## Important notes about the project



