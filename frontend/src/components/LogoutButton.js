import { usePassageLogout } from "../hooks";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const { logout } = usePassageLogout();

  const navigate = useNavigate();

  const signout = () => {
    logout();
    navigate("/");
  };
  // return <button onClick={signout}>Sign Out</button>;


  return <a onClick={signout}>Sign Out</a>

};

export default LogoutButton;
