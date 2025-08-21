import * as styles from "./NavigationBar.module.css";
import { Link, useNavigate } from "react-router-dom";

/**
 * @param {Object} param0
 * @param {{ id: number, username: string, password: string, role: string}} param0.user
 * @param {React.Dispatch<React.SetStateAction<undefined>>} param0.setUser
 */
export default function NavigationBar({ user, setUser }) {
  const navigate = useNavigate();

  async function handleUserLogOut() {
    try {
      if (localStorage) {
        localStorage.clear();
        setUser(null);

        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <nav className={styles.navigationBar}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      {user ? (
        <ul>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <button
              onClick={() => handleUserLogOut()}
              className={`${styles.button}`}
            >
              Logout
            </button>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
