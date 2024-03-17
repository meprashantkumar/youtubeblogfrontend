import { useState } from "react";
import "./modal.css";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../Context/Context";

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

const Modal = ({ setShow, fetchBlogs }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [blog, setBlog] = useState("");
  const [ownername, setOwnerName] = useState("");
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      const { data } = await axios.post(
        `${server}/new`,
        {
          title,
          description,
          ownername,
          image,
          category,
          blog,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (data.message) {
        toast.success(data.message);
        setTitle("");
        setDescription("");
        setOwnerName("");
        setCategory("");
        setImage("");
        setBlog("");
        fetchBlogs();
        setloading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setloading(false);
    }
  };
  return (
    <div>
      <div className="background" onClick={() => setShow(false)}></div>
      <div className="modal">
        <div className="top">
          <h1>Add Blog</h1>
          <button onClick={() => setShow(false)}>X</button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter OwnerName"
            value={ownername}
            onChange={(e) => setOwnerName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Category</option>
            {categories.map((e, i) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </select>
          <textarea
            rows="5"
            type="text"
            placeholder="Enter Blog"
            value={blog}
            onChange={(e) => setBlog(e.target.value)}
            required
          ></textarea>
          <span>
            disclaimer - to give subheading use h2 tag and to make new paragraph
            use p tag and to make your font italic use i tag
          </span>
          <button disabled={loading}>{loading ? "Adding..." : "Add"}</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
