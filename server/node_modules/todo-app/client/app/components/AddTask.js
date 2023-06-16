"use client"
import React, { useState } from 'react';



const TodoForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  

  const handleAddTask = (e) => {
    e.preventDefault();
    if (title.trim() !== '' || description.trim() !== '') {
      onAddTask({title, description, status: 'active'});
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="flex flex-col" style={{padding: "5%"}}>
      <div className="mb-9" >
        <input
          className="input input-bordered w-full max-w-xs bg-slate-300"
          placeholder="title"
          value={title}
          onChange={handleTitleChange}
        />
        
      </div>
      
      <div className="mb-9">
        <textarea
          className="input input-bordered w-full max-w-xs bg-slate-300"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
          col = "5"
        />
      </div>
      <button className="btn btn-primary" onClick={handleAddTask}>
        ADD
      </button>
    </div>
  );
};





export default TodoForm;
