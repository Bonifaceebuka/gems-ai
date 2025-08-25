import UserModel from "../../models/UserModel";
import { UserResource } from "../resources/UserResource";

export class UserCollection {
  static toJSON(users: UserModel[]) {
    return users.map((user) => UserResource.toJSON(user));
  }
}