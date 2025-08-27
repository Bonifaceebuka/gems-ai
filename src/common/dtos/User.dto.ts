import { Example } from 'tsoa';
import { IsString, IsStrongPassword } from "class-validator";

export class authUserDto {
    @IsString({ 
        message: "Email is required",
    })
    @Example("a.falaye@gems-consult.com")
    email!: string;

    @IsString({ 
        message: "Name is required",
    })
    @Example("Ayodele")
    first_name!: string;

    @IsString({ 
        message: "Name is required",
    })
    @Example("Falaye")
    last_name!: string;

    @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }, { message: "Password should be a minimum of 8 characters, with at least 1 uppercase, 1 lowercase, 1 number and 1 special character" })
    @Example("gemsai.123@")
    password!: string;

}

export class loginUserDto {
  @IsString({
    message: "Email is required",
  })
  @Example("a.falaye@gems-consult.com")
  email!: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        "Password should be a minimum of 8 characters, with at least 1 uppercase, 1 lowercase, 1 number and 1 special character",
    }
  )
  @Example("gemsai.123@")
  password!: string;
}


export class CustomerTokenRefreshDTO {
  @IsString({ message: "Customer's refresh token is required" })
  @Example(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3REYXRhIjp7InNob3BfdXJsIjoiZmlzaG9vay1sb2NhbC1zdG9yZS5teXNob3BpZnkuY29tIiwic2hvcF9pZCI6ImM1NTA0Y2Y5LWZkOWItNGFjZC04MTBlLTI5NjE4MmJmMTEzNCIsImN1c3RvbWVyX2lkIjoiZTJlZDU5MzYtODQzMi00MzdmLWE0OGItOWQ5ZTAwZjcwNTliIiwic2NyaXB0X3RhZ19pZCI6IjA1NTgzMzE0LWNmMjgtNGMwNi05MTMxLTEzMTYxM2VkODZlMiIsInBsYXRmb3JtIjoiU0hPUElGWSIsImFjY2Vzc190b2tlbiI6InNocHVhX2JiOTc3OTE0ZjdkM2NkZGZlNWU3NmZhMmNmZGYzYmYwIiwiYXVkaWVuY2UiOiJmaXNob29rLWxvY2FsLXN0b3JlLm15c2hvcGlmeS5jb20ifSwiaWF0IjoxNzUzNzE0NjQzLCJleHAiOjE3NTQzMTk0NDMsImF1ZCI6ImZpc2hvb2stbG9jYWwtc3RvcmUubXlzaG9waWZ5LmNvbSIsImlzcyI6ImZpc2hvb2stbG9jYWwtc3RvcmUubXlzaG9waWZ5LmNvbSJ9.3_6wJLYq6bXZXm_8x2jnrj-WST-M-3hPMYp9wVBQGnk"
  )
  refresh_jwt_token!: string;
}