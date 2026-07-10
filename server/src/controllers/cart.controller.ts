import { Request, Response } from "express";
import { CartService } from "../services/cart.service";

const cartService = new CartService();

export class CartController {

  async addToCart(
    req: Request,
    res: Response
  ) {
    try {

      const { userId, menuId } =
        req.body;

      const cart =
        await cartService.addToCart(
          userId,
          menuId
        );

      return res.status(200).json({
        success: true,
        message:
          "Item added to cart",
        data: cart,
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

  async getCart(
    req: Request,
    res: Response
  ) {
    try {

      const userId =
        String(req.params.userId);

      const cart =
        await cartService.getCart(
          userId
        );

      return res.status(200).json({
        success: true,
        data: cart,
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

  async removeFromCart(
    req: Request,
    res: Response
  ) {
    try {

      const userId =
        String(req.params.userId);

      const menuId =
        String(req.params.menuId);

      const cart =
        await cartService.removeFromCart(
          userId,
          menuId
        );

      return res.status(200).json({
        success: true,
        message:
          "Item removed from cart",
        data: cart,
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
  async decreaseQuantity(
  req: Request,
  res: Response
) {
  try {

    const { userId, menuId } =
      req.body;

    const cart =
      await cartService.decreaseQuantity(
        userId,
        menuId
      );

    return res.status(200).json({
      success: true,
      data: cart,
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

  async clearCart(
    req: Request,
    res: Response
  ) {
    try {

      const userId =
        String(req.params.userId);

      const cart =
        await cartService.clearCart(
          userId
        );

      return res.status(200).json({
        success: true,
        message:
          "Cart cleared",
        data: cart,
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