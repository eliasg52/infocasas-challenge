import { useEffect, useState } from "react";
import { TodoItemType, TodoApiResponse } from "@/types";

const useTodos = () => {
  const [todos, setTodos] = useState<TodoItemType[]>([]);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const fetchTodos = async () => {
    const data = await fetch(apiUrl as string);
    const { todos } = (await data.json()) as TodoApiResponse;
    setTodos(todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos };
};

export default useTodos;
