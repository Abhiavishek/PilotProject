import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/add-task">Add Task</Link>
        </li>
        <li className="navbar-item">
          <Link to="/task-list">Task List</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
