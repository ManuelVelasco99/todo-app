import { Modal } from 'antd';
import { TaskForm } from './TaskForm';
import { Task } from '../types/task';

interface Props {
  visible: boolean;
  onClose: () => void;
  onCreated: (task: Task) => void;
  task?: Task;
}

export const TaskFormModal = ({ visible, onClose, onCreated, task }: Props) => {
  const handleSuccess = (task: Task) => {
    onCreated(task);
  };

  return (
    <Modal
      title={task ? 'Editar tarea' : 'Crear nueva tarea'}
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <TaskForm onCreated={handleSuccess} task={task} />
    </Modal>
  );
};
