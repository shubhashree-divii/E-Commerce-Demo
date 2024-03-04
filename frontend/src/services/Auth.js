import { UAPI } from "./API";
export class Auth {
  async login(data) {
    try {
      return await UAPI.post("/login",data);
    } catch (e) {
      return e;
    }
  }
}