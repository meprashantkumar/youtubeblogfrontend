import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const AppContext = createContext();

export const server = "https://blogserver-wmlt.onrender.com/api";

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setUser(data.user);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <AppContext.Provider value={{ user, setUser, loading, isAuth, setIsAuth }}>
      {children}
      <Toaster />
    </AppContext.Provider>
  );
};

export const AppData = () => useContext(AppContext);
