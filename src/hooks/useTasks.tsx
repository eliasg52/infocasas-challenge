import { TaskApiResponse, TaskItemType } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const useTasks = () => {
  const [tasks, setTasks] = useState<TaskItemType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const loadStoredTasks = async (): Promise<TaskItemType[] | null> => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasks");
      return storedTasks ? JSON.parse(storedTasks) : null;
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
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
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
    const { tasks } = data as TaskApiResponse;
    return tasks;
  };

  const addTask = async (taskText: string) => {
    console.log("Adding task with text:", taskText);

    const newTask: TaskItemType = {
      id: Date.now(), // Generar ID único como number
      task: taskText,
      completed: false,
      userId: 1, // Valor por defecto
    };

    console.log("Created new task:", newTask);

    const updatedTasks = [...tasks, newTask];
    console.log("Updated tasks array:", updatedTasks);

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

      if (storedTasks) {
        setTasks(storedTasks);
        setLoading(false);
        return;
      }

      const apiTasks = await fetchTasksFromAPI();
      setTasks(apiTasks);
      await saveTasksToStorage(apiTasks);
    } catch (error) {
      setError(`Error fetching tasks: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, error, loading, addTask, updateTask, deleteTask };
};

export default useTasks;
