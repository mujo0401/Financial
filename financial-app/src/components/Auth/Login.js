/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import AuthService from '../../Services/AuthService';  // Update the path according to your project structure
import LoadingSpinner from '../LoadingSpinner';       // Update the path according to your project structure

const FormContainer = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  padding: 35px;
  border-radius: 0px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.text};
  text-align: center;
  margin-bottom: 20px;
`;

const ErrorAlert = styled.div`
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: .75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: .25rem;
  text-align: center;
`;

const LoginForm = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: .5rem;
`;

const Input = styled.input`
  display: block;
  width: 87%;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
`;

const SubmitButton = styled.button`
  color: #fff;
  background-color: ${props => props.theme.colors.primary};
  border-color: ${props => props.theme.colors.primary};
  display: block;
  width: 100%;
  padding: .375rem 0;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required').min(6, 'Password should be at least 6 characters')
  });

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError(null);
      try {
        const { token } = await AuthService.authenticateUser(values.username, values.password);
        localStorage.setItem('token', token);
        navigate('/dashboard');
      } catch (err) {
        setError(err.message || 'Login failed');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <LoginContainer>
      <FormContainer>
        <Title>Login</Title>
        {isLoading}
        {error && <ErrorAlert>{error}</ErrorAlert>}
        <LoginForm onSubmit={formik.handleSubmit}>
          <FormGroup>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <ErrorAlert>{formik.errors.username}</ErrorAlert>
            ) : null}
          </FormGroup>
          <FormGroup>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <ErrorAlert>{formik.errors.password}</ErrorAlert>
            ) : null}
          </FormGroup>
          <SubmitButton type="submit">Login</SubmitButton>
        </LoginForm>
      </FormContainer>
    </LoginContainer>
  );
};

export default Login;*/
