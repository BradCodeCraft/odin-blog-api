import { Router } from "express";
import controllers from "../controllers/index.js";
import middlewares from "../middlewares/index.js";
import passport from "../config/passport.js";

const postsRouter = Router();

postsRouter
  .route("/")
  .get(
    passport.authenticate("jwt", { session: false }),
    controllers.postsController.getAllPosts,
  )
  .post(
    passport.authenticate("jwt", { session: false }),
    middlewares.isAdmin,
    controllers.postsController.createNewPost,
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    middlewares.isAdmin,
    controllers.postsController.deleteAllPosts,
  );

postsRouter
  .route("/:postId")
  .get(
    passport.authenticate("jwt", { session: false }),
    controllers.postsController.getPostById,
  )
  .put(
    passport.authenticate("jwt", { session: false }),
    middlewares.isAdminOrAuthor,
    controllers.postsController.updatePostById,
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    middlewares.isAdminOrAuthor,
    controllers.postsController.deletePostById,
  );

postsRouter
  .route("/:postId/comments")
  .get(
    passport.authenticate("jwt", { session: false }),
    controllers.commentsController.getCommentsByPostId,
  )
  .post(
    passport.authenticate("jwt", { session: false }),
    controllers.commentsController.createCommentByPostId,
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    controllers.commentsController.deleteCommentsByPostId,
  );

postsRouter
  .route("/:postId/comments/:commentId")
  .put(
    passport.authenticate("jwt", { session: false }),
    middlewares.isAdminOrCommenter,
    controllers.commentsController.updateCommentByPostIdAndCommentId,
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    middlewares.isAdminOrCommenter,
    controllers.commentsController.deleteCommentByPostIdAndCommentId,
  );

export default postsRouter;
