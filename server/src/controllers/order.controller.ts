import { Request, Response } from "express";
import { OrderService } from "../services/order.service";

const orderService =
  new OrderService();

export class OrderController {

  async createOrder(
    req: Request,
    res: Response
  ) {
    try {

      const order =
        await orderService.createOrder(
          req.body
        );

      return res.status(201).json({
        success: true,
        message:
          "Order placed successfully",
        data: order,
      });

    } catch (error: any) {

      return res.status(
        error.statusCode || 500
      ).json({
        success: false,
        message:
          error.message ||
          "Internal Server Error",
      });

    }
  }

  async getAllOrders(
    req: Request,
    res: Response
  ) {
    try {

      const orders =
        await orderService.getAllOrders();

      return res.status(200).json({
        success: true,
        data: orders,
      });

    } catch (error: any) {

      return res.status(
        error.statusCode || 500
      ).json({
        success: false,
        message:
          error.message ||
          "Internal Server Error",
      });

    }
  }

  async getOrderById(
    req: Request,
    res: Response
  ) {
    try {

      const order =
        await orderService.getOrderById(
          String(req.params.id)
        );

      return res.status(200).json({
        success: true,
        data: order,
      });

    } catch (error: any) {

      return res.status(
        error.statusCode || 500
      ).json({
        success: false,
        message:
          error.message ||
          "Internal Server Error",
      });

    }
  }

  async getOrdersByUserId(
    req: Request,
    res: Response
  ) {
    try {

      const orders =
        await orderService.getOrdersByUserId(
          String(req.params.userId)
        );

      return res.status(200).json({
        success: true,
        data: orders,
      });

    } catch (error: any) {

      return res.status(
        error.statusCode || 500
      ).json({
        success: false,
        message:
          error.message ||
          "Internal Server Error",
      });

    }
  }

  async cancelOrder(
    req: Request,
    res: Response
  ) {
    try {

      const order =
        await orderService.cancelOrder(
          String(req.params.id)
        );

      return res.status(200).json({
        success: true,
        message:
          "Order cancelled successfully",
        data: order,
      });

    } catch (error: any) {

      return res.status(
        error.statusCode || 500
      ).json({
        success: false,
        message:
          error.message ||
          "Internal Server Error",
      });

    }
  }
}
