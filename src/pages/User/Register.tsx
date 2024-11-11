// RegistrationForm.tsx
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "../../components/common/Input";
import { registerUser } from "../../services/userService";
import { Toast } from "../../components/common/Toast";
import { Loader } from "../../components/common/Loader";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { registerPayload } from "../../types/user.type";
import { REGISTER_VALIDATION_ERRORS } from "../../utils/constants";

// Validation Schema with Yup
const validationSchema = Yup.object({
  name: Yup.string().required(REGISTER_VALIDATION_ERRORS.NAME_REQUIRED),
  email: Yup.string().matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    REGISTER_VALIDATION_ERRORS.EMAIL_INVALID
  ),
  password: Yup.string()
    .min(8, REGISTER_VALIDATION_ERRORS.PASSWORD_MIN_LENGTH)
    .required(REGISTER_VALIDATION_ERRORS.PASSWORD_REQUIRED),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], REGISTER_VALIDATION_ERRORS.CONFIRM_PASSWORD_MATCH)
    .required(REGISTER_VALIDATION_ERRORS.CONFIRM_PASSWORD),
});

export const Register = () => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Register form submit handler
  const handleSubmit = async (values: registerPayload) => {
    setLoading(true);
    setError(null);
    try {
      const { confirmPassword, ...userData } = values;

      const response = await registerUser(userData);

      if (!response?.error || !response?.errors) {
        setSuccessMessage(response?.message);
        navigate("/");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-20">
      <h2 className="text-2xl font-semibold text-center text-gray-700">
        Register
      </h2>

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Input
            name="name"
            type="text"
            label="Name"
            placeholder="Enter your name"
          />
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
          />
          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
          />
          <Input
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
          />
          {error && (
            <Toast
              message={error}
              type="error"
              onClose={() => setError(null)}
            />
          )}
          {successMessage && (
            <Toast
              message={successMessage}
              type="success"
              onClose={() => setSuccessMessage(null)}
            />
          )}
          <Button type="submit" className="w-full">
            Register
          </Button>
        </Form>
      </Formik>
    </div>
  );
};
