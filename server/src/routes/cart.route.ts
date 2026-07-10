import { Router } from "express";
import { CartController } from "../controllers/cart.controller";

const router = Router();

const cartController =
  new CartController();

router.post(
  "/add",
  (req, res) =>
    cartController.addToCart(
      req,
      res
    )
);
router.patch(
  "/decrease",
  (req, res) =>
    cartController.decreaseQuantity(
      req,
      res
    )
);

router.get(
  "/:userId",
  (req, res) =>
    cartController.getCart(
      req,
      res
    )
);

router.delete(
  "/clear/:userId",
  (req, res) =>
    cartController.clearCart(
      req,
      res
    )
);

router.delete(
  "/:userId/:menuId",
  (req, res) =>
    cartController.removeFromCart(
      req,
      res
    )
);

export default router;