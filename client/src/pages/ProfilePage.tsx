import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { z } from "zod";
import { clearUserInfo, setUserInfo } from "../slices/auth";
import { useUpdateProfileMutation } from "../slices/userApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { profileSchema } from "../types/zod-schemas/authSchema";

type Input = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const userInfo = useAppSelector((store) => store.auth.userInfo);
  const dispatch = useAppDispatch();
  const [update, { isLoading }] = useUpdateProfileMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Input>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userInfo?.name,
      email: userInfo?.email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<Input> = async (values) => {
    try {
      const payload = await update(values).unwrap();
      dispatch(setUserInfo(payload.user));
      toast.success(payload.message || "Profile updated");
      if (payload.message.includes("Account")) {
        dispatch(clearUserInfo());
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-medium mb-3">Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <input
            id="name"
            {...register("name")}
            className="border focus:outline-none py-1 ps-1 rounded-sm text-sm bg-gray-50"
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
          disabled={isSubmitting || isLoading}
        >
          {isLoading ? "Updating..." : " Update Profile"}
        </button>
      </form>
    </section>
  );
};

export default ProfilePage;
