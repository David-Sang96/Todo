/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent, useEffect, useState } from "react";
import {
  createOrUpdate,
  deleteTodo,
  getTodo,
  getTodos,
} from "../services/todo";
import { Todo } from "../types/todo";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState("");
  const [updateTodoText, setUpdateTodoText] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [oldData, setOldData] = useState("");

  const makeRefresh = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        throw new Error("Failed to fetch data");
      }
    };

    fetchTodos();
  }, [refresh]);

  useEffect(() => {
    if (isUpdate) {
      const getData = async () => {
        const data = await getTodo(updateId);
        setOldData(data?.title);
      };
      getData();
    }
  }, [isUpdate, updateId]);

  const showUpdateForm = (id: string) => {
    if (updateId != id) {
      setUpdateId(id);
      setIsUpdate(false);
    }
    setUpdateId(id);
    setIsUpdate((prev) => !prev);
  };

  const create = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoText.trim() === "") return;
    try {
      await createOrUpdate(todoText);
      setTodoText("");
      makeRefresh();
    } catch (error) {
      throw new Error("Failed to create data");
    }
  };

  const update = async (e: FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    if (updateTodoText.trim() === "") {
      setIsUpdate(false);
      return;
    }
    try {
      await createOrUpdate(updateTodoText, id);
      setUpdateTodoText("");
      setIsUpdate(false);
      makeRefresh();
    } catch (error) {
      throw new Error("Failed to update data");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      setUpdateTodoText("");
      makeRefresh();
    } catch (error) {
      throw new Error("Failed to delete data");
    }
  };

  return (
    <div className="space-y-4 ">
      <h2 className="text-lg font-medium ">Shares</h2>
      {todos && todos.length === 0 && (
        <div className="font-medium">No notes yet! Start create one!</div>
      )}
      <ul className="space-y-1.5 max-h-[400px] overflow-y-auto  ">
        {todos.map((item) => (
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
                  key={oldData} // bind this key props to remount cuz changing the key forces React to re-create the input field
                  type="text"
                  //defaultValue only sets the initial value. It does not update when the state/prop changes.
                  defaultValue={oldData}
                  onChange={(e) => setUpdateTodoText(e.target.value)}
                  className="border ps-1.5 rounded-sm w-full mb-1 py-1 focus:outline-none"
                />
                <div className="space-x-1 pt-1">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-2 rounded-sm py-1 cursor-pointer hover:bg-blue-600 text-sm"
                  >
                    update
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsUpdate(false)}
                    className="bg-red-500 text-white px-2 rounded-sm py-1 cursor-pointer hover:bg-red-600 text-sm"
                  >
                    cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <span>{item.title}</span>
                <div className="space-x-1 pb-2">
                  <button
                    onClick={() => showUpdateForm(item._id)}
                    className="bg-blue-500 text-white px-2 rounded-sm py-1 cursor-pointer hover:bg-blue-600 text-sm"
                  >
                    update
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-2 rounded-sm py-1 cursor-pointer hover:bg-red-600 text-sm"
                  >
                    delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
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
          save
        </button>
      </form>
    </div>
  );
};

export default TodoList;
