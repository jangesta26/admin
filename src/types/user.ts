import * as z from 'zod';

// SignUp validation
export const SignUpUserSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Password must be at least 5 characters long" }),
  confirmPassword: z.string().min(5, { message: "Confirm password must be at least 5 characters long" })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export type SignUpUser = z.infer<typeof SignUpUserSchema>;



// SignIn validation
export const SignInUserSchema = z.object({
  username: z.string().min(1, { message: "Invalid username" }),
  password: z.string().min(5, { message: "Password must be at least 5 characters long" }),
});

const getSignInUser= SignInUserSchema.brand<'GetSignInUser'>()

export type GetSignInUser = z.infer<typeof getSignInUser>;