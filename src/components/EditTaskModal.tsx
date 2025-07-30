import { EditTaskModalProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
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
          <View style={styles.header}>
            <Ionicons name="pencil" size={24} color="#FF6B35" />
            <Text style={styles.title}>Edit task</Text>
          </View>

          <TextInput
            style={styles.input}
            value={editText}
            onChangeText={setEditText}
            placeholder="Enter new text..."
            placeholderTextColor="#999"
            autoFocus={true}
            multiline={true}
            numberOfLines={3}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Ionicons
                name="checkmark"
                size={18}
                color="white"
                style={styles.saveIcon}
              />
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
    borderRadius: 16,
    padding: 24,
    width: "85%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#F8F9FA",
    marginBottom: 24,
    textAlignVertical: "top",
    minHeight: 80,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#F8F9FA",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },
  saveButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#FF6B35",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF6B35",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  saveIcon: {
    marginRight: 6,
  },
});

export default EditTaskModal;
