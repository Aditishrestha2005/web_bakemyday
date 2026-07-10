import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import {
  CreateUserDTO,
  LoginUserDTO,
} from "../dtos/user.dtos";



const userService = new UserService();
interface MulterRequest
  extends Request {

  file?: Express.Multer.File;

}

export class AuthController {

  async register(
    req: Request,
    res: Response
  ) {
    try {

      const parsedData =
        CreateUserDTO.safeParse(
          req.body
        );

      if (!parsedData.success) {
        return res.status(400).json({
          success: false,
          errors:
            parsedData.error.flatten(),
        });
      }

      const user =
        await userService.createUser(
          parsedData.data
        );



      return res.status(201).json({
        success: true,
        message:
          "User registered successfully",
        data: user,
      });

    } catch (error: any) {

      return res.status(
        error.statusCode || 500
      ).json({
        success: false,
        message:
          error.message ||
          "Internal Server Error",
      });

    }
  }

  async login(
    req: Request,
    res: Response
  ) {
    try {
      console.log("LOGIN METHOD CALLED ");

      const parsedData =
        LoginUserDTO.safeParse(
          req.body
        );

      if (!parsedData.success) {
        return res.status(400).json({
          success: false,
          errors:
            parsedData.error.flatten(),
        });
      }

      const result =
        await userService.loginUser(
          parsedData.data
        );

        console.log(
  " NEW LOGIN CONTROLLER RUNNING "
);

      res.cookie(
        "token",
        result.token,
        {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge:
            30 *
            24 *
            60 *
            60 *
            1000,
        }
      );

      return res.status(200).json({
        success: true,
        message:
          "Login successful",
        data: result.user,
      });

    } catch (error: any) {

      return res.status(
        error.statusCode || 500
      ).json({
        success: false,
        message:
          error.message ||
          "Internal Server Error",
      });

    }
  }

  async getProfile(
    req: Request,
    res: Response
  ) {
    try {

      const userId =
        req.user?._id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message:
            "Unauthorized",
        });
      }

      const user =
        await userService.getUserById(
          userId.toString()
        );

      return res.status(200).json({
        success: true,
        data: user,
      });

    } catch (error: any) {

      return res.status(
        error.statusCode || 500
      ).json({
        success: false,
        message:
          error.message ||
          "Internal Server Error",
      });
    }
  }
async updateProfile(
  req: MulterRequest,
  res: Response
) {
  try {

    const updateData: any = {
      ...req.body,
    };

    if (req.file) {
      updateData.profilePicture =
        `/uploads/${req.file.filename}`;
    }

    const user =
      await userService.updateUser(
        String(req.params.id),
        updateData
      );

    return res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",
      data: user,
    });

  } catch (error: any) {

    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message:
        error.message ||
        "Internal Server Error",
    });

  }
}
}