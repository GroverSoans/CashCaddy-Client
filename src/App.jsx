import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';



function App() {
  return (
    <div className='App flex items-center justify-center relative overflow-hidden'>


      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/login' element = {<LoginForm/>} />
        <Route path='/signup' element = {<SignupForm/>} />
      </Routes>
    </div>

  );
}

export default App;
