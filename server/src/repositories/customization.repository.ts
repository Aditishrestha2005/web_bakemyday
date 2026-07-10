import {
  CustomizationModel,
  ICustomization,
} from "../models/customization.model";

export class CustomizationRepository {

  async createCustomization(
    data: any
  ): Promise<ICustomization> {

    const customization =
      new CustomizationModel(data);

    return await customization.save();
  }

  async getAllCustomizations(): Promise<ICustomization[]> {

    return await CustomizationModel.find()
      .populate("userId")
      .sort({
        createdAt: -1,
      });
  }

  async getCustomizationById(
    id: string
  ): Promise<ICustomization | null> {

    return await CustomizationModel.findById(
      id
    ).populate("userId");
  }

  async getCustomizationsByUserId(
    userId: string
  ): Promise<ICustomization[]> {

    return await CustomizationModel.find({
      userId,
    }).sort({
      createdAt: -1,
    });
  }

  async updateCustomization(
    id: string,
    data: any
  ): Promise<ICustomization | null> {

    return await CustomizationModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    );
  }

  async deleteCustomization(
    id: string
  ): Promise<boolean> {

    const customization =
      await CustomizationModel.findByIdAndDelete(
        id
      );

    return customization
      ? true
      : false;
  }
}