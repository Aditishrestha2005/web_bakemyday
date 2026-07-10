import { OrderRepository } from "../repositories/order.repository";
import { HttpError } from "../errors/http-error";
import { OrderType } from "../types/order.type";


const orderRepository =
  new OrderRepository();



export class OrderService {

async createOrder(
  data: OrderType
) {

  return await orderRepository.createOrder(
    data
  );
}

  async getAllOrders() {

    return await orderRepository.getAllOrders();
  }

  async getOrderById(
    id: string
  ) {

    const order =
      await orderRepository.getOrderById(
        id
      );

    if (!order) {
      throw new HttpError(
        404,
        "Order not found"
      );
    }

    return order;
  }

  async getOrdersByUserId(
    userId: string
  ) {

    return await orderRepository.getOrdersByUserId(
      userId
    );
  }

  async cancelOrder(
    id: string
  ) {

    const order =
      await orderRepository.getOrderById(
        id
      );

    if (!order) {
      throw new HttpError(
        404,
        "Order not found"
      );
    }

    if (
      order.status ===
      "cancelled"
    ) {
      throw new HttpError(
        400,
        "Order already cancelled"
      );
    }

    const orderTime =
      new Date(
        order.createdAt
      );

    const currentTime =
      new Date();

    const diffInMinutes =
      (
        currentTime.getTime() -
        orderTime.getTime()
      ) /
      (1000 * 60);

    if (
      diffInMinutes > 5
    ) {
      throw new HttpError(
        400,
        "Order can only be cancelled within 5 minutes of placing it."
      );
    }

    order.status =
      "cancelled";

    return await orderRepository.saveOrder(
      order
    );
  }
}