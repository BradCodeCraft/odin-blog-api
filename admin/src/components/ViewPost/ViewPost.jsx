import * as styles from "./ViewPost.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ViewPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, token } = useOutletContext();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

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
          setPost(response.data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getPostById();
  }, []);

  useEffect(() => {
    async function getCommentsByPostId() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/posts/${postId}/comments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          setError(null);
          setComments(response.data);
        }
      } catch (error) {
        setError(error);
        setComments([]);
      } finally {
        setLoading(false);
      }
    }

    getCommentsByPostId();
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
    <div className={`${styles.viewPostPage} ${styles.page}`}>
      {loading && <h1>Loading...Please wait...</h1>}

      {error && <h1>${error}</h1>}

      {post && (
        <>
          <div className={`${styles.postHeader}`}>
            <h1>{post.title}</h1>
            <div className={styles.viewPostButtons}>
              <Link className={styles.buttonLink} to={`/posts`}>
                Back
              </Link>
            </div>
          </div>
          <h2>By {post.user.username}</h2>
          <section>
            <p>{post.content}</p>
          </section>

          <br />

          <section className={`${styles.comments}`}>
            <div>
              <h2>Comments</h2>
              <div className={`${styles.commentButtons}`}>
                <Link
                  className={styles.buttonLink}
                  to={`/posts/${postId}/comments/new`}
                  state={{ postId: postId }}
                >
                  New
                </Link>
              </div>
            </div>

            <div className={`${styles.commentCards}`}>
              {comments &&
                comments.map((comment) => {
                  return (
                    <div key={comment.id} className={`${styles.commentCard}`}>
                      <h3>{comment.user.username}</h3>
                      <p>{comment.content}</p>

                      <button
                        onClick={() => deleteCommentById(comment.id)}
                        className={`${styles.button}`}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
