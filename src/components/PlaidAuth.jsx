import { useEffect, useState } from 'react';
import axios from 'axios';

function PlaidAuth({ publicToken }) {
  // State to store the account information (account number and routing number)
  const [account, setAccount] = useState();

  useEffect(() => {
    // Function to fetch access token and account information from the server
    async function fetchData() {
      try {
        // Exchange the public token for an access token by calling the backend
        let accessToken = await axios.post('/api/exchange_public_token', { public_token: publicToken });
        console.log('accessToken', accessToken.data);

        // Use the access token to get authenticated account information
        const auth = await axios.post('/api/auth', { access_token: accessToken.data.accessToken });
        console.log('auth data', auth.data);

        // Extract and store the account information (ACH data)
        setAccount(auth.data.numbers.ach[0]);
      } catch (error) {
        // Handle errors in the API call process
        console.error('Error fetching data', error);
      }
    }
    // Call the function when the component mounts
    fetchData();
  }, [publicToken]); // The effect runs when `publicToken` changes

  // If account data is available, render account details (account number and routing number)
  return account && (
    <div>
      <p>Account number: {account.account}</p>
      <p>Routing number: {account.routing}</p>
    </div>
  );
}

export default PlaidAuth;

