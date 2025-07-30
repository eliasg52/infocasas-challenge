import AddTask from "@/components/AddTask";
import TaskList from "@/components/TaskList";
import useTasks from "@/hooks/useTasks";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
        <Text style={styles.loadingText}>Cargando tareas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#FF6B35", "#FF8C42"]} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <Ionicons name="home" size={32} color="white" />
            <Text style={styles.logoText}>TaskManager</Text>
          </View>
          <Text style={styles.headerSubtitle}>
            Organiza tus tareas de manera eficiente
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <AddTask onAddTask={addTask} />
        <TaskList
          tasks={tasks}
          error={error}
          onDelete={deleteTask}
          onEdit={updateTask}
          onToggle={toggleTaskCompletion}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  logoText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginLeft: 12,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "white",
    opacity: 0.9,
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
});
