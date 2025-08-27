import CustomerModel from '@models/CustomerModel';
export class CustomerResource {
  static toJSON(customer: CustomerModel) {
    const { email, created_at, customer_name, customer_phone } = customer;
    return {
      email,
      customer_phone,
      customer_name,
      joined: created_at,
    };
  }
}
