import { request, response } from "express";

/**
 * @param {request} req
 * @param {response} res
 * @param {() => void} next
 *
 * @returns {Promise<boolean>}
 */
async function isAdmin(req, res, next) {
  try {
    if (req.user.role === "ADMIN") {
      return next();
    }

    return res.status(403).json({ message: "Unauthorized" });
  } catch (error) {
    console.error(error);
  }
}

export default isAdmin;
