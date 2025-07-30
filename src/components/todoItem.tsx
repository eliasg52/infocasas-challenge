import { TodoItemType } from "@/types";
import { Text, View } from "react-native";

const TodoItem = ({ todo }: TodoItemType) => {
  return (
    <View>
      <Text>{todo}</Text>
    </View>
  );
};

export default TodoItem;
