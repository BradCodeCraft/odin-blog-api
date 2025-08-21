import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./Layout.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Posts from "./components/Posts/Posts.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import NewPost from "./components/NewPost/NewPost.jsx";
import ViewPost from "./components/ViewPost/ViewPost.jsx";
import EditPost from "./components/EditPost/EditPost.jsx";
import NewComment from "./components/NewComment/NewComment.jsx";
import Comments from "./components/Comments/Comments.jsx";
import EditComment from "./components/EditComment/EditComment.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/posts", element: <Posts /> },
      { path: "/posts/new", element: <NewPost /> },
      { path: "/posts/:postId", element: <ViewPost /> },
      { path: "/posts/:postId/edit", element: <EditPost /> },
      { path: "/posts/:postId/comments/new", element: <NewComment /> },
      { path: "/comments", element: <Comments /> },
      { path: "/comments/:commentId", element: <EditComment /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
