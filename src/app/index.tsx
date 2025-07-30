import { Text, View } from "react-native";
import { TodoItem } from "../types";
import useTodos from "../hooks/useTodos";

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
          todos.map(({ todo, id }: TodoItem) => {
            return (
              <View key={id}>
                <Text>{todo}</Text>
              </View>
            );
          })
        ) : (
          <Text>There is no tasks</Text>
        )}
      </View>
    </View>
  );
}
