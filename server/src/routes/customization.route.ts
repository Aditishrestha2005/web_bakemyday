import { Router } from "express";
import { CustomizationController } from "../controllers/customization.controller";
import { upload }
from "../middlewares/upload.middleware";
const router = Router();

const customizationController =
  new CustomizationController();



router.get(
  "/",
  (req, res) =>
    customizationController.getAllCustomizations(
      req,
      res
    )
);

router.get(
  "/user/:userId",
  (req, res) =>
    customizationController.getCustomizationsByUserId(
      req,
      res
    )
);

router.get(
  "/:id",
  (req, res) =>
    customizationController.getCustomizationById(
      req,
      res
    )
);

router.put(
  "/:id",
  (req, res) =>
    customizationController.updateCustomization(
      req,
      res
    )
);

router.delete(
  "/:id",
  (req, res) =>
    customizationController.deleteCustomization(
      req,
      res
    )
);
router.post(
  "/",
  upload.single(
    "inspoImage"
  ),
  (req, res) =>
    customizationController.createCustomization(
      req,
      res
    )
);

export default router;