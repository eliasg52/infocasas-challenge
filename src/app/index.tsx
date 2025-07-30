import AddTask from "@/components/AddTask";
import TaskList from "@/components/TaskList";
import useTasks from "@/hooks/useTasks";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

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
        <Text style={styles.loadingText}>Loading tasks...</Text>
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
            Organize your tasks efficiently
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
    ...(Platform.OS === "web" && {
      maxWidth: 800,
      alignSelf: "center" as const,
      width: "100%",
      minHeight: "100vh" as any,
      paddingHorizontal: 20,
    }),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    ...(Platform.OS === "web" && {
      maxWidth: 800,
      alignSelf: "center" as const,
      width: "100%",
      minHeight: "100vh" as any,
    }),
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  header: {
    paddingTop: Platform.OS === "web" ? 40 : 60,
    paddingBottom: Platform.OS === "web" ? 40 : 30,
    paddingHorizontal: Platform.OS === "web" ? 0 : 20,
    marginBottom: Platform.OS === "web" ? 30 : 0,
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
    fontSize: Platform.OS === "web" ? 32 : 28,
    fontWeight: "bold",
    color: "white",
    marginLeft: 12,
  },
  headerSubtitle: {
    fontSize: Platform.OS === "web" ? 18 : 16,
    color: "white",
    opacity: 0.9,
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: Platform.OS === "web" ? 0 : 16,
    paddingTop: Platform.OS === "web" ? 0 : 20,
  },
});
