import { Router } from "express";
import { OrderController } from "../controllers/order.controller";

const router = Router();

const orderController =
  new OrderController();

router.post(
  "/",
  (req, res) =>
    orderController.createOrder(
      req,
      res
    )
);

router.get(
  "/",
  (req, res) =>
    orderController.getAllOrders(
      req,
      res
    )
);

router.get(
  "/user/:userId",
  (req, res) =>
    orderController.getOrdersByUserId(
      req,
      res
    )
);

router.get(
  "/:id",
  (req, res) =>
    orderController.getOrderById(
      req,
      res
    )
);

router.put(
  "/cancel/:id",
  (req, res) =>
    orderController.cancelOrder(
      req,
      res
    )
);

export default router;