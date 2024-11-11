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

> Desktop 

> Home page with filter 

![Screenshot from 2024-11-11 22-23-47](https://github.com/user-attachments/assets/b77a94ca-1de2-438a-b2fe-3c92cc55f7c8)

> Detail Page
![Screenshot from 2024-11-06 17-57-54](https://github.com/user-attachments/assets/2368925e-e877-4e6c-8767-78f66b340033)



> Register Page

![Screenshot from 2024-11-06 18-54-06](https://github.com/user-attachments/assets/4fe3030e-42a6-485f-9e2c-05beefa1aea5)


> Login Page

![Screenshot from 2024-11-06 18-53-32](https://github.com/user-attachments/assets/c953b3b1-7849-448a-a5c4-d5e2d89b14fe)


> Mobile

![Screenshot from 2024-11-11 22-37-08](https://github.com/user-attachments/assets/85a0021a-73ee-45ff-966f-6b60ac1415d7)



## How to start the Project

1. git clone <clone-url>
2. Go inside project-folder
3. Run command `npm i`
4. To start the project run  command `npm  start`.


## Contribution guidelines

1. ```Fork and Clone``` the repository. Set upstream: git remote add upstream <original-repo-url>.

2. ``` Branching:``` Create feature branches from development branch using ` git checkout -b feature/<feature-name>`.

3. ``` Naming Convention:``` Use `feature/<feature-name>`, `fix/<bug-description>`, and `hotfix/<issue-description>`.

4. `Commit Message:` Give some meaningful message

5. `Pull Requests:` Create PR to development with a clear title, description, and linked issue number. Assign a reviewer.

6. `Merge Process:` Wait for review and approval. Do not merge directly to main.

7. `Notify Start:` Email mfsi.sudhanshuk@gmail.com with your GitHub username and task before starting.

8. `Update Fork:` Sync with upstream regularly: git pull upstream development and git push origin development.

9. `Issue Reporting:` For bugs or features, create an issue in the repository.

10. `Code of Conduct:` Maintain respectful communication and provide constructive feedback.

11. Useful Commands:

```
Install dependencies: npm install
Start dev server: npm start
Build project: npm run build

```
NOTE :- Merging PR, Once reviewed and approved, merge to development branch.


## Important notes about the project

Note :- Backend is repo - [HERE](https://github.com/mfsisudhanshuk/backend_recipe_sharing)


