import toast from "react-hot-toast";
import { AppData } from "../../Context/Context";
import "./account.css";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = AppData();
  const logoutHandler = () => {
    setIsAuth(false);
    setUser([]);
    localStorage.clear();
    toast.success("Logged Out");
  };
  return (
    <div>
      {user && (
        <div className="account">
          <div className="content">
            <span>
              <p>Name</p>- {user.name}
            </span>
            <span>
              <p>Email</p>- {user.email}
            </span>
            <button onClick={logoutHandler}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
