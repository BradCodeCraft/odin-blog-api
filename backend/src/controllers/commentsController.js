import { request, response } from "express";
import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

/**
 * @param {request} req
 * @param {response} res
 */
async function getAllComments(req, res) {
  try {
    const comments = await prisma.comment.findMany({
      include: { user: true },
    });

    res.json(comments);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
async function getCommentById(req, res) {
  try {
    const { commentId } = req.params;
    const comment = await prisma.comment.findFirst({
      where: {
        id: parseInt(commentId),
      },
    });

    res.json(comment);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
async function updateCommentById(req, res) {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const comment = await prisma.comment.update({
      where: {
        id: parseInt(commentId),
      },
      data: {
        content: content,
      },
    });

    res.json(comment);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
async function deleteCommentById(req, res) {
  try {
    const { commentId } = req.params;
    const comment = await prisma.comment.delete({
      where: {
        id: parseInt(commentId),
      },
    });

    res.status(204);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
async function getCommentsByAuthorId(req, res) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        userId: parseInt(req.user.id),
      },
    });

    res.json(comments);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
async function deleteCommentsByAuthorId(req, res) {
  try {
    await prisma.comment.deleteMany({
      where: {
        userId: parseInt(req.user.id),
      },
    });

    res.status(204);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
async function getCommentByAuthorIdAndCommentId(req, res) {
  try {
    const { commentId } = req.params;
    const comment = await prisma.comment.findFirst({
      where: {
        id: parseInt(commentId),
        userId: parseInt(req.user.id),
      },
    });

    res.json(comment);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
async function updateCommentByAuthorIdAndCommentId(req, res) {
  try {
    const { commentId } = req.params;
    const comment = await prisma.comment.findFirst({
      where: {
        id: parseInt(commentId),
        userId: parseInt(req.user.id),
      },
    });

    if (!comment) {
      res.status(404).json({ message: "Comment Not Found" });
    }

    const { content } = req.body;

    if (content) {
      const updatedComment = await prisma.comment.update({
        where: {
          id: parseInt(commentId),
        },
        data: {
          content: content,
        },
      });

      res.json(updatedComment);
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
async function deleteCommentByAuthorIdAndCommentId(req, res) {
  try {
    const { commentId } = req.params;
    await prisma.comment.delete({
      where: {
        id: parseInt(commentId),
        userId: parseInt(req.user.id),
      },
    });
  } catch (error) {
    console.error(error);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
async function getCommentsByPostId(req, res) {
  try {
    const { postId } = req.params;
    const comments = await prisma.comment.findMany({
      where: {
        postId: parseInt(postId),
      },
      include: {
        user: true,
      },
    });

    res.json(comments);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
async function createCommentByPostId(req, res) {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    if (content) {
      const newComment = await prisma.comment.create({
        data: {
          content: content,
          postId: parseInt(postId),
          userId: parseInt(req.user.id),
        },
      });

      res.json(newComment);
    } else {
      res.status(400).json({ message: "Invalid request" });
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
async function deleteCommentsByPostId(req, res) {
  try {
    const { postId } = req.params;
    await prisma.comment.deleteMany({
      where: {
        postId: parseInt(postId),
      },
    });

    res.status(204);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
async function updateCommentByPostIdAndCommentId(req, res) {
  try {
    const { postId, commentId } = req.params;
    const comment = await prisma.comment.findFirst({
      where: {
        id: parseInt(commentId),
        postId: parseInt(postId),
      },
    });

    if (!comment) {
      res.status(404).json({ message: "Comment Not Found" });
    }

    const { content } = req.body;

    if (content) {
      const updatedComment = await prisma.comment.update({
        where: {
          id: parseInt(commentId),
          postId: parseInt(postId),
        },
        data: {
          content: content,
        },
      });

      res.json(updatedComment);
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
async function deleteCommentByPostIdAndCommentId(req, res) {
  try {
    const { postId, commentId } = req.params;
    await prisma.comment.delete({
      where: {
        id: parseInt(commentId),
        postId: parseInt(postId),
      },
    });

    res.status(204);
  } catch (error) {
    console.error(error);
  }
}

export default {
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
  getCommentsByAuthorId,
  deleteCommentsByAuthorId,
  getCommentByAuthorIdAndCommentId,
  updateCommentByAuthorIdAndCommentId,
  deleteCommentByAuthorIdAndCommentId,
  getCommentsByPostId,
  createCommentByPostId,
  deleteCommentsByPostId,
  updateCommentByPostIdAndCommentId,
  deleteCommentByPostIdAndCommentId,
};
