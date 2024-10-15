import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage'
import EmailVerificationPage from "./pages/EmailVerificationPage";



function App() {
  return (
    <div className='App flex items-center justify-center relative overflow-hidden'>


      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/login' element = {<LoginPage/>} />
        <Route path='/signup' element = {<SignUpPage/>} />
        <Route path='/verify-email' element = {<EmailVerificationPage/>}/>
      </Routes>
    </div>

  );
}

export default App;
