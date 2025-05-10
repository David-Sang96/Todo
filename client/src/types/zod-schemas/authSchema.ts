import z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(5, { message: "Name must be at least 5 characters long" })
      .max(15, { message: "Name must be only 15 characters long." }),
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .trim()
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
        "Password must contain at least one letter and one digit"
      )
      .min(5, "Password must be at least 5 characters")
      .max(15, "Password is too long"),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .trim()
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
      "Password must contain at least one letter and one digit"
    )
    .min(5, "Password must be at least 5 characters")
    .max(15, "Password is too long"),
});

export const profileSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(5, { message: "Name must be at least 5 characters long" })
      .max(15, { message: "Name must be only 15 characters long." }),
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .trim()
      .optional()
      .refine(
        (val) => !val || /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/.test(val!),
        {
          message:
            "Password must be 5-15 chars, with at least one letter and one digit",
        }
      ),

    confirmPassword: z.string().trim(),
  })
  .refine((data) => !data.password || data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
