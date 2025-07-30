import { TaskItemType, TaskListProps } from "@/types";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import EditTaskModal from "./EditTaskModal";
import TaskItem from "./TaskItem";

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  error,
  onDelete,
  onEdit,
}) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<{
    id: number;
    text: string;
  } | null>(null);

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

  const renderTaskItem = ({ item }: { item: TaskItemType }) => (
    <TaskItem
      key={item.id}
      id={item.id!}
      task={item.task}
      onDelete={onDelete}
      onEdit={handleEditPress}
    />
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>There are no tasks</Text>
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
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id?.toString() || item.task}
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={false}
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
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});

export default TaskList;
