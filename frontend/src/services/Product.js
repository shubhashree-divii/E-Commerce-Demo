import { UAPI, AAPI } from "./API";
export class Product {
  async getProducts() {
    try {
      return await UAPI.get("/products");
    } catch (e) {
      return e;
    }
  }
  async addProducts(data) {
    console.log(data)
    try {
      return await AAPI.post("/products", data);
    } catch (e) {
      return e;
    }
  }
  async editProducts(data) {
    try {
      return await AAPI.post(`/products/${data.id}`,data.payload);
    } catch (e) {
      return e;
    }
  }
  async deleteProduct(id) {
    try {
      return await AAPI.delete(`/products/${id}`);
    } catch (e) {
      return e;
    }
  }
}
