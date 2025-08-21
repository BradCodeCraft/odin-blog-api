import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import * as styles from "./EditPost.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EditPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.state.postId;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useOutletContext();

  useEffect(() => {
    async function getPostById() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/posts/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          setError(null);
          setTitle(response.data.title);
          setContent(response.data.content);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getPostById();
  }, []);

  /**
   * @param {Event} e
   */
  async function updatePostById(e) {
    try {
      e.preventDefault();

      await axios.put(
        `${import.meta.env.VITE_SERVER}/posts/${postId}`,
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`${styles.editPostPage} ${styles.page}`}>
      {loading && <h1>Loading...Please wait...</h1>}

      {error && <h1>${error}</h1>}

      <h1>Edit Post</h1>

      <form
        className={`${styles.editPostForm} ${styles.form}`}
        onSubmit={(e) => updatePostById(e)}
      >
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            maxLength={50}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </div>

        <div>
          <label htmlFor="context">Content</label>
          <textarea
            name="content"
            id="content"
            rows={10}
            onChange={(e) => setContent(e.target.value)}
            value={content}
            required
          ></textarea>
        </div>

        <button type="submit">Submit</button>
        <Link className={`${styles.buttonLink}`} to={`/posts/${postId}`}>
          Back
        </Link>
      </form>
    </div>
  );
}
