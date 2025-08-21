import * as styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser, setToken } = useOutletContext();
  const navigate = useNavigate();

  /**
   * @param {Event} e
   */
  async function handleFormSubmission(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/users/login`,
        {
          username: username.toLowerCase(),
          password: password,
        },
      );

      if (response.status === 200) {
        const data = await response.data;
        setError(null);
        if (data.user.role === "USER") {
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/posts");
        } else {
          setError("User is an Admin! Please go to the Admin portal");
        }
      }
    } catch (error) {
      console.error(error);
      setError("Error encountered! Please try again!");
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/posts");
    }
  }, []);

  return (
    <div className={`${styles.loginPage} ${styles.page}`}>
      <h1>Login</h1>

      <form
        onSubmit={(e) => handleFormSubmission(e)}
        className={`${styles.loginForm} ${styles.form}`}
      >
        {error && (
          <div className={styles.error}>
            <h2>Error Encountered</h2>

            <p>{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
