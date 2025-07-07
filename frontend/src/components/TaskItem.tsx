import { useState } from 'react';
import { Card, message, Button, Checkbox } from 'antd';
import {
  StarOutlined,
  StarFilled,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Task } from '../types/task';
import { updateTask, deleteTask } from '../api/tasks';
import { TaskFormModal } from './TaskFormModal';
import dayjs from 'dayjs';


interface Props {
  task: Task;
  onChange: (updated?: Task) => void;
  onDelete?: (id: number) => void;
}

export const TaskItem = ({ task, onChange, onDelete }: Props) => {
  const [editing, setEditing] = useState(false);

  const toggleImportant = async () => {
    try {
      const updated = await updateTask(task.id, {
        important: !task.important,
      });
      onChange(updated);
    } catch {
      message.error('No se pudo actualizar la tarea');
    }
  };

  const toggleCompleted = async (checked: boolean) => {
    try {
      const updated = await updateTask(task.id, {
        completed: checked,
      });
      onChange(updated);
    } catch {
      message.error('No se pudo actualizar el estado de completado');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      onChange(undefined);
      onDelete?.(task.id);
    } catch {
      message.error('Error al eliminar');
    }
  };

  const handleEditSuccess = (updated: Task) => {
    onChange(updated);
    setEditing(false);
  };

  const cardContent =
  task.description || task.date ? (
    <>
      {task.description && <p>{task.description}</p>}
      {task.date && (
        <p>
          Fecha:{' '}
          {task.allDay
            ? dayjs(task.date).format('DD/MM/YYYY')
            : dayjs(task.date).format('DD/MM/YYYY HH:mm')}
        </p>
      )}
    </>
  ) : null;

  return (
    <>
      <Card
        title={
          <Checkbox
            checked={task.completed}
            onChange={(e) => toggleCompleted(e.target.checked)}
          >
            {task.title}
          </Checkbox>
        }
        style={{ marginBottom: '1rem', background : '#333', border:'none',color:'white'}}
        extra={
          <div>
            <Button
              type="text"
              icon={<EditOutlined style={{color:'white'}}/>}
              onClick={() => setEditing(true)}
            />
            <Button
              type="text"
              icon={task.important ? <StarFilled  style={{color:'white'}}/> : <StarOutlined  style={{color:'white'}}/>}
              onClick={toggleImportant}
            />
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={handleDelete}
              danger
            />
          </div>
        }
        bodyStyle={cardContent ? undefined : { display: 'none' }}
        headStyle={!cardContent ? { borderBottom: 'none' } : undefined}
      >
        {cardContent}
      </Card>

      {editing && (
        <TaskFormModal
          visible={editing}
          onClose={() => setEditing(false)}
          onCreated={handleEditSuccess}
          task={task}
        />
      )}
    </>
  );
};
