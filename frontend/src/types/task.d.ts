export interface Task {
  id: number;
  title: string;
  description?: string;
  date?: string;
  allDay?: boolean;
  important?: boolean;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
