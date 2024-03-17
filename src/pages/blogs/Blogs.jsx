import { Link } from "react-router-dom";
import "./blogs.css";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import Modal from "../../components/model/Modal";
import axios from "axios";
import { AppData, server } from "../../Context/Context";
import toast from "react-hot-toast";

const categories = [
  "Study",
  "Sports",
  "Politics",
  "Entertainment",
  "Technology",
  "Food",
  "Business",
  "Travel",
  "Health ",
];

const Blogs = () => {
  const { user } = AppData();
  const [show, setShow] = useState(false);
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  async function fetchBlogs() {
    try {
      const { data } = await axios.get(
        `${server}/all?search=${search}&category=${category}&page=${page}&skip=4`
      );

      setBlog(data.blogs);
      setTotal(data.totalBlogs);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  let totalPages;

  if (blog) {
    totalPages = Math.ceil(total / 4);
  }

  console.log(totalPages);

  useEffect(() => {
    fetchBlogs();
  }, [search, category]);
  return (
    <div>
      <div className="blogs">
        {show && <Modal setShow={setShow} fetchBlogs={fetchBlogs} />}
        <div className="top">
          <h1 className="heading">Blogs</h1>
          {user.role === "admin" && (
            <button onClick={() => setShow(true)}>+ Add Blog</button>
          )}
        </div>

        <div className="search">
          <input
            type="text"
            placeholder="Search.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <br />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Search With Category</option>
            {categories.map((e, i) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="blogContainer">
            {blog && blog.length > 0 ? (
              blog
                .slice((page - 1) * 4, page * 4)
                .map((e, i) => (
                  <Blog
                    key={i}
                    title={e.title}
                    category={e.category}
                    image={e.image}
                    id={e._id}
                    blog={e}
                    fetchBlogs={fetchBlogs}
                  />
                ))
            ) : (
              <p>No Blog Yet!</p>
            )}
          </div>
        )}

        <div className="pagination">
          <span
            className={`${page === 1 ? "notactive" : ""}`}
            onClick={() => setPage(page - 1)}
          >
            {"<<"}
          </span>
          {[...Array(totalPages)].map((_, i) => (
            <div
              onClick={() => setPage(i + 1)}
              key={i}
              className={`page ${page === i + 1 ? "active" : ""}`}
            >
              {i + 1}
            </div>
          ))}
          <span
            className={`${page === totalPages ? "notactive" : ""}`}
            onClick={() => setPage(page + 1)}
          >
            {">>"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Blogs;

function Blog({ title, category, image, id, fetchBlogs }) {
  const { user } = AppData();

  const deleteHandler = async () => {
    if (confirm("Are you sure you want to delete this Blog")) {
      try {
        const { data } = await axios.delete(`${server}/blog/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        if (data.message) {
          toast.success(data.message);
          fetchBlogs();
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <div className="blog">
      <img src={image} alt="" />
      <hr className="line" />
      <span>{title}</span>
      {user && user.role === "admin" && (
        <button onClick={deleteHandler}>
          <AiFillDelete />
        </button>
      )}
      <p>{category}</p>
      <Link to={`/blog/${id}`}>View Blog</Link>
    </div>
  );
}
