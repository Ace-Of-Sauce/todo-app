"use client"
import React, { useState } from 'react';
import TodoTable from './TodoTable';
const AddTask = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleInputChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleAddTask = () => {
    if (taskName.trim() !== '') {
      onAddTask(taskName);
      setTaskName('');
    }
  };

  return (
    <div className="flex">
      <input
        className="input rounded-r-none w-full"
        placeholder="Add todo"
        value={taskName}
        onChange={handleInputChange}
      />
      <button className="btn join-item rounded-r-lg rounded-l-none bg-mygray" onClick={handleAddTask}>
        add new
      </button>
    </div>
  );
};



const TodoApp = () => {
  const [taskList, setTaskList] = useState([]);

  const handleAddTask = (taskName) => {
    setTaskList([...taskList, taskName]);
  };

  return (
    <div className='grid gap-5'>
    <AddTask onAddTask={handleAddTask} />
    <TodoTable tasks={taskList} />
    </div>
  );
};

export default TodoApp;
