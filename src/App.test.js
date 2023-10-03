import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App'; // Import your App component

describe('App Component', () => {
  it('renders without errors', () => {
    render(<App />);
  });

  it('adds a new task when the "Add" button is clicked', () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    
    // Simulate user input and click the "Add" button
    const titleInput = getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'New Task' } });

    const descriptionInput = getByPlaceholderText('Description');
    fireEvent.change(descriptionInput, { target: { value: 'Task Description' } });

    const addButton = getByText('Add');
    fireEvent.click(addButton);

    // Assert that the new task is added
    expect(getByText('New Task')).toBeInTheDocument();
  });

  it('edits a task when the "Edit" button is clicked', () => {
    const { getByText, getByTestId } = render(<App />);
    
    // Find an existing task and click the "Edit" button
    const editButton = getByText('Edit');
    fireEvent.click(editButton);

    // Update the task details
    const editTitleInput = getByTestId('edit-title');
    fireEvent.change(editTitleInput, { target: { value: 'Edited Task' } });

    const editDescriptionInput = getByTestId('edit-description');
    fireEvent.change(editDescriptionInput, { target: { value: 'Edited Description' } });

    const updateButton = getByText('Update');
    fireEvent.click(updateButton);

    // Assert that the task is updated
    expect(getByText('Edited Task')).toBeInTheDocument();
  });

  it('deletes a task when the "Delete" button is clicked', () => {
    const { getByText } = render(<App />);
    
    // Find an existing task and click the "Delete" button
    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);

    // Assert that the task is deleted
    expect(deleteButton).not.toBeInTheDocument();
  });

  // Add more test cases for other components and functionality
});
