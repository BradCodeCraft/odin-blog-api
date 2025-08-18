import { request, response } from "express";
import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

/**
 * @param {request} req
 * @param {response} res
 */
async function getAllPosts(req, res) {
  try {
    const posts = await prisma.post.findMany();

    res.json(posts);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
async function createNewPost(req, res) {
  try {
    const { title, content } = req.body;
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        userId: parseInt(req.user.id),
      },
    });

    res.json(post);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
async function deleteAllPosts(req, res) {
  try {
    await prisma.post.deleteMany();

    res.status(204).json({ message: "Posts deleted" });
  } catch (error) {
    console.error(error);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
async function getPostById(req, res) {
  try {
    const { postId } = req.params;
    const post = await prisma.post.findFirst({
      where: {
        id: parseInt(postId),
      },
    });

    res.json(post);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
async function updatePostById(req, res) {
  try {
    const { postId } = req.params;
    const post = await prisma.post.findFirst({
      where: {
        id: parseInt(postId),
      },
    });
    let postToUpdate = post;
    const { title, content } = req.body;

    if (title) {
      postToUpdate = {
        ...postToUpdate,
        title: title,
      };
    }

    if (content) {
      postToUpdate = {
        ...postToUpdate,
        content: content,
      };
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: parseInt(postId),
      },
      data: {
        title: postToUpdate.title,
        content: postToUpdate.content,
      },
    });

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
  }
}

async function deletePostById(req, res) {
  try {
    const { postId } = req.params;
    const post = await prisma.post.delete({
      where: {
        id: parseInt(postId),
      },
    });

    res.json(post);
  } catch (error) {
    console.error(error);
  }
}

export default {
  getAllPosts,
  createNewPost,
  deleteAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
