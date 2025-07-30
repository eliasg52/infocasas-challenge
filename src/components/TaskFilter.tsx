import { TaskFilterProps } from "@/types";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TaskFilter: React.FC<TaskFilterProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.filterButton,
          currentFilter === "all" && styles.activeFilter,
        ]}
        onPress={() => onFilterChange("all")}
      >
        <Text
          style={[
            styles.filterText,
            currentFilter === "all" && styles.activeFilterText,
          ]}
        >
          All
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterButton,
          currentFilter === "pending" && styles.activeFilter,
        ]}
        onPress={() => onFilterChange("pending")}
      >
        <Text
          style={[
            styles.filterText,
            currentFilter === "pending" && styles.activeFilterText,
          ]}
        >
          Pending
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterButton,
          currentFilter === "completed" && styles.activeFilter,
        ]}
        onPress={() => onFilterChange("completed")}
      >
        <Text
          style={[
            styles.filterText,
            currentFilter === "completed" && styles.activeFilterText,
          ]}
        >
          Completed
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginHorizontal: 4,
    alignItems: "center",
  },
  activeFilter: {
    backgroundColor: "#007AFF",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  activeFilterText: {
    color: "white",
  },
});

export default TaskFilter;
