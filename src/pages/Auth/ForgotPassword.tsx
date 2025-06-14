/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.scss';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    try {
      // Assuming an API call here to send a password reset request
      // const response = await api.post('/auth/forgot-password', { email });

      // Mock success
      setSuccessMessage('A password reset link has been sent to your email.');
      setErrorMessage('');
      
      // Redirect to login page or show success message
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error: any) {
      setErrorMessage('Failed to send reset link. Please try again later.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <Typography variant="h4" gutterBottom>
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            variant="outlined"
            className="email-input"
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <Button variant="contained" color="primary" type="submit" className="submit-button">
            Send Reset Link
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
