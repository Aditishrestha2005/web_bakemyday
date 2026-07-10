import mongoose, { Schema, Document } from "mongoose";
import { MenuType } from "../types/menu.type";

const MenuSchema: Schema = new Schema<MenuType>(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Brownie",
        "Cakes",
        "Pastry",
        "Croissant",
        "Cookies",
      ],
      required: true,
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export interface IMenu
  extends MenuType,
    Document {
  _id: mongoose.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

export const MenuModel =
  mongoose.model<IMenu>(
    "Menu",
    MenuSchema
  );