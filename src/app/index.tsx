import TodoItem from "@/components/todoItem";
import useTodos from "@/hooks/useTodos";
import { TodoItemType } from "@/types";
import { Text, View } from "react-native";

export default function Index() {
  const { todos } = useTodos();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        {todos.length > 0 ? (
          todos.map((todo: TodoItemType) => {
            return <TodoItem key={todo.id} id={todo.id} todo={todo.todo} />;
          })
        ) : (
          <Text>There is no tasks</Text>
        )}
      </View>
    </View>
  );
}
