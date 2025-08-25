import CustomerModel from "@/models/CustomerModel";
import { CustomerResource } from "../resources/CustomerResource";

export class CustomerCollection {
  static MessagesToJSON(customers: CustomerModel[]) {
    return customers.map((customer) =>
      CustomerResource.MessagesToJSON(customer)
    );
  }
}