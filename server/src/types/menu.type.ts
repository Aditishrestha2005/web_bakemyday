import z from "zod";

export const MenuSchema = z.object({
  name: z.string().min(2),

  description: z.string().min(5),

  price: z.number().positive(),

  image: z.string(),

  category: z.enum([
    "Brownie",
    "Cakes",
    "Pastry",
    "Croissant",
    "Cookies",
  ]),

  available: z.boolean().default(true),
});

export type MenuType = z.infer<typeof MenuSchema>;