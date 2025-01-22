import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home/Home"));
const RecipeDetail = lazy(() => import("./pages/Recipe/RecipeDetail"));
const Login = lazy(() => import("./pages/User/Login"));
const Register = lazy(() => import("./pages/User/Register"));
const AddRecipe = lazy(() => import("./pages/Home/AddRecipe"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-recipe" element={<AddRecipe />} /> 
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
