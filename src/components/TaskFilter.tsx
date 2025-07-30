import { FilterType, TaskFilterProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TaskFilter: React.FC<TaskFilterProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  const getFilterIcon = (filter: FilterType) => {
    switch (filter) {
      case "all":
        return "list";
      case "completed":
        return "checkmark-circle";
      default:
        return "list";
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.filterButton,
          currentFilter === "all" && styles.activeFilter,
        ]}
        onPress={() => onFilterChange("all")}
      >
        <Ionicons
          name={getFilterIcon("all")}
          size={16}
          color={currentFilter === "all" ? "white" : "#666"}
          style={styles.filterIcon}
        />
        <Text
          style={[
            styles.filterText,
            currentFilter === "all" && styles.activeFilterText,
          ]}
        >
          Todas
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterButton,
          currentFilter === "completed" && styles.activeFilter,
        ]}
        onPress={() => onFilterChange("completed")}
      >
        <Ionicons
          name={getFilterIcon("completed")}
          size={16}
          color={currentFilter === "completed" ? "white" : "#666"}
          style={styles.filterIcon}
        />
        <Text
          style={[
            styles.filterText,
            currentFilter === "completed" && styles.activeFilterText,
          ]}
        >
          Completadas
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
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeFilter: {
    backgroundColor: "#FF6B35",
    shadowColor: "#FF6B35",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  filterIcon: {
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    flexShrink: 1,
  },
  activeFilterText: {
    color: "white",
  },
});

export default TaskFilter;
