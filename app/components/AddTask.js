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

  

  const handleAddTask = () => {
    if (title.trim() !== '' || description.trim() !== '') {
      onAddTask({title, description});
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="flex flex-col" style={{border: "1px solid grey", padding: "5%"}}>
      <div className="mb-9" >
        <input
          className="input rounded-r w-full border"
          placeholder="title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      
      <div className="mb-9">
        <input
          className="input rounded-r w-full border"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <button className="btn rounded-r-lg rounded-l-none bg-mygray" onClick={handleAddTask}>
        ADD
      </button>
    </div>
  );
};





export default TodoForm;
