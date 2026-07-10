import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from "../dtos/user.dtos";
import { UserRepository } from "../repositories/user.repository";
import { HttpError } from "../errors/http-error";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config";

const userRepository = new UserRepository();

export class UserService {

  async createUser(data: CreateUserDTO) {

    const existingEmail = await userRepository.getUserByEmail(data.email);

    if (existingEmail) {
      throw new HttpError(409, "Email already exists");
    }

    const existingUsername =
      await userRepository.getUserByUsername(data.username);

    if (existingUsername) {
      throw new HttpError(409, "Username already exists");
    }

    const hashedPassword = await bcryptjs.hash(
      data.password,
      10
    );

    const { confirmPassword, ...userData } = data;

    const newUser = await userRepository.createUser({
      ...userData,
      password: hashedPassword,
    });

    return newUser;
  }

  async loginUser(data: LoginUserDTO) {

    const user = await userRepository.getUserByEmail(data.email);

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    const validPassword = await bcryptjs.compare(
      data.password,
      user.password
    );

    if (!validPassword) {
      throw new HttpError(401, "Invalid credentials");
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    const { password, ...userWithoutPassword } =
      user.toObject();

    return {
      token,
      user: userWithoutPassword,
    };
  }

  async getUserById(userId: string) {

    const user =
      await userRepository.getUserById(userId);

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    return user;
  }

  async updateUser(
    userId: string,
    data: UpdateUserDTO
  ) {

    const user =
      await userRepository.getUserById(userId);

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    const updatedUser =
      await userRepository.updateUser(
        userId,
        data
      );

    return updatedUser;
  }
}