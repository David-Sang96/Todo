export type Todo = {
  _id: string;
  title: string;
  userId?: string;
  message?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
