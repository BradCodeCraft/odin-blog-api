import { request, response } from "express";
import { PrismaClient } from "../../generated/prisma/client.js";

/**
 * @param {request} req
 * @param {response} res
 * @param {() => void} next
 *
 * @returns {Promise<boolean>}
 */
async function isAuthor(req, res, next) {
  try {
    const { postId } = req.params;
    const prisma = new PrismaClient();
    const post = await prisma.post.findFirst({
      where: {
        id: parseInt(postId),
      },
    });

    if (parseInt(post.userId) === parseInt(req.user.id)) {
      return next();
    }

    return res.status(403).send({ message: "Unauthorized" });
  } catch (error) {
    console.error(error);
  }
}

export default isAuthor;
