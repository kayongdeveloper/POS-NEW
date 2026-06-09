import type { Request, Response, NextFunction } from "express";


export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {

    if (!req.user) {
      res.status(401).json({ status: "fail", message: "Tidak ada otorisasi, silakan login terlebih dahulu" });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        status: "fail",
        message: `Akses ditolak, role '${req.user.role}' tidak memiliki izin`
      });
      return;
    }
    next();
  };
};
