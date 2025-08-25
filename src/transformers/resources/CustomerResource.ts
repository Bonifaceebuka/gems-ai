import CustomerModel from '@models/CustomerModel';
export class CustomerResource {
  static MessagesToJSON(customer: CustomerModel) {
    const { email, created_at } = customer;
    return {
      email,
      full_name: "Guest",
      is_registered: false,
      joined: created_at,
    };
  }
}
