import { Todo } from "../types/todo";
import { apiSlice } from "./api";

export const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], { limit: number; offset: number }>({
      query: ({ limit, offset }) => ({
        url: `/todos?limit=${limit}&offset=${offset}`,
        method: "GET",
      }),
      providesTags: ["Todos"], // <- Cache is tagged with "Todos"
    }),

    getTodo: builder.query({
      query: (id: string) => ({
        url: `/todos/${id}`,
        method: "GET",
      }),
    }),
    create: builder.mutation<Todo, Omit<Todo, "_id">>({
      query: (todo) => ({
        url: "/todos/create",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todos"], // <- Triggers refetch of getTodos
    }),
    update: builder.mutation({
      query: (data: { id: string; title: string }) => ({
        url: `/todos/${data.id}`,
        method: "PUT",
        body: { title: data.title },
      }),
      invalidatesTags: ["Todos"],
    }),
    delete: builder.mutation({
      query: (data: { id: string }) => ({
        url: `/todos/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useCreateMutation,
  useDeleteMutation,
  useUpdateMutation,
  useGetTodoQuery,
  useGetTodosQuery,
} = todoApiSlice;
