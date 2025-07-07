import { useEffect } from 'react';
import { Button, DatePicker, Form, Input, Switch } from 'antd';
import { Task } from '../types/task';
import { createTask, updateTask } from '../api/tasks';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';

const taskSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().optional(),
  date: z.date().optional(),
  allDay: z.boolean().optional(),
  important: z.boolean().optional(),
});

type TaskInput = z.infer<typeof taskSchema>;

interface Props {
  onCreated: (task: Task) => void;
  task?: Task;
}

export const TaskForm = ({ onCreated, task }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TaskInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: task
      ? {
          ...task,
          description: task.description ?? undefined,
          date: task.date ? new Date(task.date) : undefined,
        }
      : {},
  });

  useEffect(() => {
    if (task) {
      reset({
        ...task,
        description: task.description ?? undefined,
        date: task.date ? new Date(task.date) : undefined,
      });
    }
  }, [task, reset]);

  const onSubmit = async (data: TaskInput) => {
    try {
      const payload = {
        ...data,
        date: data.date ? data.date.toISOString() : undefined,
      };

      const updated = task
        ? await updateTask(task.id, payload)
        : await createTask(payload);

      onCreated(updated);
      reset();
    } catch (err) {
      console.error('Error al guardar la tarea', err);
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="Título"
        validateStatus={errors.title ? 'error' : ''}
        help={errors.title?.message}
      >
        <Controller name="title" control={control} render={({ field }) => <Input {...field} />} />
      </Form.Item>

      <Form.Item label="Descripción">
        <Controller name="description" control={control} render={({ field }) => <Input.TextArea rows={3} {...field} />} />
      </Form.Item>

      <Form.Item label="Fecha">
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.toDate())}
              showTime={{ format: 'HH:mm', use12Hours: false }}
            />
          )}
        />
      </Form.Item>

      <Form.Item label="Todo el día">
        <Controller name="allDay" control={control} render={({ field }) => <Switch checked={field.value} onChange={field.onChange} />} />
      </Form.Item>

      <Form.Item label="Importante">
        <Controller name="important" control={control} render={({ field }) => <Switch checked={field.value} onChange={field.onChange} />} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          {task ? 'Guardar cambios' : 'Crear tarea'}
        </Button>
      </Form.Item>
    </Form>
  );
};
