import { useEffect, useState } from "react";
import {RecipeCard} from "../Home/RecipeCard";
import image1 from '../../assets/image-1.jpg';
import image2 from '../../assets/image-2.jpg';
import image3 from '../../assets/image-3.jpg'
import { Button } from "../../components/common/Button";

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
  const [searchTerm, setSearchTerm] = useState("");

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
      {
        id: 4,
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


    const handleSearch = () => {
    // Here you can trigger any search-specific logic
    console.log("Searching for:", searchTerm);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filter recipes based on search term
  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="container mx-auto px-4 mt-10">
      <h1 className="text-2xl font-semibold mb-4">Recipes List</h1>
       {/* Search box */}
       <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchInputChange}
          placeholder="Search recipes..."
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <Button onClick={handleSearch}>Search</Button>

      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Home;
