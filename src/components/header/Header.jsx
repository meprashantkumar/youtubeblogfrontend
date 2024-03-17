import { AppData } from "../../Context/Context";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const { isAuth } = AppData();
  return (
    <div>
      <header>
        <div className="logo">
          <Link to="/">
            <img src="/logo.jpeg" alt="" />
          </Link>
        </div>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          {isAuth ? (
            <li>
              <Link to="/account">Account</Link>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Header;
