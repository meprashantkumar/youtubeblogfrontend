import { AiOutlineComment } from "react-icons/ai";
import "./blogpage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { AppData, server } from "../../Context/Context";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const BlogPage = () => {
  const [blog, setBlog] = useState([]);

  const params = useParams();

  const [show, setShow] = useState(false);

  const [comments, setComments] = useState([]);

  async function fetchBlog() {
    try {
      const { data } = await axios.get(`${server}/blog/${params.id}`);

      setBlog(data.blog);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchComments() {
    try {
      const { data } = await axios.get(`${server}/comments/${params.id}`);

      setComments(data.comments);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, []);
  return (
    <div>
      {show && (
        <CommentModal
          setShow={setShow}
          comments={comments}
          fetchComments={fetchComments}
          id={params.id}
        />
      )}
      {blog && (
        <div className="containerblog">
          <h1>{blog.title}</h1>

          <div className="blogPage">
            <div className="left">
              <img src={blog.image} alt="" />
              <p>{blog.description}</p>
              <p>{blog.ownername}</p>
              <button onClick={() => setShow(true)}>
                <span>
                  <AiOutlineComment />
                </span>
                Comments
              </button>
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: blog.blog }}
              className="right"
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;

function CommentModal({ setShow, comments, fetchComments, id }) {
  const { isAuth } = AppData();
  const [comment, setComment] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${server}/blog/${id}`,
        { comment },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (data.message) {
        toast.success(data.message);
        fetchComments();
        setComment("");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);
  return (
    <div>
      <div className="commentbackground" onClick={() => setShow(false)}></div>
      <div className="commentmodal">
        <div className="top">
          <h1>Comments</h1>
          <button onClick={() => setShow(false)}>X</button>
        </div>

        {isAuth && (
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Enter Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <button>Add</button>
          </form>
        )}

        <div className="comments">
          {comments && comments.length > 0 ? (
            comments.map((e, i) => {
              return (
                <p key={i}>
                  <span>{e.user}</span> - {e.comment}
                </p>
              );
            })
          ) : (
            <p>No Comments Yet!</p>
          )}
        </div>
      </div>
    </div>
  );
}
