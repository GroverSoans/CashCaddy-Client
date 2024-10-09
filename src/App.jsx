import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/login' element = {<LoginForm/>} />
        <Route path='/signup' element = {<SignupForm/>} />
      </Routes>
    </div>

  );
}

export default App;
