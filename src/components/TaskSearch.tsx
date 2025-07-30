import { TaskSearchProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const TaskSearch: React.FC<TaskSearchProps> = ({
  searchText,
  onSearchChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#FF6B35"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={onSearchChange}
          placeholder="Search tasks..."
          placeholderTextColor="#999"
        />
        {searchText.length > 0 && (
          <TouchableOpacity
            onPress={() => onSearchChange("")}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color="#FF6B35" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "web" ? 12 : 8,
  },
  searchContainer: {
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
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: Platform.OS === "web" ? 18 : 16,
    color: "#333",
    paddingVertical: Platform.OS === "web" ? 8 : 4,
  },
  clearButton: {
    marginLeft: 8,
    padding: Platform.OS === "web" ? 8 : 4,
  },
});

export default TaskSearch;
