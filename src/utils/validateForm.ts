import { z } from "zod";

// Zod schema for the form
export const formSchema = z
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

    phone_number: z
      .string()
      .max(13, { message: "Phone number must not exceed 13 characters." })
      .regex(
        /^(?:\+2519\d{8}|\+2517\d{8}|09\d{8}|07\d{8})$/,
        { message: "Phone number must be in a valid Ethiopian format "}
      ),
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



export const pharmacyFormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  address: z.string().nonempty("Address is required"),
  phone: z
    .string()
    .nonempty("Phone number is required")
    .max(13, { message: "Phone number must not exceed 13 characters." })
    .regex(
      /^(?:\+2519\d{8}|\+2517\d{8}|09\d{8}|07\d{8})$/,
      { message: "Phone number must be in a valid Ethiopian format "}
    ),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  operating_hours: z.string().nonempty("Operating hours are required"),
  image: z.any().optional(),
  delivery_available: z.string({
    required_error: "Please specify if delivery is available",
  }),
  license_number: z.string().nonempty("License number is required"),
  license_image: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Invalid file format",
    })
    .optional(),
  
});

