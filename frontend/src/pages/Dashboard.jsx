import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/api/tasks');
      setTasks(res.data);
      setLoading(false);
    } catch (err) {
      setError('Session expired. Please login again.');
      localStorage.removeItem('token');
      setTimeout(() => navigate('/login'), 1500);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  // Add task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title) return;
    setAdding(true);
    try {
      // Simulate a 6 second progress bar
      await new Promise(res => setTimeout(res, 6000));
      await axiosInstance.post('/api/tasks', { title, description });
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (err) {
      setError('Failed to add task');
    }
    setAdding(false);
  };

  // Toggle complete
  const handleToggleComplete = async (task) => {
    try {
      await axiosInstance.put(`/api/tasks/${task._id}`, { completed: !task.completed });
      fetchTasks();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button className="dashboard-logout" onClick={handleLogout}>Logout</button>
      </div>
      {error && <div className="dashboard-error">{error}</div>}
      <form className="task-form" onSubmit={handleAddTask}>
        <input
          className="auth-input"
          type="text"
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          className="auth-input"
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="auth-btn" type="submit" disabled={adding}>Add Task</button>
      </form>
      {adding && <div className="progress-bar-container"><div className="progress-bar"></div></div>}
      <div className="dashboard-content">
        <h3>Your Tasks</h3>
        {loading ? (
          <div className="spinner spinner-green"></div>
        ) : (
          <ul className="dashboard-tasks">
            {tasks.length === 0 && <li>No tasks found.</li>}
            {tasks.map(task => (
              <li key={task._id}>
                <span
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#888' : '#1976d2',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleToggleComplete(task)}
                  title="Toggle complete"
                >
                  {task.title}
                </span>
                <span style={{ marginLeft: 8, fontSize: 12, color: '#888' }}>
                  {task.description}
                </span>
                <button
                  className="dashboard-logout"
                  style={{ marginLeft: 16, background: '#ff9800' }}
                  onClick={() => handleDelete(task._id)}
                  type="button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 