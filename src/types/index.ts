export interface TaskItemType {
  id?: number;
  task: string;
  completed?: boolean;
  userId?: number;
}

export interface TaskApiResponse {
  todos: {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
  }[];
  total: number;
  skip: number;
  limit: number;
}

export interface AddTaskProps {
  onAddTask: (taskText: string) => void;
}

export interface TaskListProps {
  tasks: TaskItemType[];
  error: string | null;
  onDelete: (id: number) => void;
  onEdit: (id: number, currentText: string) => void;
  onToggle: (id: number) => void;
}

export interface TaskItemProps {
  id: number;
  task: string;
  completed?: boolean;
  onDelete: (id: number) => void;
  onEdit: (id: number, currentText: string) => void;
  onToggle: (id: number) => void;
}

export interface EditTaskModalProps {
  visible: boolean;
  taskText: string;
  onSave: (newText: string) => void;
  onCancel: () => void;
}

export type FilterType = "all" | "completed" | "pending";

export interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export interface TaskSearchProps {
  searchText: string;
  onSearchChange: (text: string) => void;
}
