import axios from 'axios';

export const fetchTasks = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/api/tasks'); 
    const tasks = response.data;
    dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: tasks });
  } catch (error) {
    dispatch({ type: 'FETCH_TASKS_FAILURE', payload: error });
  }
};

export const addTask = (newTask) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/api/tasks', newTask); 
    const task = response.data;
    dispatch({ type: 'ADD_TASK_SUCCESS', payload: task });
  } catch (error) {
    dispatch({ type: 'ADD_TASK_FAILURE', payload: error });
  }
};

export const updateTask = (editedTask) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:3001/api/tasks/${editedTask._id}`, editedTask); 
    const updatedTask = response.data;
    dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: updatedTask });
  } catch (error) {
    dispatch({ type: 'UPDATE_TASK_FAILURE', payload: error });
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3001/api/tasks/${taskId}`); 
    dispatch({ type: 'DELETE_TASK_SUCCESS', payload: taskId });
  } catch (error) {
    dispatch({ type: 'DELETE_TASK_FAILURE', payload: error });
  }
};