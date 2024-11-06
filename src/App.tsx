import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import { RecipeDetail } from "./pages/Recipe/RecipeDetail";
import { Login } from "./pages/User/Login";
import { Register } from "./pages/User/Register";


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* TODO: Update component to addRecipe */}
          <Route path="/add-recipe" element={<RecipeDetail />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
