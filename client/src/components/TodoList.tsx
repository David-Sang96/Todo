import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import {
  useCreateMutation,
  useDeleteMutation,
  useGetTodoQuery,
  useGetTodosQuery,
  useUpdateMutation,
} from "../slices/todoApi";
import { useAppSelector } from "../store/hooks";
import { Todo } from "../types/todo";

const TodoList = () => {
  const [todoText, setTodoText] = useState("");
  const [updateTodoText, setUpdateTodoText] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [oldData, setOldData] = useState("");

  const { data: todos } = useGetTodosQuery({ limit: 5, offset: 0 });
  const { data } = useGetTodoQuery(updateId, { skip: !isUpdate });
  const [createTodo, { isLoading }] = useCreateMutation();
  const [updateTodo, { isLoading: updateLoading }] = useUpdateMutation();
  const [deleteTodo, { isLoading: deleteLoading }] = useDeleteMutation();

  const userInfo = useAppSelector((store) => store.auth.userInfo);

  useEffect(() => {
    if (data) {
      setOldData(data.title);
    }
  }, [data]);

  const showUpdateForm = (id: string, title: string) => {
    if (updateId != id) {
      setUpdateId(id);
      setIsUpdate(false);
    }
    setUpdateId(id);
    setIsUpdate((prev) => !prev);
    setOldData(title);
    setUpdateTodoText(title);
  };

  const create = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoText.trim() === "") return;
    try {
      const payload = await createTodo({ title: todoText }).unwrap();
      toast.success(payload.message);
      setTodoText("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  const update = async (e: FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    if (updateTodoText.trim() === "") {
      setIsUpdate(false);
      return;
    }
    try {
      const payload = await updateTodo({ id, title: updateTodoText }).unwrap();
      toast.success(payload.message);
      setUpdateTodoText("");
      setIsUpdate(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const payload = await deleteTodo({ id }).unwrap();
      toast.success(payload.message);
      setUpdateTodoText("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <div className="space-y-4 ">
      <h2 className="text-lg font-medium ">Shares</h2>
      {todos && todos.length === 0 && (
        <div className="font-medium">No notes yet! Start create one!</div>
      )}
      <ul className="space-y-1.5 max-h-[400px] overflow-y-auto  ">
        {todos?.map((item: Todo) => (
          <li
            key={item._id}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              paddingBottom: 6,
            }}
            className="shadow-md rounded-md px-2.5 pt-5"
          >
            {isUpdate && item._id === updateId ? (
              <form onSubmit={(e) => update(e, item._id)}>
                <input
                  type="text"
                  defaultValue={oldData}
                  onChange={(e) => setUpdateTodoText(e.target.value)}
                  className="border ps-1.5 rounded-sm w-full mb-1 py-1 focus:outline-none"
                />
                <div className="space-x-1 pt-1">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-2 rounded-sm py-1 cursor-pointer hover:bg-blue-600 text-sm"
                  >
                    {updateLoading ? "Updating..." : " Update"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsUpdate(false)}
                    className="bg-red-500 text-white px-2 rounded-sm py-1 cursor-pointer hover:bg-red-600 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex  gap-3">
                <span>{item.title}</span>
                {userInfo?._id === item.userId && (
                  <div className="space-x-1 pb-2">
                    <button
                      onClick={() => showUpdateForm(item._id, item.title)}
                      className="bg-blue-500 text-white px-2 rounded-sm py-1 cursor-pointer hover:bg-blue-600 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-2 rounded-sm py-1 cursor-pointer hover:bg-red-600 text-sm"
                    >
                      {deleteLoading ? "Deleting... " : " Delete"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      {userInfo ? (
        <form onSubmit={create} className="flex flex-col gap-2 ">
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            className="border p-1 rounded-sm focus:outline-none"
          />
          <button
            type="submit"
            className="py-1.5 px-6 cursor-pointer text-white bg-green-500 hover:bg-green-600 rounded-md max-w-[100px] self-end text-center font-medium"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </form>
      ) : (
        <Link to={"/login"} className="border py-2 w-fit px-4 rounded-md">
          Login to create your own share
        </Link>
      )}
    </div>
  );
};

export default TodoList;
