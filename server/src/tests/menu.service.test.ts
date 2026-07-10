import { MenuService } from "../services/menu.service";
import { MenuRepository } from "../repositories/menu.repository";

jest.mock("../repositories/menu.repository");

describe("MenuService", () => {

  let menuService: MenuService;

  beforeEach(() => {

    menuService = new MenuService();

    jest.clearAllMocks();

  });

  it("should return all menu items", async () => {

    const fakeMenus = [
      {
        _id: "1",
        name: "Chocolate Cake",
        description: "Rich chocolate cake",
        price: 1200,
        image: "/uploads/cake.jpg",
        category: "Cake",
        available: true,
      },
    ];

    (
      MenuRepository.prototype.getAllMenus as jest.Mock
    ).mockResolvedValue(fakeMenus);

    const result =
      await menuService.getAllMenus();

    expect(result).toEqual(fakeMenus);

    expect(
      MenuRepository.prototype.getAllMenus
    ).toHaveBeenCalledTimes(1);

  });

});