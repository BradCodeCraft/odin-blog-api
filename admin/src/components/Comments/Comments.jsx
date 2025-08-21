import { useEffect, useState } from "react";
import * as styles from "./Comments.module.css";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useOutletContext();

  useEffect(() => {
    async function getAllComments() {
      try {
        setLoading(true);

        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/comments`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (response.status === 200) {
          setComments(response.data);
        }
      } catch (error) {
        setError(error);
        setComments([]);
      } finally {
        setLoading(false);
      }
    }

    getAllComments();
  }, []);

  /**
   * @param {Number} commentId
   */
  async function deleteCommentById(commentId) {
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`${styles.commentsPage} ${styles.page}`}>
      {loading && <h1>Loading...Please wait...</h1>}
      {error && <h1>Error encountered</h1>}
      <h1>Comments</h1>

      <section className={`${styles.comments}`}>
        {comments &&
          comments.map((comment) => {
            return (
              <div key={comment.id} className={`${styles.commentCard}`}>
                <h2>{comment.user.username}</h2>
                <p>{comment.content}</p>

                <div className={`${styles.commentButtons}`}>
                  <Link
                    className={`${styles.buttonLink}`}
                    to={`/comments/${comment.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      deleteCommentById(comment.id);
                    }}
                    className={`${styles.button}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </section>
    </div>
  );
}
