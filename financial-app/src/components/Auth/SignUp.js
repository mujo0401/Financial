import React, { useState } from 'react';
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
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, userData);
      setMessage(response.data.message || 'Registration successful!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <SignUpContainer>
      <SignUpForm onSubmit={handleSubmit}>
        <Title>Sign Up</Title>
        <label>
          Username:
          <Input type="text" name="username" value={userData.username} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <Input type="email" name="email" value={userData.email} onChange={handleChange} required />
        </label>
        <label>
          Password:
          <Input type="password" name="password" value={userData.password} onChange={handleChange} required />
        </label>
        <Button type="submit">Sign Up</Button>
      </SignUpForm>
      {message && <Message>{message}</Message>}
    </SignUpContainer>
  );
};

export default SignUp;
