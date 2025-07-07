import { Request, Response } from "express";
import * as taskValidation from "../validation/task.validation";
import * as taskService from "../services/task.service";

export const getAllTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await taskService.getTasks();
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getTask = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    const task = await taskService.getTask(id);

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const result = taskValidation.createTaskSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Datos inválidos",
      errors: result.error.flatten().fieldErrors,
    });
  }

  try {
    const task = await taskService.createTask(result.data);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const taskId = Number(req.params.id);

  const result = taskValidation.updateTaskSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Datos inválidos",
      errors: result.error.flatten().fieldErrors,
    });
  }

  try {
    const task = await taskService.updateTask(taskId, result.data);
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar tarea" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    const deleted = await taskService.deleteTask(id);

    if (!deleted) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    return res.status(204).send();
    } catch (error) {
    console.error("Error al eliminar tarea:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
