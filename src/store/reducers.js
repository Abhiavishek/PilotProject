const initialState = {
  tasks: [],
  error: null,
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TASKS_SUCCESS':
      return { ...state, tasks: action.payload, error: null };
    case 'FETCH_TASKS_FAILURE':
      return { ...state, tasks: [], error: action.payload };
    case 'ADD_TASK_SUCCESS':
      return { ...state, tasks: [...state.tasks, action.payload], error: null };
    case 'ADD_TASK_FAILURE':
      return { ...state, error: action.payload };
    case 'UPDATE_TASK_SUCCESS':
      const updatedTasks = state.tasks.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
      return { ...state, tasks: updatedTasks, error: null };
    case 'UPDATE_TASK_FAILURE':
      return { ...state, error: action.payload };
    case 'DELETE_TASK_SUCCESS':
      const filteredTasks = state.tasks.filter((task) => task._id !== action.payload);
      return { ...state, tasks: filteredTasks, error: null };
    case 'DELETE_TASK_FAILURE':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default tasksReducer;