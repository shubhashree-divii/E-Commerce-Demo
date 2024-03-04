import { AAPI } from "./API";
export class Cart {
  async getCart(data) {
    try {
      return await AAPI.get("/cart", data);
    } catch (e) {
      return e;
    }
  }
  async addCart(data) {
    try {
      return await AAPI.post("/cart", data);
    } catch (e) {
      return e;
    }
  }
  async removeFromCart(data) {
    try {
        console.log(data)
      return await AAPI.delete("/cart/"+data.productId);
    } catch (e) {
      return e;
    }
  }
}
