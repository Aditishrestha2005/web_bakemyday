import { CustomizationRepository } from "../repositories/customization.repository";
import { HttpError } from "../errors/http-error";
import { CustomizationType } from "../types/customization.type";

const customizationRepository =
  new CustomizationRepository();

export class CustomizationService {

  async createCustomization(
    data: CustomizationType
  ) {

    return await customizationRepository.createCustomization(
      data
    );
  }

  async getAllCustomizations() {

    return await customizationRepository.getAllCustomizations();
  }

  async getCustomizationById(
    id: string
  ) {

    const customization =
      await customizationRepository.getCustomizationById(
        id
      );

    if (!customization) {
      throw new HttpError(
        404,
        "Customization not found"
      );
    }

    return customization;
  }

  async getCustomizationsByUserId(
    userId: string
  ) {

    return await customizationRepository.getCustomizationsByUserId(
      userId
    );
  }



    async updateCustomization(
    id: string,
    data: any
  ) {

    const existingCustomization =
      await customizationRepository.getCustomizationById(
        id
      );

    if (!existingCustomization) {
      throw new HttpError(
        404,
        "Customization not found"
      );
    }

    return await customizationRepository.updateCustomization(
      id,
      data
    );
  }

  async deleteCustomization(
    id: string
  ) {

    const existingCustomization =
      await customizationRepository.getCustomizationById(
        id
      );

    if (!existingCustomization) {
      throw new HttpError(
        404,
        "Customization not found"
      );
    }

    return await customizationRepository.deleteCustomization(
      id
    );
  }
}