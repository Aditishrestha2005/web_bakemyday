import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface ICustomization
  extends Document {

  userId:
    mongoose.Types.ObjectId;
    

  flavor: string;

  size: number;

  shape: string;

  toppings: string[];

  message: string;

  inspoImage: string;
  totalPrice: number;

  deliveryDateTime: Date;

  createdAt: Date;
  updatedAt: Date;
}

const CustomizationSchema =
  new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      flavor: {
        type: String,
        required: true,
      },

      size: {
        type: Number,
        required: true,
      },

      shape: {
        type: String,
        required: true,
      },

      toppings: [
        {
          type: String,
        },
      ],

      message: {
        type: String,
        default: "",
      },

      inspoImage: {
        type: String,
        default: "",
      },

      totalPrice: {
  type: Number,
  required: true,
},

      deliveryDateTime: {
        type: Date,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

export const CustomizationModel =
  mongoose.model<ICustomization>(
    "Customization",
    CustomizationSchema
  );