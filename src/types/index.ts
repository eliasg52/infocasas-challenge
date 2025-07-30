export interface TodoItemType {
  id?: number;
  todo: string;
  completed?: boolean;
  userId?: number;
}

export interface TodoApiResponse {
  todos: TodoItemType[];
  total: number;
  skip: number;
  limit: number;
}
