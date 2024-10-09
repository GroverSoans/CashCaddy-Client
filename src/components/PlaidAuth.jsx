import { useEffect, useState } from 'react';
import axios from 'axios';
import AccountInfo from './AccountInfo';
import AchInfo from './AchInfo';

function PlaidAuth({ publicToken }) {
  const [account, setAccount] = useState();
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Exchange public token for access token
        const accessTokenResponse = await axios.post('/api/exchange_public_token', { public_token: publicToken });
        const accessToken = accessTokenResponse.data.accessToken;

        // Fetch account details
        const authResponse = await axios.post('/api/auth', { access_token: accessToken });
        const accountResponse = await axios.post('/api/accounts', { access_token: accessToken });

        console.log('auth data', authResponse.data);
        console.log('accounts data', accountResponse.data);
        setAccount(authResponse.data.numbers.ach[0]);
        setAccounts(accountResponse.data.accounts);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    fetchData();
  }, [publicToken]);

  return (
    <div>
      <h2>Account Information</h2>
      <AccountInfo accounts={accounts} />
      <AchInfo account = {account} />
    </div>
  );
}

export default PlaidAuth;
