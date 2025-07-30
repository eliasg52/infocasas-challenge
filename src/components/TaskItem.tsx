import { TaskItemProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  task,
  completed,
  onDelete,
  onEdit,
  onToggle,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.taskContainer}
        onPress={() => onToggle(id)}
      >
        <View style={[styles.checkbox, completed && styles.checkboxCompleted]}>
          {completed && <Ionicons name="checkmark" size={16} color="white" />}
        </View>
        <Text style={[styles.taskText, completed && styles.taskTextCompleted]}>
          {task}
        </Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(id, task)}
        >
          <Ionicons name="pencil" size={18} color="#FF6B35" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(id)}
        >
          <Ionicons name="trash" size={18} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 12,
    padding: Platform.OS === "web" ? 20 : 16,
    marginVertical: Platform.OS === "web" ? 8 : 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  checkbox: {
    width: Platform.OS === "web" ? 28 : 24,
    height: Platform.OS === "web" ? 28 : 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#FF6B35",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxCompleted: {
    backgroundColor: "#FF6B35",
  },
  taskText: {
    flex: 1,
    fontSize: Platform.OS === "web" ? 18 : 16,
    color: "#333",
    fontWeight: "500",
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: Platform.OS === "web" ? 12 : 8,
  },
  editButton: {
    padding: Platform.OS === "web" ? 12 : 8,
    borderRadius: 8,
    backgroundColor: "#FFF3E0",
  },
  deleteButton: {
    padding: Platform.OS === "web" ? 12 : 8,
    borderRadius: 8,
    backgroundColor: "#FFEBEE",
  },
});

export default TaskItem;
