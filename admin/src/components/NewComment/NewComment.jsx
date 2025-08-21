import { useState } from "react";
import * as styles from "./NewComment.module.css";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";

export default function NewComment() {
  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.state.postId;
  const [content, setContent] = useState("");
  const { user, token } = useOutletContext();

  /**
   * @param {Event} e
   */
  async function handleFormSubmission(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/posts/${postId}/comments`,
        {
          content: content,
          userId: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        navigate(`/posts/${postId}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`${styles.newCommentPage} ${styles.page}`}>
      <h1>New Comment</h1>

      <form
        className={`${styles.newCommentForm} ${styles.form}`}
        onSubmit={(e) => handleFormSubmission(e)}
      >
        <div>
          <label htmlFor="context">Content</label>
          <textarea
            name="content"
            id="content"
            rows={10}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
