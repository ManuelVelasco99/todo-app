import { useEffect, useState } from 'react';
import { Task } from '../types/task';
import { getTasks } from '../api/tasks';
import { TaskItem } from './TaskItem';
import { Button, Spin, message } from 'antd';
import { TaskFormModal } from './TaskFormModal';
import { PlusOutlined } from '@ant-design/icons';

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(sortTasks(data));
    } catch {
      message.error('Error al obtener tareas');
    } finally {
      setLoading(false);
    }
  };

  const sortTasks = (list: Task[]) =>
    [...list].sort((a, b) => {
      if (a.important !== b.important) return b.important ? 1 : -1;

      if (!a.date && b.date) return -1;
      if (a.date && !b.date) return 1;

      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }

      return 0;
    });

  const handleChange = (updated?: Task) => {
    if (updated) {
      setTasks((prev) =>
        sortTasks(prev.map((t) => (t.id === updated.id ? updated : t)))
      );
    }
  };

  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <Spin tip="Cargando tareas..." />;

  return (
    
    <div>

      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
        <h2 style={{color:'white'}}>Tareas pendientes</h2>

        <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => setShowModal(true)} />
      </div>


      <TaskFormModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          onCreated={(newTask) => {
            setTasks(prev => sortTasks([...prev, newTask]));
            setShowModal(false);
          }}
      />

      {tasks
        .filter((task) => !task.completed).length == 0 ?( <div className='contenedor-mensaje-listado'><span>No hay tareas pendientes</span></div>):(
          tasks
          .filter((task) => !task.completed)
          .map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onChange={handleChange}
            onDelete={handleDelete}
          />
          )
        ))
      }
      

      <h2 style={{color:'white', marginTop:'24px'}}>Tareas completas</h2>

      {tasks
        .filter((task) => task.completed).length == 0 ?( <div className='contenedor-mensaje-listado'><span>No hay tareas completas</span></div>):(
          tasks
          .filter((task) => task.completed)
          .map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onChange={handleChange}
            onDelete={handleDelete}
          />
          )
        ))
      }
    </div>
  );
};
