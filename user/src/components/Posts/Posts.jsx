import axios from "axios";
import * as styles from "./Posts.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Posts() {
  const { user, token } = useOutletContext();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    async function getAllPosts() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/posts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          setPosts(response.data);
        }
      } catch (error) {
        setError(error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    getAllPosts();
  }, []);

  return (
    <div className={`${styles.postsPage} ${styles.page}`}>
      {loading && <h1>Loading...Please wait...</h1>}

      {error && <h1>${error}</h1>}

      <header>
        <h1>Posts</h1>
      </header>

      <main>
        {posts && (
          <section className={`${styles.postCards}`}>
            {posts.map((post) => {
              return (
                <Link
                  className={`${styles.postCard}`}
                  to={`/posts/${post.id}`}
                  key={post.id}
                >
                  <h2>{post.title}</h2>
                </Link>
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
}
