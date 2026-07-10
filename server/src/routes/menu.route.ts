import { Router } from "express";

import { MenuController } from "../controllers/menu.controller";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

const menuController =
  new MenuController();

router.post(
  "/",
  upload.single("image"),
  (req, res) =>
    menuController.create(req, res)
);

router.get(
  "/",
  (req, res) =>
    menuController.getAll(req, res)
);

router.get(
  "/:id",
  (req, res) =>
    menuController.getById(req, res)
);

router.put(
  "/:id",
  (req, res) =>
    menuController.update(req, res)
);

router.delete(
  "/:id",
  (req, res) =>
    menuController.delete(req, res)
);

export default router;