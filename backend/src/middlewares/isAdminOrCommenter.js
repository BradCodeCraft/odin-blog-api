import { request, response } from "express";
import { PrismaClient } from "../../generated/prisma/client.js";

/**
 * @param {request} req
 * @param {response} res
 * @param {() => void} next
 *
 * @returns {Promise<boolean>}
 */
async function isAdminOrCommenter(req, res, next) {
  try {
    const { postId, commentId } = req.params;
    const prisma = new PrismaClient();
    const comment = await prisma.comment.findFirst({
      where: {
        postId: parseInt(postId),
        id: parseInt(commentId),
      },
    });

    if (
      parseInt(comment.userId) === parseInt(req.user.id) ||
      req.user.role === "ADMIN"
    ) {
      return next();
    }

    return res.status(403).send({ message: "Unauthorized" });
  } catch (error) {
    console.error(error);
  }
}

export default isAdminOrCommenter;
