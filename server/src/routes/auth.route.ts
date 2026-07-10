import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authorizedMiddleware } from "../middlewares/authorized.middleware";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

const authController = new AuthController();

router.post(
  "/register",
  (req, res) => authController.register(req, res)
);
router.post(
  "/login",
  (req, res) =>
    authController.login(
      req,
      res
    )
);


router.get(
  "/profile",
  authorizedMiddleware,
  (req, res) => authController.getProfile(req, res)
);


router.put(
  "/profile/:id",
  upload.single(
    "profilePicture"
  ),
  (req, res) =>
    authController.updateProfile(
      req,
      res
    )
);
export default router;