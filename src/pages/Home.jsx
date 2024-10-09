import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Plaid from "../components/Plaid"

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }
      try {
        const { data } = await axios.post(
          "http://localhost:8000/", 
          {}, 
          { withCredentials: true }
        );
        const { status, user } = data;

        if (status) {
          setFirstName(user);
          toast(`Hello ${user}`, {
            position: "top-right",
          });
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        removeCookie("token");  // Ensure token is removed in case of error
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const handleLogout = () => {
    removeCookie("token", { path: "/" });  // Ensure correct path
    navigate("/login");
  };

  return (
    <>
      <div className="">
        <h4>
          Welcome <span>{firstName}</span>
        </h4>
        <Plaid></Plaid>
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
    </>
  );
};

export default Home;
