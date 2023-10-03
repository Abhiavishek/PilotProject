// App.js
import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from './store/actions';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Task Management</h1>
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/add-task' element={<AddTask/>}/>
        <Route path='/task-list' element={ <TaskList tasks={tasks}/>}/>
      </Routes>
      {/* Add Task */}
      {/* <AddTask /> */}

      {/* Task List */}
     
      </BrowserRouter>
    </div>
  );
}

export default App;
