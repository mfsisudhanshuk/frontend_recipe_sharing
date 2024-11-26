// AddRecipeForm.tsx
import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../../components/common/Button";
import {
  RECIPE_VALIDATION_ERRORS,
  RECIPE_PLACEHOLDER,
  RECIPE_LABEL,
  IMAGE_PLACEHOLDER,
} from "../../utils/constants";
import { createRecipe, uploadRecipeImage } from "../../services/recipeService";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../components/common/Toast";
import { Loader } from "../../components/common/Loader";

interface recipeData {
  title: string;
  ingredients: string[];
  preparationTime: number;
  steps: string;
  rating: number;
  image: File | null;
}

// Validation Schema
const validationSchema = Yup.object({
  title: Yup.string().required(RECIPE_VALIDATION_ERRORS.TITLE_REQUIRED),
  ingredients: Yup.array()
    .of(Yup.string().required(RECIPE_VALIDATION_ERRORS.INGREDIENT_REQUIRED))
    .min(1, RECIPE_VALIDATION_ERRORS.INGREDIENT_LENGTH),
  preparationTime: Yup.number()
    .min(1, RECIPE_VALIDATION_ERRORS.PREPARATION_TIME_MIN)
    .required(RECIPE_VALIDATION_ERRORS.PREPARATION_TIME_REQUIRED),
  steps: Yup.string().required(RECIPE_VALIDATION_ERRORS.STEPS_REQUIRED),
  rating: Yup.number()
    .min(1, RECIPE_VALIDATION_ERRORS.RATING_MIN_MAX)
    .max(5, RECIPE_VALIDATION_ERRORS.RATING_MIN_MAX)
    .required(RECIPE_VALIDATION_ERRORS.RATING_REQUIRED),
});

export const AddRecipe = () => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const initialValues: recipeData = {
    title: "",
    ingredients: [""],
    preparationTime: 0,
    steps: "",
    rating: 3,
    image: null,
  };

  const navigate = useNavigate();

  const handleSubmit = async (values: recipeData) => {
    setLoading(true);
    try {
      // 1. Upload image to Cloudinary
      let imageUrl = {
        data: IMAGE_PLACEHOLDER,
      };
      if (values.image) {
        setImageLoading(true);
        imageUrl = await uploadRecipeImage(values.image);
        if (imageUrl?.data) {
          setImageLoading(false);
        }
      }

      // Prepare FormData for file upload
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("steps", values.steps);
      formData.append("preparationTime", values.preparationTime.toString());
      formData.append("rating", values.rating.toString());
      values.ingredients.forEach((ingredient, index) => {
        formData.append(`ingredients[${index}]`, ingredient);
      });

      if (values.image) {
        formData.append("image", imageUrl?.data || IMAGE_PLACEHOLDER);
      }

      // Call createRecipe service
      const result = await createRecipe(formData);

      setSuccessMessage(result?.message);
      navigate("/");
    } catch (error: any) {
      setError(
        error?.response?.statusText ||
          "Something went wrong, Please try again !"
      );
    } finally {
      setLoading(false);
      setImageLoading(false);
    }
  };

  if (loading && !imageLoading) return <Loader />;

  return (
    <>
      {successMessage && (
        <Toast
          message={successMessage}
          type="success"
          onClose={() => setSuccessMessage(null)}
        />
      )}

      {error && (
        <Toast message={error} type="error" onClose={() => setError(null)} />
      )}

      <div className="container mx-auto px-4 py-8 max-w-lg bg-white shadow-md rounded-md mt-20">
        <h2 className="text-2xl font-semibold mb-6">Add Recipe</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              {/* Title Field */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  {RECIPE_LABEL.TITLE}
                </label>
                <Field
                  type="text"
                  name="title"
                  placeholder={RECIPE_PLACEHOLDER.TITLE}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  aria-required="true"
                  aria-describedby="title-error"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                  aria-live="polite"
                />
              </div>

              {/* Ingredients Field Array */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  {RECIPE_LABEL.INGREDIENTS}
                </label>
                <FieldArray name="ingredients">
                  {({ remove, push, form }) => (
                    <div>
                      {form.values.ingredients.map((_: any, index: any) => (
                        <div key={index} className="flex mb-2">
                          <Field
                            name={`ingredients[${index}]`}
                            placeholder={`Ingredient ${index + 1}`}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mr-2"
                            aria-required="true"
                            aria-describedby={`ingredients-error-${index}`}
                          />
                          <Button
                            type="button"
                            onClick={() => remove(index)}
                            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        onClick={() => push("")}
                        className="mt-2"
                      >
                        Add Ingredient
                      </Button>
                    </div>
                  )}
                </FieldArray>
                <ErrorMessage
                  name="ingredients"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                  aria-live="polite"
                />
              </div>

              {/* Preparation Time Field */}
              <div className="mb-4">
                <label
                  htmlFor="preparationTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  {RECIPE_LABEL.PREPARATION_TIME}
                </label>
                <Field
                  type="number"
                  name="preparationTime"
                  placeholder={RECIPE_PLACEHOLDER.PREPARATION_TIME}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  aria-required="true"
                  aria-describedby="preparationTime-error"
                />
                <ErrorMessage
                  name="preparationTime"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                  aria-live="polite"
                />
              </div>

              {/* Steps Field */}
              <div className="mb-4">
                <label
                  htmlFor="steps"
                  className="block text-sm font-medium text-gray-700"
                >
                  {RECIPE_LABEL.STEPS}
                </label>
                <Field
                  as="textarea"
                  name="steps"
                  placeholder={RECIPE_PLACEHOLDER.STEPS}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  rows={4}
                  aria-required="true"
                  aria-describedby="recipe-steps-error"
                />
                <ErrorMessage
                  name="steps"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                  aria-live="polite"
                />
              </div>

              {/* Rating Field */}
              <div className="mb-4">
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium text-gray-700"
                >
                  {RECIPE_LABEL.RATING}
                </label>
                <Field
                  type="number"
                  name="rating"
                  placeholder={RECIPE_PLACEHOLDER.RATING}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  aria-required="true"
                  aria-describedby="recipe-rating-error"
                />
                <ErrorMessage
                  name="rating"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                  aria-live="polite"
                />
              </div>

              {/* Image Upload Field */}
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  {RECIPE_LABEL.IMAGE}
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={(event) => {
                    if (event.currentTarget.files) {
                      setFieldValue("image", event.currentTarget.files[0]);
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  aria-describedby="image-error"
                />
                {imageLoading && (
                  <div className="flex items-center mt-2">
                    <span>Uploading Image...</span>
                  </div>
                )}
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                  aria-live="polite"
                />
              </div>

              <Button
                type="submit"
                className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Add Recipe
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
