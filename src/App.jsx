import { useEffect } from 'react'
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:8000"

function App() {
  useEffect(()=>{
    async function fetch() {
      const response = await axios.post("/hello", {name: "grover"});
      console.log("response ", response.data);
    }
    fetch()
  }, [])

  return (
    <div>Hello World</div>
    
  )
}

export default App
