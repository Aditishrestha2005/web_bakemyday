import z from "zod";

export const CartItemSchema = z.object({
  menuId: z.string(),
  quantity: z.number().min(1),
});

export const CartSchema = z.object({
  userId: z.string(),

  items: z.array(
    CartItemSchema
  ),
});

export type CartItemType =
  z.infer<typeof CartItemSchema>;

export type CartType =
  z.infer<typeof CartSchema>;