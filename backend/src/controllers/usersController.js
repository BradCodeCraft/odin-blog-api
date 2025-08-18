import { PrismaClient } from "../../generated/prisma/client.js";
import { request, response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

/**
 * @param {request} req
 * @param {response} res
 */
async function createNewUser(req, res) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT),
    );
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });

    res.json(newUser);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
async function grantJwtToAuthenticatedUser(req, res) {
  try {
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET);

    res.status(200).json({ message: "Authenticated", token: token });
  } catch (error) {
    console.error(error);
  }
}

export default { createNewUser, grantJwtToAuthenticatedUser };
