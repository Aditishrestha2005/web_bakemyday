import { Request, Response } from "express";
import { CustomizationService } from "../services/customization.service";

const customizationService =
  new CustomizationService();

export class CustomizationController {

  async createCustomization(
  req: Request,
  res: Response
) {
  try {

    const uploadedFile =
      (req as any).file;

    const data = {
      ...req.body,

      inspoImage:
        uploadedFile
          ? `/uploads/${uploadedFile.filename}`
          : "",
    };

    const customization =
      await customizationService.createCustomization(
        data
      );

    return res.status(201).json({
      success: true,
      message:
        "Customization created successfully",
      data: customization,
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

  async getAllCustomizations(
    req: Request,
    res: Response
  ) {
    try {

      const customizations =
        await customizationService.getAllCustomizations();

      return res.status(200).json({
        success: true,
        data: customizations,
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

  async getCustomizationById(
    req: Request,
    res: Response
  ) {
    try {

      const id = String(
        req.params.id
      );

      const customization =
        await customizationService.getCustomizationById(
          id
        );

      return res.status(200).json({
        success: true,
        data: customization,
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

  async getCustomizationsByUserId(
    req: Request,
    res: Response
  ) {
    try {

      const userId = String(
        req.params.userId
      );

      const customizations =
        await customizationService.getCustomizationsByUserId(
          userId
        );

      return res.status(200).json({
        success: true,
        data: customizations,
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

  async updateCustomization(
    req: Request,
    res: Response
  ) {
    try {

      const id = String(
        req.params.id
      );

      const customization =
        await customizationService.updateCustomization(
          id,
          req.body
        );

      return res.status(200).json({
        success: true,
        message:
          "Customization updated successfully",
        data: customization,
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

  async deleteCustomization(
    req: Request,
    res: Response
  ) {
    try {

      const id = String(
        req.params.id
      );

      await customizationService.deleteCustomization(
        id
      );

      return res.status(200).json({
        success: true,
        message:
          "Customization deleted successfully",
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