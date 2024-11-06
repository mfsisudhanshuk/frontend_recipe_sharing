import { useEffect, useState } from "react";
import {RecipeCard} from "../Home/RecipeCard";
import image1 from '../../assets/image-1.jpg';
import image2 from '../../assets/image-2.jpg';
import image3 from '../../assets/image-3.jpg'

interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  preparationTime: number;
  steps: string;
  rating: number;
  image?: string;
}

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // TODO : Remove Dummy data to simulate recipes
    const dummyRecipes: Recipe[] = [
      {
        id: 1,
        title: "Spaghetti Carbonara",
        ingredients: ["Spaghetti", "Eggs", "Cheese", "Bacon"],
        preparationTime: 30,
        steps: "1. Cook the spaghetti according to package instructions. 2. Cook the spaghetti according to package instructions 3, Cook the spaghetti according to package instruction",
        rating: 4,
        image: image1
      },
      {
        id: 2,
        title: "Avocado Toast",
        ingredients: ["Avocado", "Toast", "Salt", "Pepper"],
        preparationTime: 10,
        steps: "1. Cook the spaghetti according to package instructions. 2. Cook the spaghetti according to package instructions 3, Cook the spaghetti according to package instruction",
        rating: 2,
        image: image2,
      },
      {
        id: 3,
        title: "Caesar Salad",
        ingredients: ["Lettuce", "Croutons", "Caesar Dressing", "Parmesan"],
        preparationTime: 15,
        steps: "1. Cook the spaghetti according to package instructions. 2. Cook the spaghetti according to package instructions 3, Cook the spaghetti according to package instruction",
        rating: 3,
        image: image3,
      },
    ];

    // Set dummy data to recipes
    setRecipes(dummyRecipes);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Home;
