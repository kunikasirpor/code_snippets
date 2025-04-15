import { useNavigate , Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const AppLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("user");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <h2>Code Snippet Manager</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>
      <Outlet />
    </>
  );
};

export default AppLayout;
