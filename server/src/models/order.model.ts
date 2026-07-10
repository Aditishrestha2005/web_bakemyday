import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IOrder
  extends Document {

  userId:
    mongoose.Types.ObjectId;

  customizationId?:
    mongoose.Types.ObjectId;
items?: {
  menuId:
    mongoose.Types.ObjectId;

  quantity:
    number;
}[];
  orderType:
    "normal" |
    "customized";

  fullName: string;

  email: string;

  phone: string;

  deliveryLocation:
    string;

  totalAmount: number;

  paymentMethod:
    "COD";

  status:
    "placed" |
    "cancelled";

  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema =
  new Schema(
    {
      userId: {
        type:
          Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      customizationId: {
        type:
          Schema.Types.ObjectId,
        ref: "Customization",
      },
      items: [
  {
    menuId: {
      type:
        Schema.Types.ObjectId,
      ref: "Menu",
    },

    quantity: {
      type: Number,
      default: 1,
    },
  },
],

      orderType: {
        type: String,
        enum: [
          "normal",
          "customized",
        ],
        required: true,
      },

      fullName: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      deliveryLocation: {
        type: String,
        required: true,
      },

      totalAmount: {
        type: Number,
        required: true,
      },

      paymentMethod: {
        type: String,
        default: "COD",
      },

      status: {
        type: String,
        enum: [
          "placed",
          "cancelled",
        ],
        default: "placed",
      },
    },
    {
      timestamps: true,
    }
  );

export const OrderModel =
  mongoose.model<IOrder>(
    "Order",
    OrderSchema
  );