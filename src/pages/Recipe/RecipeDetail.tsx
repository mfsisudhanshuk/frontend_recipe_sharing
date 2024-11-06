import image2 from '../../assets/image-2.jpg';

// TODO:  Mock data example (remove if fetching from an API)
const recipeData = {
  id: 3,
  title: "Caesar Salad",
  ingredients: ["Lettuce", "Croutons", "Caesar Dressing", "Parmesan"],
  preparationTime: 15, // in minutes
  steps: "1. Toss the lettuce with Caesar dressing. 2. Add croutons and Parmesan. 3. Serve and enjoy!",
  rating: 3,
  image: image2,
};

export const RecipeDetail = () => {
  const recipe = recipeData; // Replace with fetched data based on `id`

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Full-width image */}
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-1/3 object-cover rounded-lg shadow-md"
      />

      {/* Recipe details */}
      <div className="mt-6 px-4">
        <h1 className="text-3xl font-bold text-gray-800">{recipe.title}</h1>

        {/* Like count */}
        <div className="mt-4 flex items-center gap-4">
          <span className="text-gray-600 font-medium">
            ❤️ {recipe.rating} Likes
          </span>
        </div>

        {/* Ingredients */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Ingredients</h2>
          <ul className="mt-2 list-disc pl-6 text-gray-700">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        {/* Preparation Time */}
        <div className="mt-6 flex items-center">
          <span className="text-xl font-semibold text-gray-800">Preparation Time:</span>
          <span className="ml-2 text-gray-700">{recipe.preparationTime} minutes</span>
        </div>

        {/* Steps */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Steps</h2>
          <p className="mt-2 text-gray-700 text-lg leading-relaxed">
            {recipe.steps}
          </p>
        </div>

        {/* Horizontal line separator */}
        <hr className="mt-8 border-gray-300" />
      </div>
    </div>
  );
};

export default RecipeDetail;
