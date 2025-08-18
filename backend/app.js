import express from "express";
import routers from "./src/routers/index.js";
import session from "express-session";
import cors from "cors";
import passport from "./src/config/passport.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.session());
app.use(cors());

app.use("/users", routers.usersRouter);
app.use("/posts", routers.postsRouter);
app.use((err, req, res, next) => {
  res.status(404).json({ error: err.message });
});

app.listen(process.env.PORT, () =>
  console.log(`Local server started at http://localhost:${process.env.PORT}`),
);
