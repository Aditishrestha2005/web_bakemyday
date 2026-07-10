import { UserService } from "../services/user.service";
import { UserRepository } from "../repositories/user.repository";
import bcryptjs from "bcryptjs";

jest.mock("../repositories/user.repository");
jest.mock("bcryptjs");

describe("UserService", () => {

  let userService: UserService;

  beforeEach(() => {

    userService = new UserService();

    jest.clearAllMocks();

  });

  it("should create a new user", async () => {

    const fakeUser = {
      _id: "1",
      fullName: "John Doe",
      username: "john",
      email: "john@test.com",
      password: "123456",
      confirmPassword: "123456",
    };

    (
      UserRepository.prototype.getUserByEmail as jest.Mock
    ).mockResolvedValue(null);

    (
      UserRepository.prototype.getUserByUsername as jest.Mock
    ).mockResolvedValue(null);

    (
      bcryptjs.hash as jest.Mock
    ).mockResolvedValue("hashedpassword");

    (
      UserRepository.prototype.createUser as jest.Mock
    ).mockResolvedValue({
      ...fakeUser,
      password: "hashedpassword",
    });

    const result =
      await userService.createUser(
        fakeUser as any
      );

    expect(result.email).toBe(
      "john@test.com"
    );

    expect(
      UserRepository.prototype.createUser
    ).toHaveBeenCalledTimes(1);

  });

});