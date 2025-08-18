import { Router } from "express";
import controllers from "../controllers/index.js";
import passport from "../config/passport.js";

const usersRouter = Router();

usersRouter.route("/").post(controllers.usersController.createNewUser);
usersRouter
  .route("/login")
  .post(
    passport.authenticate("local", { failureRedirect: "/login" }),
    controllers.usersController.grantJwtToAuthenticatedUser,
  );
usersRouter
  .route("/comments")
  .get(
    passport.authenticate("jwt", { session: false }),
    controllers.commentsController.getCommentsByAuthorId,
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    controllers.commentsController.deleteCommentsByAuthorId,
  );
usersRouter
  .route("/comments/:commentId")
  .get(
    passport.authenticate("jwt", { session: false }),
    controllers.commentsController.getCommentByAuthorIdAndCommentId,
  )
  .put(
    passport.authenticate("jwt", { session: false }),
    controllers.commentsController.updateCommentByAuthorIdAndCommentId,
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    controllers.commentsController.deleteCommentByAuthorIdAndCommentId,
  );

export default usersRouter;
