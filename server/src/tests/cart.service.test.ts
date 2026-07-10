import { CartService } from "../services/cart.service";
import { CartRepository } from "../repositories/cart.repository";
import { MenuRepository } from "../repositories/menu.repository";

jest.mock("../repositories/cart.repository");
jest.mock("../repositories/menu.repository");

describe("CartService", () => {

  let cartService: CartService;

  beforeEach(() => {

    cartService = new CartService();

    jest.clearAllMocks();

  });

  it("should create a cart and add an item", async () => {

    const fakeMenu = {
      _id: "menu123",
      name: "Chocolate Cake",
      price: 1200,
    };

    const fakeCart = {
      userId: "user123",
      items: [],
    };

    (
      MenuRepository.prototype.getMenuById as jest.Mock
    ).mockResolvedValue(fakeMenu);

    (
      CartRepository.prototype.getCartByUserId as jest.Mock
    ).mockResolvedValue(null);

    (
      CartRepository.prototype.createCart as jest.Mock
    ).mockResolvedValue(fakeCart);

    (
      CartRepository.prototype.saveCart as jest.Mock
    ).mockImplementation(async (cart) => cart);

    const result = await cartService.addToCart(
      "user123",
      "menu123"
    );

    expect(result.items.length).toBe(1);

    expect(result.items[0].quantity).toBe(1);

    expect(
      MenuRepository.prototype.getMenuById
    ).toHaveBeenCalledTimes(1);

    expect(
      CartRepository.prototype.createCart
    ).toHaveBeenCalledTimes(1);

    expect(
      CartRepository.prototype.saveCart
    ).toHaveBeenCalledTimes(1);

  });

});