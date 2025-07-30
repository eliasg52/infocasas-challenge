import TodoItem from "@/components/todoItem";
import useTodos from "@/hooks/useTodos";
import { TodoItemType } from "@/types";
import { ActivityIndicator, Text, View } from "react-native";

export default function Index() {
  const { todos, error, loading } = useTodos();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Loading todos...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        {error ? (
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        ) : todos.length > 0 ? (
          todos.map((todo: TodoItemType) => {
            return <TodoItem key={todo.id} id={todo.id} todo={todo.todo} />;
          })
        ) : (
          <Text>There are no tasks</Text>
        )}
      </View>
    </View>
  );
}
