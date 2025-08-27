import UserModel from "../../models/UserModel";

export class UserResource {
  static toJSON(user: UserModel) {
    const { first_name, last_name, email, uuid} = user
    return {
      first_name,
      last_name,
      email,
      id: uuid,
    };
  }
}
