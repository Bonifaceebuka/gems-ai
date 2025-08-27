import CustomerModel from "@/models/CustomerModel";
import { CustomerResource } from "../resources/CustomerResource";

export class CustomerCollection {
  static toArray(customers: CustomerModel[]) {
    return customers.map((customer) =>
      CustomerResource.toJSON(customer)
    );
  }
}