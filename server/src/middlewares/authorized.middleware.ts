import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config";
import { UserRepository } from "../repositories/user.repository";
import { HttpError } from "../errors/http-error";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const userRepository = new UserRepository();

export const authorizedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new HttpError(401, "Unauthorized");
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new HttpError(401, "Invalid token format");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      JWT_SECRET
    ) as any;

    const user = await userRepository.getUserById(
      decoded.id
    );

    if (!user) {
      throw new HttpError(
        404,
        "User not found"
      );
    }

    req.user = user;

    next();

  } catch (error: any) {
    return res.status(
      error.statusCode || 401
    ).json({
      success: false,
      message: error.message || "Unauthorized",
    });
  }
};