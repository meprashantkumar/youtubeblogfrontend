import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Blogs from "./pages/blogs/Blogs";
import BlogPage from "./pages/blogpage/BlogPage";
import Auth from "./pages/auth/Auth";
import Account from "./pages/account/Account";
import { AppData } from "./Context/Context";

const App = () => {
  const { isAuth, user, loading } = AppData();
  return (
    <>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<BlogPage />} />
            <Route path="/login" element={isAuth ? <Home /> : <Auth />} />
            <Route
              path="/account"
              element={isAuth ? <Account user={user} /> : <Auth />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
