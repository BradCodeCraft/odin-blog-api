import * as styles from "./SignUp.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, token } = useOutletContext();
  const navigate = useNavigate();

  /**
   * @param {Event} e
   */
  async function handleFormSubmission(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/users`,
        {
          username: username.toLowerCase(),
          password: password,
          role: "USER",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        setError(null);
        navigate("/login");
      }
    } catch (error) {
      setError("Error encountered! Please try again!");
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/posts");
    }
  }, []);

  return (
    <div className={`${styles.signUpPage} ${styles.page}`}>
      <h1>Sign Up</h1>

      <form
        onSubmit={(e) => handleFormSubmission(e)}
        className={`${styles.signUpForm} ${styles.form}`}
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
