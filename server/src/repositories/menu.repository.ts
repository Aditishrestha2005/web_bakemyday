import { MenuModel, IMenu } from "../models/menu.model";

export interface IMenuRepository {

  createMenu(
    menuData: Partial<IMenu>
  ): Promise<IMenu>;

  getAllMenus(): Promise<IMenu[]>;

  getMenuById(
    id: string
  ): Promise<IMenu | null>;

  updateMenu(
    id: string,
    menuData: Partial<IMenu>
  ): Promise<IMenu | null>;

  deleteMenu(
    id: string
  ): Promise<boolean>;
}

export class MenuRepository
  implements IMenuRepository {

  async createMenu(
    menuData: Partial<IMenu>
  ): Promise<IMenu> {

    const menu =
      new MenuModel(menuData);

    return await menu.save();
  }

  async getAllMenus(): Promise<IMenu[]> {

    return await MenuModel.find().sort({
      createdAt: -1,
    });
  }

  async getMenuById(
    id: string
  ): Promise<IMenu | null> {

    return await MenuModel.findById(id);
  }

  async updateMenu(
    id: string,
    menuData: Partial<IMenu>
  ): Promise<IMenu | null> {

    return await MenuModel.findByIdAndUpdate(
      id,
      menuData,
      {
        new: true,
      }
    );
  }

  async deleteMenu(
    id: string
  ): Promise<boolean> {

    const deletedMenu =
      await MenuModel.findByIdAndDelete(id);

    return deletedMenu
      ? true
      : false;
  }
}