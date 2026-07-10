import {
  OrderModel,
  IOrder,
} from "../models/order.model";

export class OrderRepository {

  async createOrder(
    data: any
  ): Promise<IOrder> {

    const order =
      new OrderModel(data);

    return await order.save();
  }

  async getAllOrders(): Promise<IOrder[]> {

    return await OrderModel.find()
      .populate("userId")
     .populate("customizationId")
.populate("items.menuId")
      .sort({
        createdAt: -1,
      });
  }

  async getOrderById(
    id: string
  ): Promise<IOrder | null> {

    return await OrderModel.findById(
      id
    )
      .populate("userId")
     .populate("customizationId")
.populate("items.menuId")
  }

  async getOrdersByUserId(
    userId: string
  ): Promise<IOrder[]> {
return await OrderModel.find({
  userId,
})
.populate("items.menuId")
.populate("customizationId")
.sort({
  createdAt: -1,
});
  }

  async updateOrder(
    id: string,
    data: any
  ): Promise<IOrder | null> {

    return await OrderModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    );
  }

  async saveOrder(
    order: IOrder
  ): Promise<IOrder> {

    return await order.save();
  }
}