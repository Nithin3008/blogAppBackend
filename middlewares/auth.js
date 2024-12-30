import pkg from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { verify } = pkg;
const jwtSecret = process.env.JWT_SECRET;

export function authMiddleWare(req, res, next) {
  const headers = req.headers.authorization;
  if (headers) {
    const check = verify(headers, jwtSecret);
    console.log(check);
    res.locals.userId = check?.id;
    next();
  }
}
