import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import z from "zod";
import { setUserInfo } from "../slices/auth";
import { useLoginMutation } from "../slices/userApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginSchema } from "../types/zod-schemas/authSchema";

type FormInput = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((store) => store.auth.userInfo);

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  const onSubmit: SubmitHandler<FormInput> = async (value) => {
    try {
      const payload = await login(value).unwrap();
      dispatch(setUserInfo(payload.user));
      toast.success(payload.message);
      reset();
      navigate("/", { replace: true });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || err?.error);
      console.error(
        "rejected",
        err?.data?.message || err?.error || "Something went wrong"
      );
    }
  };

  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Login your account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-medium hover:bg-green-600 py-1 cursor-pointer rounded-sm mt-3"
          disabled={isSubmitting || isLoading}
        >
          {isLoading ? "Logging in..." : " Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
