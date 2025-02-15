// RegistrationForm.tsx
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "../../components/common/Input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/userService";
import { Toast } from "../../components/common/Toast";
import { loginPayload } from "../../types/user.type";
import { Button } from "../../components/common/Button";
import { LOGIN_LABEL, LOGIN_PLACEHOLDER, LOGIN_VALIDATION_ERRORS } from "../../utils/constants";

// Validation Schema with Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      LOGIN_VALIDATION_ERRORS.EMAIL_INVALID
    )
    .required(LOGIN_VALIDATION_ERRORS.EMAIL_REQUIRED),
  password: Yup.string()
    .min(8, LOGIN_VALIDATION_ERRORS.PASSWORD_MIN_LENGTH)
    .required(LOGIN_VALIDATION_ERRORS.PASSWORD_REQUIRED),
});
 
const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const dispatch = useDispatch(); // Get dispatch from Redux
  const navigate = useNavigate();

  const handleSubmit = async (values: loginPayload) => {
    const { email, password } = values;

    const result = await loginUser({ email, password }, dispatch);

    if (result.success) {
      setSuccessMessage(result.message);
      navigate("/"); // Redirect to home
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-20">
      <h2 className="text-2xl font-semibold text-center text-gray-700">
        Login
      </h2>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Input
            name="email"
            type="email"
            label={LOGIN_LABEL.EMAIL}
            placeholder={LOGIN_PLACEHOLDER.EMAIL}
          />
          <Input
            name="password"
            type="password"
            label={LOGIN_LABEL.PASSWORD}
            placeholder={LOGIN_PLACEHOLDER.PASSWORD}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </Form>
      </Formik>
      {error && (
        <Toast message={error} type="error" onClose={() => setError(null)} />
      )}
      {successMessage && (
        <Toast
          message={successMessage}
          type="success"
          onClose={() => setSuccessMessage(null)}
        />
      )}
    </div>
  );
};


export default Login;