import { z } from "zod";

// Zod schema for the form
const formSchema = z
  .object({
    first_name: z
      .string()
      .min(1, { message: "First name is required." })
      .max(50, { message: "First name must not exceed 50 characters." })
      .regex(/^[A-Za-z\s]+$/, { message: "First name must contain only letters." }), // Alphabetic check

    last_name: z
      .string()
      .min(1, { message: "Last name is required." })
      .max(50, { message: "Last name must not exceed 50 characters." })
      .regex(/^[A-Za-z\s]+$/, { message: "Last name must contain only letters." }), // Alphabetic check

    email: z.string().email({ message: "Invalid email address." }),

    phone: z
      .string()
      .max(15, { message: "Phone number must not exceed 15 characters." })
      .regex(/^\+?\d*$/, { message: "Phone number must contain only numbers." }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })

      .regex(/[!@#$%^&*]/, { message: "Password must contain at least one special character." }),

    confirmPassword: z.string().min(1, { message: "Password confirmation is required." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"], // Attach the error to the confirmPassword field
  });

export default formSchema;
