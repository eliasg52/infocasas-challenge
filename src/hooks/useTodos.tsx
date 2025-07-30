import { TodoApiResponse, TodoItemType } from "@/types";
import { useEffect, useState } from "react";

const useTodos = () => {
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(apiUrl as string);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const { todos } = data as TodoApiResponse;
      setTodos(todos);
    } catch (error) {
      setError(`Error fetching todos: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, error, loading };
};

export default useTodos;
