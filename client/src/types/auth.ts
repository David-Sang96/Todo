export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type UserInfo = {
  _id: string;
  name: string;
  email: string;
};

export type Profile = {
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
};
