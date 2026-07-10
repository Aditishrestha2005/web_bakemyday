import { CustomizationService } from "../services/customization.service";
import { CustomizationRepository } from "../repositories/customization.repository";

jest.mock("../repositories/customization.repository");

describe("CustomizationService", () => {

  let customizationService: CustomizationService;

  beforeEach(() => {

    customizationService = new CustomizationService();

    jest.clearAllMocks();

  });

  it("should create a customized cake", async () => {

    const fakeCustomization = {
      _id: "custom123",
      userId: "user123",
      flavor: "Chocolate",
      size: "2 Pound",
      shape: "Round",
      toppings: ["Sprinkles"],
      totalPrice: 2500,
    };

    (
      CustomizationRepository.prototype.createCustomization as jest.Mock
    ).mockResolvedValue(fakeCustomization);

    const result =
      await customizationService.createCustomization(
        fakeCustomization as any
      );

    expect(result).toEqual(fakeCustomization);

    expect(
      CustomizationRepository.prototype.createCustomization
    ).toHaveBeenCalledTimes(1);

  });

});