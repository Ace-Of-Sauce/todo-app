import TodoTable from "./components/TodoTable";
import TodoForm from "./components/AddTask";
import { useState } from "react";

export default function TodoApp() {
    
  
    const tasks = [
      {
      title: "fdjnvfldksnb",
      description: "fdsnoksdjlvn",
      status: "Completed"
    },
    {
      title: "fdjnvfldksnb",
      description: "fdsnoksdjlvn",
      status: "Active"
    },
    {
      title: "fdjnvfldksnb",
      description: "fdsnoksdjlvn",
      status: "Completed"
    },
    {
      title: "fdjnvfldksnb",
      description: "fdsnoksdjlvn",
      status: "Completed"
    },
    {
      title: "fdjnvfldksnb",
      description: "fdsnoksdjlvn",
      status: "Active"
    }

  ]

  const [taskList, setTaskList] = useState(tasks);
    const handleAddTask = (task) => {
      setTaskList([...taskList, task]);
    };

    function handleSelect(e){
      let filterValue = e.target.value.toString();
      if(filterValue === 'All'){
        setTaskList(tasks)
      }
      else{
        setTaskList( 
          tasks.filter(p => p.status === e.target.value)
        )
      }   
    }

  
    return (
      <div className='flex flex-row'>
       
      <div style={{width: "100%", alignItems: "center", marginLeft: '8%'}}>
        <div className="navbar" style={{backgroundColor: "#c2c2c2", marginBottom: "5px", flexDirection: 'row', justifyContent: 'space-between'}}>
          <div>

            <button className="btn" style= {{marginRight: '10px'}} onClick={() => window.my_modal_3.showModal()}>ADD TODO</button>
            <dialog id="my_modal_3" className="modal">
              <form method="dialog" className="modal-box">
                <button
                  htmlFor="my-modal-3"
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => window.my_modal_3.close()}
                >
                  ✕
                </button>
                <TodoForm onAddTask={handleAddTask} />
              </form>
            </dialog>

            <select className="select select-bordered max-w-xs" onChange={handleSelect}>
              <option selected>All</option>
              <option>Active</option>
              <option>Completed</option>
            </select>
          </div>
          
          <button className="btn btn-error">Delete</button>
        </div>
          <TodoTable tasks={taskList} />
        </div>        
      </div>
    );
  };