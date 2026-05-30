import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  userId: number;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) {
    res.status(401).json({ status: "fail", message: "Akses ditolak, token tidak ditemukan" });
    return;
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "", (err, decoded) => {
    if (err) {
      res.status(403).json({ status: "fail", message: "Token tidak valid atau telah kedaluwarsa" });
      return;
    }

    req.user = decoded as UserPayload;
    next();
  });
};
