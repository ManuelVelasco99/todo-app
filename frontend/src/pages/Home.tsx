import { TaskList } from '../components/TaskList';

export const Home = () => (
  <div className='home-container'>
    <div style={{ padding: '2rem', maxWidth : '1000px',width:'100%' }}>
      <TaskList />
    </div> 
  </div>
);
