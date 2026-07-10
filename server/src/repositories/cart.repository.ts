import { CartModel, ICart } from "../models/cart.model";

export class CartRepository {

  async getCartByUserId(
    userId: string
  ): Promise<ICart | null> {

    return await CartModel.findOne({
      userId,
    }).populate("items.menuId");
  }

  async createCart(
    userId: string
  ): Promise<ICart> {

    const cart =
      new CartModel({
        userId,
        items: [],
      });

    return await cart.save();
  }

  async saveCart(
    cart: ICart
  ): Promise<ICart> {

    return await cart.save();
  }

  async clearCart(
    userId: string
  ): Promise<ICart | null> {

    return await CartModel.findOneAndUpdate(
      { userId },
      { items: [] },
      { new: true }
    );
  }
}