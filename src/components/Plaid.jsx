import { useEffect, useState } from 'react';
import axios from 'axios';
import { usePlaidLink } from 'react-plaid-link';
import PlaidAuth from './PlaidAuth';

// Set the default base URL for all axios requests to the backend
axios.defaults.baseURL = "http://localhost:8000"

function Plaid() {
  // State to store the Link Token provided by Plaid
  const [linkToken, setLinkToken] = useState();
  // State to store the Public Token after successfully linking an account
  const [publicToken, setPublicToken] = useState();

  // useEffect runs once when the component mounts
  useEffect(() => {
    // Fetch the Link Token from the backend by calling the /api/create_link_token endpoint
    async function fetch() {
      try {
        const response = await axios.post('/api/create_link_token');
        console.log('response ', response.data);
        // Store the link token in state
        setLinkToken(response.data.link_token);
      } catch (error) {
        console.error('Error fetching link token', error);
      }
    }
    fetch();
  }, []); // Empty dependency array ensures this runs once when the component loads

  // Configure the usePlaidLink hook with the token and success handler
  const { open, ready } = usePlaidLink({
    token: linkToken, // Use the link token received from the backend
    onSuccess: (public_token, metadata) => {
      // This function is called when the user successfully links a bank account
      // `public_token` is a temporary token, which will be exchanged for an access token
      console.log('success', public_token, metadata);
      // Store the public token in state
      setPublicToken(public_token);
    },
  });

  // Conditionally render either the PlaidAuth component (if publicToken is available)
  // or a button that triggers the Plaid Link flow to connect a bank account
  return publicToken ? (
    <PlaidAuth publicToken={publicToken} />
  ) : (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );
}

export default Plaid;
