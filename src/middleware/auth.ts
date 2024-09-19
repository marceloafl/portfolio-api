import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWTSecret } from "../config/app.js";

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
  if (!JWTSecret) {
    return res.status(401).send({ error: "JWTSecret error" });
  }

  jwt.verify(token, JWTSecret, (err: any, user: any) => {
    if (err) {
      return res.status(401).send({ error: "Invalid token" });
    }

    req.user = user;
    return next();
  });
};
