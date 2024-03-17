import { useState } from "react";
import "./auth.css";
import axios from "axios";
import { AppData, server } from "../../Context/Context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <div className="authContainer">
        <div className={toggle ? "authform2" : "authform"}>
          <div className="left">
            <h1>Hello</h1>
            <button onClick={() => setToggle(!toggle)}>
              {toggle ? "Have an Account?" : "Don't Have an Account?"}
            </button>
          </div>
          <div className="right">{toggle ? <Register /> : <Login />}</div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

function Login() {
  const { setUser, setIsAuth } = AppData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${server}/login`, {
        email,
        password,
      });

      if (data.message) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setIsAuth(true);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button>Login</button>
      </form>
    </div>
  );
}

function Register() {
  const { setUser, setIsAuth } = AppData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${server}/register`, {
        name,
        email,
        password,
      });

      if (data.message) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setIsAuth(true);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="register">
      <h1>Register</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button>Register</button>
      </form>
    </div>
  );
}
