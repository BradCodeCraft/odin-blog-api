import { Link } from "react-router-dom";
import * as styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={`${styles.homePage} ${styles.page}`}>
      <h1>
        Welcome to <em>Blog API</em>
      </h1>

      <section className={styles.introduction}>
        <p>
          This is the Admin Front End implementation part of the Full Stack
          project. For more information, please visit{" "}
          <a
            href="https://github.com/BradCodeCraft/odin-blog-api"
            target="_blank"
            rel="noreferrer noopener"
          >
            Github repository
          </a>{" "}
          (opens in new tab).
        </p>
      </section>

      <section className={styles.copyright}>
        <p> Copyright (c) 2025 BradCodeCraft. All Rights Reserved.</p>
      </section>

      <Link className={styles.buttonLink} to="/posts">
        Proceed
      </Link>
    </div>
  );
}
