export const MESSAGES = {
    COMMON:{
        "INTERNAL_SERVER_ERROR": "Something went wrong",
        "EMAIL_EXISTS": "Email is already registered",
        "UNATHORIZED_ACCESS": 'Unauthorized request!'
    }
}

export const dynamic_messages = {
    FETCHED_SUCCESSFULLY: (item_fetched: string) => `${item_fetched} fetched successfully`,
    NOT_FOUND: (item: string) => `${item} not found`,
    PASSWWORD_RESET_SENT: (email: string) => `Password reset email has been sent ${email}`,
    CONNECTION_FAILED: (item: string) => `${item} connection failed`,
    ALREADY_EXISTS: (item: string) => `${item} already exists`,
    CONNECTION_SUCCESSFUL: (item: string) => `${item} connection was successful`,
}

export const CUSTOMER_MESSAGES = {
  ACCOUNT: {
    NOT_FOUND: "Customer account was not found!",
    INVALID_CREDENTIALS: "Invalid email or password",
    INVALID_ACCOUNT:
      "Customer account not validated. Please check your email for further instructions",
    INACTIVE_ACCOUNT: "Customer account is inactive. Please contact support",
    DISABLED_ACCOUNT: "Customer account is disabled. Please contact support",
    CUSTOMER_ACCOUNT_FETCHED: "Customer account info was fetched!",
  },
  AUTH: {
    LOGIN: {
      INVALID_LOGIN: "Invalid login credentials",
      JWT_GENERATED: "User JWT was generated",
      LOGIN_SUCCESSFUL: "Login was successful",
    },
    REGISTRATION: {
      SUCCESSFUL: "User registration was successful",
    },
    UNAUTHORIZED_ACCESS: "Unauthorized access",
  },
};