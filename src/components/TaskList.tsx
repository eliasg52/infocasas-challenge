import { FilterType, TaskItemType, TaskListProps } from "@/types";
import React, { useMemo, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import EditTaskModal from "./EditTaskModal";
import TaskFilter from "./TaskFilter";
import TaskItem from "./TaskItem";
import TaskSearch from "./TaskSearch";

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  error,
  onDelete,
  onEdit,
  onToggle,
}) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<{
    id: number;
    text: string;
  } | null>(null);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");
  const [searchText, setSearchText] = useState("");

  const handleEditPress = (id: number, currentText: string) => {
    setEditingTask({ id, text: currentText });
    setEditModalVisible(true);
  };

  const handleSaveEdit = (newText: string) => {
    if (editingTask) {
      onEdit(editingTask.id, newText);
      setEditModalVisible(false);
      setEditingTask(null);
    }
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false);
    setEditingTask(null);
  };

  const filteredAndSearchedTasks = useMemo(() => {
    let filteredTasks = tasks;
    switch (currentFilter) {
      case "completed":
        filteredTasks = tasks.filter((task) => task.completed);
        break;
      default:
        filteredTasks = tasks;
    }

    if (searchText.trim()) {
      filteredTasks = filteredTasks.filter((task) =>
        task.task.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return filteredTasks;
  }, [tasks, currentFilter, searchText]);

  const renderTaskItem = ({ item }: { item: TaskItemType }) => (
    <TaskItem
      key={item.id}
      id={item.id!}
      task={item.task}
      completed={item.completed}
      onDelete={onDelete}
      onEdit={handleEditPress}
      onToggle={onToggle}
    />
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {searchText.trim()
          ? "No tasks found matching your search"
          : currentFilter === "all"
          ? "There are no tasks"
          : "No completed tasks"}
      </Text>
    </View>
  );

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <>
      <TaskSearch searchText={searchText} onSearchChange={setSearchText} />
      <TaskFilter
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
      />
      <FlatList
        data={filteredAndSearchedTasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id?.toString() || item.task}
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={Platform.OS === "web"}
        contentContainerStyle={styles.listContainer}
        style={styles.flatList}
      />
      <EditTaskModal
        visible={editModalVisible}
        taskText={editingTask?.text || ""}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: Platform.OS === "web" ? 40 : 50,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Platform.OS === "web" ? 60 : 40,
  },
  emptyText: {
    fontSize: Platform.OS === "web" ? 18 : 16,
    color: "#666",
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Platform.OS === "web" ? 60 : 40,
  },
  errorText: {
    fontSize: Platform.OS === "web" ? 18 : 16,
    color: "red",
    textAlign: "center",
  },
});

export default TaskList;
