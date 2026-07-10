import { MenuRepository } from "../repositories/menu.repository";
import { HttpError } from "../errors/http-error";
import { MenuType } from "../types/menu.type";

const menuRepository = new MenuRepository();

export class MenuService {

  async createMenu(data: MenuType) {

    const menu =
      await menuRepository.createMenu(data);

    return menu;
  }

  async getAllMenus() {

    return await menuRepository.getAllMenus();
  }

  async getMenuById(id: string) {

    const menu =
      await menuRepository.getMenuById(id);

    if (!menu) {
      throw new HttpError(
        404,
        "Menu item not found"
      );
    }

    return menu;
  }

  async updateMenu(
    id: string,
    data: Partial<MenuType>
  ) {

    const existingMenu =
      await menuRepository.getMenuById(id);

    if (!existingMenu) {
      throw new HttpError(
        404,
        "Menu item not found"
      );
    }

    const updatedMenu =
      await menuRepository.updateMenu(
        id,
        data
      );

    return updatedMenu;
  }

  async deleteMenu(id: string) {

    const existingMenu =
      await menuRepository.getMenuById(id);

    if (!existingMenu) {
      throw new HttpError(
        404,
        "Menu item not found"
      );
    }

    const deleted =
      await menuRepository.deleteMenu(id);

    return deleted;
  }
}