import { useEffect, useState } from "react";
import * as styles from "./EditComment.module.css";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EditComment() {
  const navigate = useNavigate();
  const location = useLocation();
  const commentId = location.pathname.split("/")[2];
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const { token } = useOutletContext();

  useEffect(() => {
    async function getCommentById() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/comments/${commentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          setError(null);
          setContent(response.data.content);
        }
      } catch (error) {
        setContent(null);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getCommentById();
  }, []);

  /**
   * @param {Event} e
   */
  async function updateCommentById(e) {
    e.preventDefault();

    try {
      await axios.put(
        `${import.meta.env.VITE_SERVER}/comments/${commentId}`,
        {
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      navigate("/comments");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`${styles.viewCommentPage} ${styles.page}`}>
      {loading && <h1>Loading...Please wait...</h1>}

      {error && <h1>${error}</h1>}

      <h1>Edit Content</h1>

      <form
        className={`${styles.editCommentForm} ${styles.form}`}
        onSubmit={(e) => updateCommentById(e)}
      >
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
        <Link className={`${styles.buttonLink}`} to={`/comments`}>
          Back
        </Link>
      </form>
    </div>
  );
}
