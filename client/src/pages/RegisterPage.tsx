import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { registerSchema } from "../types/zod-schemas/authSchema";

type FormInput = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit: SubmitHandler<FormInput> = (value) => {
    console.log(value);
  };

  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Register new account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Name..."
            className="border focus:outline-none py-1 ps-1 rounded-sm text-sm bg-gray-50"
            {...register("name")}
            disabled={isSubmitting}
          />

          <p className="text-sm text-red-500 font-medium">
            {errors.name?.message}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            placeholder="Email..."
            className="border focus:outline-none py-1 ps-1 rounded-sm text-sm bg-gray-50"
            disabled={isSubmitting}
          />
          <p className="text-sm text-red-500 font-medium">
            {errors.email?.message}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            placeholder="Password..."
            className="border focus:outline-none py-1 ps-1 rounded-sm text-sm bg-gray-50"
            disabled={isSubmitting}
          />
          <p className="text-sm text-red-500 font-medium">
            {errors.password?.message}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword" className="font-medium">
            ConfirmPassword
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
            placeholder="ConfirmPassword..."
            className="border focus:outline-none py-1 ps-1 rounded-sm text-sm bg-gray-50"
            disabled={isSubmitting}
          />
          <p className="text-sm text-red-500 font-medium">
            {errors.confirmPassword?.message}
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white font-medium hover:bg-green-600 py-1 cursor-pointer rounded-sm mt-3"
          disabled={isSubmitting}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
