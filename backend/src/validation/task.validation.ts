import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().optional(),
  date: z.preprocess((val) => val ? new Date(val as string) : undefined, z.date().optional()),
  allDay: z.boolean().optional(),
  important: z.boolean().optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;


export const updateTaskSchema = z.object({
  title: z.string().min(1, "El título es requerido").optional(),
  description: z.string().optional(),
  date: z.preprocess((val) => val ? new Date(val as string) : undefined, z.date().optional()),
  allDay: z.boolean().optional(),
  important: z.boolean().optional(),
  completed: z.boolean().optional(),
});

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
