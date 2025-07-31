import { TaskItemType } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

const useTasks = () => {
  const [tasks, setTasks] = useState<TaskItemType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const apiUrl =
    process.env.EXPO_PUBLIC_API_URL || "https://dummyjson.com/todos";

  const isWeb = Platform.OS === "web";

  const loadStoredTasks = async (): Promise<TaskItemType[] | null> => {
    try {
      if (isWeb) {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : null;
      } else {
        const storedTasks = await AsyncStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : null;
      }
    } catch (error) {
      console.error("Error loading stored tasks:", error);
      return null;
    }
  };

  const saveTasksToStorage = async (tasks: TaskItemType[]): Promise<void> => {
    try {
      if (tasks === undefined || tasks === null) {
        console.warn("Attempting to save undefined/null tasks");
        return;
      }
      if (isWeb) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      } else {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      }
    } catch (error) {
      console.error("Error saving tasks to storage:", error);
    }
  };

  const fetchTasksFromAPI = async (): Promise<TaskItemType[]> => {
    const response = await fetch(apiUrl as string);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.todos) {
      console.warn("API response doesn't have expected structure:", data);
      return [];
    }

    const tasks = data.todos.map((todo: any) => ({
      id: todo.id,
      task: todo.todo,
      completed: todo.completed,
      userId: todo.userId,
    }));

    return tasks;
  };

  const addTask = async (taskText: string) => {
    const newTask: TaskItemType = {
      id: Date.now(),
      task: taskText,
      completed: false,
      userId: 1,
    };

    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);
    await saveTasksToStorage(updatedTasks);
  };

  const updateTask = async (taskId: number, newText: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, task: newText } : task
    );
    setTasks(updatedTasks);
    await saveTasksToStorage(updatedTasks);
  };

  const toggleTaskCompletion = async (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await saveTasksToStorage(updatedTasks);
  };

  const deleteTask = async (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    await saveTasksToStorage(updatedTasks);
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const storedTasks = await loadStoredTasks();

      if (storedTasks && storedTasks.length > 0) {
        setTasks(storedTasks);
        setLoading(false);
        return;
      }

      const apiTasks = await fetchTasksFromAPI();

      if (apiTasks && apiTasks.length > 0) {
        setTasks(apiTasks);
        await saveTasksToStorage(apiTasks);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Error in fetchTasks:", error);
      setError(`Error fetching tasks: ${error}`);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    error,
    loading,
    addTask,
    updateTask,
    toggleTaskCompletion,
    deleteTask,
  };
};

export default useTasks;
