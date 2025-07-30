import AddTask from "@/components/AddTask";
import TaskList from "@/components/TaskList";
import useTasks from "@/hooks/useTasks";
import { ActivityIndicator, Image, Text, View } from "react-native";

export default function Index() {
  const {
    tasks,
    error,
    loading,
    addTask,
    updateTask,
    toggleTaskCompletion,
    deleteTask,
  } = useTasks();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Image
          source={require("../../assets/images/unnamed.gif")}
          style={{ width: 50, height: 50 }}
        />
      </View>

      <AddTask onAddTask={addTask} />

      <TaskList
        tasks={tasks}
        error={error}
        onDelete={deleteTask}
        onEdit={updateTask}
        onToggle={toggleTaskCompletion}
      />
    </View>
  );
}
