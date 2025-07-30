import { TaskSearchProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

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
          color="#999"
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
          <Ionicons
            name="close-circle"
            size={20}
            color="#999"
            style={styles.clearIcon}
            onPress={() => onSearchChange("")}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 4,
  },
  clearIcon: {
    marginLeft: 8,
  },
});

export default TaskSearch;
