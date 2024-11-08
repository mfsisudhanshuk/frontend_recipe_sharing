import { useEffect, useState } from 'react';
import { CommentForm } from './CommentRecipe';
import { Comment } from './Comment';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../../services/recipeService';
import { Loader } from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';

interface CommentType {
  username: string;
  text: string;
  timestamp: string;
}

interface Recipe {
  id: string;
  title: string;
  preparationTime: string;
  ingredients: string[];
  steps: string;
  rating: string;
  image: string;
}

export const RecipeDetail = () => {

  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null)

  // TODO: Update with real data
  const [comments, setComments] = useState<CommentType[]>([
    {
      username: 'Jane Doe',
      text: 'This recipe was amazing!',
      timestamp: '2024-11-05 10:30 AM',
    },
    {
      username: 'John Smith',
      text: 'Easy to follow, turned out great!',
      timestamp: '2024-11-05 11:00 AM',
    },
  ]);

  const addComment = (username: string, text: string) => {
    const newComment = {
      username,
      text,
      timestamp: new Date().toLocaleString(),
    };
    setComments([...comments, newComment]);
  };

  
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (id) {
          const data = await getRecipeById(id);
          setRecipe(data);
        }
      } catch (err) {
        setError("Failed to fetch recipe details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Full-width image */}
      <img
        src={recipe?.image}
        alt={recipe?.title}
        className="w-full h-1/3 object-cover rounded-lg shadow-md"
      />

      {/* Recipe details */}
      <div className="mt-6 px-4">
        <h1 className="text-3xl font-bold text-gray-800">{recipe?.title}</h1>

        {/* Like count */}
        <div className="mt-4 flex items-center gap-4">
          <span className="text-gray-600 font-medium">
            ❤️ {recipe?.rating} Likes
          </span>
        </div>

        {/* Ingredients */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Ingredients</h2>
          <ul className="mt-2 list-disc pl-6 text-gray-700">
            {recipe?.ingredients?.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        {/* Preparation Time */}
        <div className="mt-6 flex items-center">
          <span className="text-xl font-semibold text-gray-800">Preparation Time:</span>
          <span className="ml-2 text-gray-700">{recipe?.preparationTime} minutes</span>
        </div>

        {/* Steps */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Steps</h2>
          <p className="mt-2 text-gray-700 text-lg leading-relaxed">
            {recipe?.steps}
          </p>
        </div>

        {/* Horizontal line separator */}
        <hr className="mt-8 border-gray-300" />

        {/* Comment Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>

        {/* Comment Form */}
        <CommentForm onAddComment={addComment} />

        {/* List of Comments */}
        <div>
          {comments.map((comment, index) => (
            <Comment
              key={index}
              username={comment.username}
              text={comment.text}
              timestamp={comment.timestamp}
            />
          ))}
        </div>
      </section>
      
      </div>
    </div>
  );
};

export default RecipeDetail;
