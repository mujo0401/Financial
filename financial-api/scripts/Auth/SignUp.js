/*import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const SignUpContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #89CFF0, #A3E4D7);
`;

const SignUpForm = styled.form`
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: white;
  max-width: 400px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const Message = styled.p`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #cce5ff;
  border-radius: 4px;
  background-color: #e2f0fb;
  text-align: center;
`;

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isSignedUp, setIsSignedUp] = useState(false);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post(`${process.env.Users_API}/signup`, formData);
      if (response.status === 201) {
        setIsSignedUp(true);
        setMessage('User created successfully. Please check your email to verify your account.');
      }
    } catch (error) {
      console.error("Sign up error:", error.response ? error.response.data.error : error.message);
      if (error.response && error.response.status === 409) {
        setError(error.response.data.error);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <SignUpContainer>
      {!isSignedUp ? (
        <SignUpForm onSubmit={handleSubmit}>
          <Title>Sign Up</Title>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <Button type="submit">Sign Up</Button>
        </SignUpForm>
      ) : (
        <Message>{message}</Message>
      )}
      {error && <Message style={{ borderColor: '#f5c6cb', backgroundColor: '#f8d7da' }}>{error}</Message>}
    </SignUpContainer>
  );
};

//export default SignUp;*/