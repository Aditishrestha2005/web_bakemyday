import { CartRepository } from "../repositories/cart.repository";
import { MenuRepository } from "../repositories/menu.repository";
import { HttpError } from "../errors/http-error";

const cartRepository =
  new CartRepository();

const menuRepository =
  new MenuRepository();

export class CartService {

  async addToCart(
    userId: string,
    menuId: string
  ) {

    const menu =
      await menuRepository.getMenuById(
        menuId
      );

    if (!menu) {
      throw new HttpError(
        404,
        "Menu item not found"
      );
    }

    let cart =
      await cartRepository.getCartByUserId(
        userId
      );

    if (!cart) {
      cart =
        await cartRepository.createCart(
          userId
        );
    }

    const existingItem =
      cart.items.find(
        (item: any) =>
          item.menuId?._id?.toString() ===
            menuId ||
          item.menuId?.toString() ===
            menuId
      );

    if (existingItem) {

      existingItem.quantity += 1;

    } else {

      cart.items.push({
        menuId: menu._id,
        quantity: 1,
      } as any);

    }

    return await cartRepository.saveCart(
      cart
    );
  }

  async getCart(
    userId: string
  ) {

    let cart =
      await cartRepository.getCartByUserId(
        userId
      );

    if (!cart) {
      cart =
        await cartRepository.createCart(
          userId
        );
    }

    return cart;
  }

  async removeFromCart(
    userId: string,
    menuId: string
  ) {

    const cart =
      await cartRepository.getCartByUserId(
        userId
      );

    if (!cart) {
      throw new HttpError(
        404,
        "Cart not found"
      );
    }

    cart.items =
      cart.items.filter(
        (item: any) =>
          item.menuId?._id?.toString() !==
            menuId &&
          item.menuId?.toString() !==
            menuId
      );

    return await cartRepository.saveCart(
      cart
    );
  }
async decreaseQuantity(
  userId: string,
  menuId: string
) {

  const cart =
    await cartRepository.getCartByUserId(
      userId
    );

  if (!cart) {
    throw new HttpError(
      404,
      "Cart not found"
    );
  }

  const item = cart.items.find(
    (item: any) =>
      item.menuId?._id?.toString() ===
        menuId ||
      item.menuId?.toString() ===
        menuId
  );

  if (!item) {
    throw new HttpError(
      404,
      "Item not found"
    );
  }

  if (item.quantity > 1) {

    item.quantity -= 1;

  } else {

    cart.items =
      cart.items.filter(
        (cartItem: any) =>
          cartItem.menuId?._id?.toString() !==
            menuId &&
          cartItem.menuId?.toString() !==
            menuId
      );

  }

  return await cartRepository.saveCart(
    cart
  );
}
  async clearCart(
    userId: string
  ) {

    return await cartRepository.clearCart(
      userId
    );
  }
}