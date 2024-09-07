import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log('Attempting to register:', email, password);

      const response = await axios.post('/api/register', { email, password });
      console.log('Server response:', response);

      if (response.data.success) {
        alert('Registration successful!');
      } else {
        alert('Registration failed. Try again.');
      }
    } catch (error) {
      console.error('Error registering', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </form>
  );
}

export default Register;
