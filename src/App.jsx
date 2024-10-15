import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage'
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import DashboardPage from "./pages/DashboardPage";


const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};



function App() {
  const {isCheckingAuth, checkAuth, isAuthenticated, user} = useAuthStore()

  useEffect(() =>{
    checkAuth()
  },[checkAuth])

  console.log("isauthenticated", isAuthenticated);
  console.log("user", user);

  return (
    <div className='min-h-screen flex items-center justify-center relative overflow-hidden'>


      <Routes>
        <Route path='/' element = {<ProtectedRoute>
          <DashboardPage/>
        </ProtectedRoute>} />

        <Route path='/login' element = {<RedirectAuthenticatedUser>
          <LoginPage/>
        </RedirectAuthenticatedUser>} />

        <Route path='/signup' element = {<RedirectAuthenticatedUser>
          <SignUpPage/>
        </RedirectAuthenticatedUser>} />

        <Route path='/verify-email' element = {<EmailVerificationPage/>}/>
        </Routes>
    </div>

  );
}

export default App;
