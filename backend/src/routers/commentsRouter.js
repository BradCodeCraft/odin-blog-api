import { Router } from "express";
import controllers from "../controllers/index.js";
import middlewares from "../middlewares/index.js";
import passport from "../config/passport.js";

const commentsRouter = Router();

commentsRouter.route("/").get(controllers.commentsController.getAllComments);

commentsRouter
  .route("/:commentId")
  .get(
    passport.authenticate("jwt"),
    middlewares.isAdminOrCommenter,
    controllers.commentsController.getCommentById,
  )
  .put(
    passport.authenticate("jwt"),
    middlewares.isAdminOrCommenter,
    controllers.commentsController.updateCommentById,
  )
  .delete(
    passport.authenticate("jwt"),
    middlewares.isAdminOrCommenter,
    controllers.commentsController.deleteCommentById,
  );

export default commentsRouter;
