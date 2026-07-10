import mongoose, {
  Schema,
  Document,
} from "mongoose";

import {
  CartType,
} from "../types/cart.type";

const CartSchema: Schema =
  new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },

      items: [
        {
          menuId: {
            type: Schema.Types.ObjectId,
            ref: "Menu",
            required: true,
          },

          quantity: {
            type: Number,
            required: true,
            default: 1,
          },
        },
      ],
    },
    {
      timestamps: true,
    }
  );

export interface ICart
  extends Document {

  userId:
    mongoose.Types.ObjectId;

  items: {
    menuId:
      mongoose.Types.ObjectId;

    quantity: number;
  }[];

  createdAt: Date;
  updatedAt: Date;
}

export const CartModel =
  mongoose.model<ICart>(
    "Cart",
    CartSchema
  );