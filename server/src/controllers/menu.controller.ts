import { Request, Response } from "express";
import { MenuService } from "../services/menu.service";
import { MenuSchema } from "../types/menu.type";

const menuService = new MenuService();

export class MenuController {

  async create(req: Request, res: Response) {
    try {

      const image =
        req.file
          ? `/uploads/${req.file.filename}`
          : "";

      const menuData = {
        name: req.body.name,
        description: req.body.description,
        price: Number(req.body.price),
        image,
        category: req.body.category,
        available:
          req.body.available === "true",
      };

      const parsedData =
        MenuSchema.safeParse(menuData);

      if (!parsedData.success) {
        return res.status(400).json({
          success: false,
          errors:
            parsedData.error.flatten(),
        });
      }

      const menu =
        await menuService.createMenu(
          parsedData.data
        );

      return res.status(201).json({
        success: true,
        message:
          "Menu item created successfully",
        data: menu,
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

  async getAll(req: Request, res: Response) {
    try {

      const menus =
        await menuService.getAllMenus();

      return res.status(200).json({
        success: true,
        data: menus,
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

  async getById(req: Request, res: Response) {
    try {

      const id = String(req.params.id);

      const menu =
        await menuService.getMenuById(id);

      return res.status(200).json({
        success: true,
        data: menu,
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

  async update(req: Request, res: Response) {
    try {

      const id = String(req.params.id);

      const updatedMenu =
        await menuService.updateMenu(
          id,
          req.body
        );

      return res.status(200).json({
        success: true,
        message:
          "Menu item updated successfully",
        data: updatedMenu,
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

  async delete(req: Request, res: Response) {
    try {

      const id = String(req.params.id);

      await menuService.deleteMenu(id);

      return res.status(200).json({
        success: true,
        message:
          "Menu item deleted successfully",
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