import TodoTable from "./components/TodoTable";
import TodoForm from "./components/AddTask";
import { useState } from "react";

export default function TodoApp({tasks}) {
    const [taskList, setTaskList] = useState([]);
  
    const handleAddTask = (task) => {
      setTaskList([...taskList, task]);
    };

  
    return (
      <div className='flex flex-row'>
        <div style={{width: '25%'}}>
          <TodoForm onAddTask={handleAddTask} />
        </div>
        <div style={{width: "65%", alignItems: "center", marginLeft: '8%'}}>
          <TodoTable tasks={taskList} />
        </div>        
      </div>
    );
  };