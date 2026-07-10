import { OrderService } from "../services/order.service";
import { OrderRepository } from "../repositories/order.repository";

jest.mock("../repositories/order.repository");

describe("OrderService", () => {

  let orderService: OrderService;

  beforeEach(() => {

    orderService = new OrderService();

    jest.clearAllMocks();

  });

  it("should create an order", async () => {

    const fakeOrder = {
      _id: "1",
      userId: "123",
      orderType: "normal",
      items: [],
      totalAmount: 1500,
      status: "placed",
    };

    (
      OrderRepository.prototype.createOrder as jest.Mock
    ).mockResolvedValue(fakeOrder);

    const result =
      await orderService.createOrder(fakeOrder as any);

    expect(result).toEqual(fakeOrder);

    expect(
      OrderRepository.prototype.createOrder
    ).toHaveBeenCalledTimes(1);

  });

});