import { TodoApiResponse, TodoItemType } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const useTodos = () => {
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const loadStoredTodos = async (): Promise<TodoItemType[] | null> => {
    try {
      const storedTodos = await AsyncStorage.getItem("todos");
      return storedTodos ? JSON.parse(storedTodos) : null;
    } catch (error) {
      console.error("Error loading stored todos:", error);
      return null;
    }
  };

  const saveTodosToStorage = async (todos: TodoItemType[]): Promise<void> => {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos to storage:", error);
    }
  };

  const fetchTodosFromAPI = async (): Promise<TodoItemType[]> => {
    const response = await fetch(apiUrl as string);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const { todos } = data as TodoApiResponse;
    return todos;
  };

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);

      const storedTodos = await loadStoredTodos();

      if (storedTodos) {
        setTodos(storedTodos);
        setLoading(false);
        return;
      }

      const apiTodos = await fetchTodosFromAPI();
      setTodos(apiTodos);
      await saveTodosToStorage(apiTodos);
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
