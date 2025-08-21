import * as styles from "./NewPost.module.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function NewPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { token } = useOutletContext();

  /**
   * @param {Event} e
   */
  async function handleFormSubmission(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/posts/`,
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

      if (response.status === 200) {
        navigate("/posts");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`${styles.newPostPage} ${styles.page}`}>
      <h1>New Post</h1>

      <form
        className={`${styles.newPostForm} ${styles.form}`}
        onSubmit={(e) => handleFormSubmission(e)}
      >
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            maxLength={50}
            onChange={(e) => setTitle(e.target.value)}
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
            required
          ></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
