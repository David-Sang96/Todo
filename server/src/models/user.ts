import bcrypt from "bcrypt";
import mongoose from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isMatchPassword: (value: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isMatchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const USER = mongoose.model<IUser>("USER", userSchema);
