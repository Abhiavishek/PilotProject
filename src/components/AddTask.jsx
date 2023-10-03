import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/actions';

const AddTask = () => {
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'In Progress' });
  const dispatch = useDispatch();

  const handleAddTask = () => {
    dispatch(addTask(newTask));
    setNewTask({ title: '', description: '', status: 'In Progress' });
  };

  return (
    <div className="add-task">
      <h2>Add Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      />
      <select
        value={newTask.status}
        onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
      >
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button onClick={handleAddTask}>Add</button>
    </div>
  );
};

export default AddTask;
