import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Posts from "./components/Posts/Posts.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import ViewPost from "./components/ViewPost/ViewPost.jsx";
import NewComment from "./components/NewComment/NewComment.jsx";
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
      { path: "/posts/:postId", element: <ViewPost /> },
      { path: "/posts/:postId/comments/new", element: <NewComment /> },
      { path: "/posts/:postId/comments/:commentId", element: <EditComment /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
