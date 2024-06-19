import { Schema, model } from "mongoose";

export const cartsCollectionName = "cart";

export const cartSchema = new Schema({
  products: [
    {
      _id: false,
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      product: {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
    },
  ],
});

export const CartModel = model(cartsCollectionName, cartSchema);
