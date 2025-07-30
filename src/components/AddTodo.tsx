import { AddTaskProps } from "@/types";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
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
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#F8F9FA",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    minWidth: 60,
  },
  buttonDisabled: {
    backgroundColor: "#E5E5E5",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AddTask;
