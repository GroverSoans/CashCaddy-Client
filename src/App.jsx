import { useEffect, useState } from 'react'
import axios from 'axios'
import { usePlaidLink } from 'react-plaid-link';

axios.defaults.baseURL = "http://localhost:8000"

function PlaidAuth({publicToken}) {
  const [account, setAccount] = useState();


  useEffect(() => {
    async function fetchData() {
      let accessToken = await axios.post("/api/exchange_public_token", {public_token: publicToken})
      console.log("accessToken", accessToken.data);
      const auth = await axios.post("/api/auth", {access_token: accessToken.data.accessToken})
      console.log("auth data", auth.data)
      setAccount(auth.data.numbers.ach[0])
    }
    fetchData()
  }, [])
  return account && (
    <div>
          <p>Account number: {account.account}</p>
          <p>Routing number: {account.routing}</p>
    </div>

  );
}

function App() {
  const [linkToken, setLinkToken] = useState();
  const [publicToken, setPublicToken] = useState();

  useEffect(()=>{
    async function fetch() {
      const response = await axios.post("/api/create_link_token");
      console.log("response ", response.data);
      setLinkToken(response.data.link_token)
    }
    fetch()
  }, [])


  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
    // send public_token to server
    console.log('success', public_token, metadata)
    setPublicToken(public_token)
    },
  });


  return publicToken ? (<PlaidAuth publicToken={publicToken}/>) : (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );
}

export default App
