import { TaskItemType } from "@/types";
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
      console.log("Stored tasks from AsyncStorage:", storedTasks);
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
      console.log("Saving tasks to storage:", tasks);
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to storage:", error);
    }
  };

  const fetchTasksFromAPI = async (): Promise<TaskItemType[]> => {
    console.log("Fetching tasks from API:", apiUrl);

    const response = await fetch(apiUrl as string);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API response data:", data);

    // La API devuelve 'todos' en lugar de 'tasks'
    if (!data || !data.todos) {
      console.warn("API response doesn't have expected structure:", data);
      return [];
    }

    // Convertir 'todos' a 'tasks' con la estructura correcta
    const tasks = data.todos.map((todo: any) => ({
      id: todo.id,
      task: todo.todo, // Cambiar 'todo' por 'task'
      completed: todo.completed,
      userId: todo.userId,
    }));

    console.log("Converted tasks from API:", tasks);
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

      console.log("Starting fetchTasks...");
      const storedTasks = await loadStoredTasks();

      if (storedTasks && storedTasks.length > 0) {
        console.log("Using stored tasks:", storedTasks);
        setTasks(storedTasks);
        setLoading(false);
        return;
      }

      console.log("No stored tasks found, fetching from API...");
      const apiTasks = await fetchTasksFromAPI();

      if (apiTasks && apiTasks.length > 0) {
        console.log("Setting tasks from API:", apiTasks);
        setTasks(apiTasks);
        await saveTasksToStorage(apiTasks);
      } else {
        console.log("No tasks from API, setting empty array");
        setTasks([]);
      }
    } catch (error) {
      console.error("Error in fetchTasks:", error);
      setError(`Error fetching tasks: ${error}`);
      setTasks([]); // Asegurar que siempre hay un array válido
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
