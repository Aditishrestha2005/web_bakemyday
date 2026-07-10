import z from "zod";

export const UserSchema = z.object({
  fullName: z.string().min(2),
  username: z.string().min(3),

  email: z.string().email(),
  phoneNumber: z.string().min(10),

  password: z.string().min(6),

  location: z.string().optional(),

  profilePicture: z.string().optional(),
});

export type UserType = z.infer<typeof UserSchema>;