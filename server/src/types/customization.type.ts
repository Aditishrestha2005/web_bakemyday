import z from "zod";

export const CustomizationSchema =
  z.object({

    userId: z.string(),

    flavor: z.string(),

    size: z.number().min(1),

    shape: z.enum([
      "Circle",
      "Rectangle",
      "Square",
      "Heart",
      "Bento",
      "Tower",
    ]),

    toppings: z.array(
      z.string()
    ),

    message: z.string(),

    inspoImage: z.string(),
    totalPrice: z.number(),

    deliveryDateTime:
      z.string(),
  });

export type CustomizationType =
  z.infer<
    typeof CustomizationSchema
  >;