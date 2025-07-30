export interface TodoItem {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface TodoApiResponse {
  todos: TodoItem[];
  total: number;
  skip: number;
  limit: number;
}
