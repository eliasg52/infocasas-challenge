import { AddTaskProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState("");

  const handleAddTask = () => {
    if (taskText.trim()) {
      onAddTask(taskText.trim());
      setTaskText("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons
          name="add-circle"
          size={24}
          color="#FF6B35"
          style={styles.addIcon}
        />
        <TextInput
          style={styles.input}
          value={taskText}
          onChangeText={setTaskText}
          placeholder="Add a new task..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={[styles.button, !taskText.trim() && styles.buttonDisabled]}
          onPress={handleAddTask}
          disabled={!taskText.trim()}
        >
          <Ionicons name="checkmark" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Platform.OS === "web" ? 24 : 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "web" ? 16 : 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: Platform.OS === "web" ? 18 : 16,
    color: "#333",
    paddingVertical: Platform.OS === "web" ? 12 : 8,
  },
  button: {
    backgroundColor: "#FF6B35",
    padding: Platform.OS === "web" ? 16 : 12,
    borderRadius: 8,
    marginLeft: 12,
    shadowColor: "#FF6B35",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonDisabled: {
    backgroundColor: "#E0E0E0",
    shadowOpacity: 0,
  },
});

export default AddTask;
