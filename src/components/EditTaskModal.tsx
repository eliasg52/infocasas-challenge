import { EditTaskModalProps } from "@/types";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  visible,
  taskText,
  onSave,
  onCancel,
}) => {
  const [editText, setEditText] = useState(taskText);

  useEffect(() => {
    setEditText(taskText);
  }, [taskText]);

  const handleSave = () => {
    if (editText.trim()) {
      onSave(editText.trim());
    } else {
      Alert.alert("Error", "Task text cannot be empty");
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Edit task</Text>
          <TextInput
            style={styles.input}
            value={editText}
            onChangeText={setEditText}
            placeholder="Enter a new text..."
            placeholderTextColor="#999"
            autoFocus={true}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    maxWidth: 400,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#F8F9FA",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  cancelButtonText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  saveButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#007AFF",
  },
  saveButtonText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
});

export default EditTaskModal;
