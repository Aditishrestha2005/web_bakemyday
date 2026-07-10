import express, {
  Application,
  Request,
  Response,
  NextFunction,
} from "express";

import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route";
import menuRoutes from "./routes/menu.route";
import cartRoutes from "./routes/cart.route";
import customizationRoutes from "./routes/customization.route";
import orderRoutes from "./routes/order.route";
import { HttpError } from "./errors/http-error";

const app: Application = express();

/**
 * Middlewares
 */
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());

/**
 * Static Files
 */
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "../uploads")
  )
);

/**
 * Routes
 */
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/menu",
  menuRoutes
);

app.use(
  "/api/cart",
  cartRoutes
);

app.use(
  "/api/customization",
  customizationRoutes
);
app.use(
  "/api/order",
  orderRoutes
);

/**
 * Root Route
 */
app.get(
  "/",
  (req: Request, res: Response) => {
    return res.status(200).json({
      success: true,
      message:
        "Welcome to BakeMyDay API 🍰",
    });
  }
);

/**
 * 404 Handler
 */
app.use(
  (
    req: Request,
    res: Response
  ) => {
    return res.status(404).json({
      success: false,
      message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
  }
);

/**
 * Global Error Handler
 */
app.use(
  (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    if (err instanceof HttpError) {
      return res.status(
        err.statusCode
      ).json({
        success: false,
        message: err.message,
      });
    }

    return res.status(500).json({
      success: false,
      message:
        err.message ||
        "Internal Server Error",
    });
  }
);

export default app;