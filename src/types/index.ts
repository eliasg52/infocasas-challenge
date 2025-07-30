export interface TaskItemType {
  id?: number;
  task: string;
  completed?: boolean;
  userId?: number;
}

export interface TaskApiResponse {
  tasks: TaskItemType[];
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
}

export interface TaskItemProps {
  id: number;
  task: string;
  onDelete: (id: number) => void;
  onEdit: (id: number, currentText: string) => void;
}

export interface EditTaskModalProps {
  visible: boolean;
  taskText: string;
  onSave: (newText: string) => void;
  onCancel: () => void;
}
