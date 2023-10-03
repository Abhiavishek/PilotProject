import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../store/actions';


const TaskList = ({ tasks }) => {
  const [editTask, setEditTask] = useState({ title: '', description: '', status: 'In Progress' });
  const [editTaskId, setEditTaskId] = useState(null);
  const dispatch = useDispatch();

  const handleEditTask = () => {
    dispatch(updateTask(editTask));
    setEditTaskId(null);
    setEditTask({ title: '', description: '', status: 'In Progress' });
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleEditClick = (task) => {
    setEditTaskId(task._id);
    setEditTask(task);
  };

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {editTaskId === task._id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editTask.title}
                  onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                />
                <input
                  type="text"
                  value={editTask.description}
                  onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                />
                <select
                  value={editTask.status}
                  onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <button onClick={handleEditTask}>Update</button>
              </div>
            ) : (
              <div>
                <strong>{task.title}</strong>
                <p>{task.description}</p>
                <span>Status: {task.status}</span>
                <button onClick={() => handleEditClick(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
