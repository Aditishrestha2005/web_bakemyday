import z from "zod";

export const OrderSchema =
  z.object({

    userId: z.string(),

    customizationId:
      z.string().optional(),
    items:
  z.array(
    z.object({
      menuId:
        z.string(),

      quantity:
        z.number(),
    })
  ).optional(),

    orderType: z.enum([
      "normal",
      "customized",
    ]),

    fullName: z.string(),

   email: z.string().email(),

    phone: z.string(),

    deliveryLocation:
      z.string(),

    totalAmount:
      z.number(),

    paymentMethod:
      z.literal("COD"),

    status: z.enum([
      "placed",
      "cancelled",
    ]),
  });

export type OrderType =
  z.infer<
    typeof OrderSchema
  >;