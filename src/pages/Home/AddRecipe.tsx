// AddRecipeForm.tsx
import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../../components/common/Button";
import { RECIPE_VALIDATION_ERRORS , RECIPE_PLACEHOLDER, RECIPE_LABEL} from "../../utils/constan";

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
    .max(5,  RECIPE_VALIDATION_ERRORS.RATING_MIN_MAX)
    .required(RECIPE_VALIDATION_ERRORS.RATING_REQUIRED),
});

export const AddRecipe = () => {
  const initialValues: recipeData = {
    title: "",
    ingredients: [""],
    preparationTime: 0,
    steps: "",
    rating: 3,
    image: null,
  };

  const handleSubmit = (values: recipeData) => {
    // TODO : Handle backend Integration.
    console.log("Recipe data submitted:", values);
  };

  return (
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
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
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
              />
              <ErrorMessage
                name="preparationTime"
                component="div"
                className="text-red-500 text-sm mt-1"
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
              />
              <ErrorMessage
                name="steps"
                component="div"
                className="text-red-500 text-sm mt-1"
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
              />
              <ErrorMessage
                name="rating"
                component="div"
                className="text-red-500 text-sm mt-1"
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
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 text-sm mt-1"
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
  );
};
