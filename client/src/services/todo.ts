import { Todo } from "../types/todo";

const API_URL = import.meta.env.VITE_API_URL;

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_URL}/todos`);
  const data = await response.json();
  return data.todos;
};

export const getTodo = async (id: string) => {
  const response = await fetch(`${API_URL}/todos/${id}`);
  const data = await response.json();
  return data.todo;
};

export const createOrUpdate = async (title: string, _id?: string) => {
  const payload = JSON.stringify({ title });

  const options = {
    method: _id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
  };

  const url = _id ? `${API_URL}/todos/${_id}` : `${API_URL}/todos/create`;
  await fetch(url, options);
};

export const deleteTodo = async (id: string) => {
  await fetch(`${API_URL}/todos/${id}`, { method: "DELETE" });
};
