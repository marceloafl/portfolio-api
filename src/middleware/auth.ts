import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import JWT_SECRET from "../config/auth.json";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: "No token provided" });
  }
  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    return res.status(401).send({ error: "Token error" });
  }
  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: "Token malformatted" });
  }

  jwt.verify(token, JWT_SECRET.secret, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(401).send({ error: "Invalid token" });
    }

    req.user = user;
    return next();
  });
};
