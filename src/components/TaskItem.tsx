import { TaskItemProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TaskItem: React.FC<TaskItemProps> = ({ id, task, onDelete, onEdit }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.taskText}>{task}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(id, task)}
        >
          <Ionicons name="pencil-outline" size={18} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(id)}
        >
          <Ionicons name="trash-outline" size={18} color="#FF3B30" />
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
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginRight: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },
  editButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#F0F8FF",
  },
  deleteButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#FFF5F5",
  },
});

export default TaskItem;
