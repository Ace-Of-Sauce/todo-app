import TodoTable from "./components/TodoTable";
import TodoForm from "./components/AddTask";
import { useEffect, useState } from "react";

export default function TodoApp() {
    
  
   

  const [taskList, setTaskList] = useState([]);
  const [todos, setTodos] = useState([]);
    const handleAddTask = async(task) => {
      //Check for duplicates
     const todo =  await fetch('http://localhost:4000/todos', {
       method: 'POST',
       body: JSON.stringify(task),
       headers: {
         'Content-Type': 'application/json',
         'Accept': '*/*'
       },
      })
      const savedTask = await todo.json();
      if(savedTask) setTaskList([...taskList, task]);
    };

  useEffect(async () => {
    async function getTodos() {
      try {
        const res = await fetch('http://localhost:4000/todos', {
          method: 'GET'
        });
        if (!res.ok) {
          throw new Error('Failed to get Todos from the Database');
        }
        const repo = await res.json();
        console.log("repo", repo)
        return repo
      } catch (error) {
        console.error('Error fetching data:', error);
        return null
      }
    }

    let tasks = await getTodos();
    console.log("tasks in page", tasks)
    setTaskList(tasks);
    setTodos(tasks)
  }, []);


    function handleSelect(e){
      let filterValue = e.target.value.toString();
      if(filterValue === 'All'){
        setTaskList(todos)
      }
      else{
        setTaskList(
          todos.filter(p => p.status === e.target.value)
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
              <option defaultValue={"All"}>All</option>
              <option value={"Active"}>Active</option>
              <option value={"Completed"}>Completed</option>
            </select>
          </div>
          
          <button className="btn btn-error">Delete</button>
        </div>
          {taskList? 
            <TodoTable todos={taskList} />
            :
            <div>No Todos To Display. Click On Add Todo To Add</div>
          }
        </div>        
      </div>
    );
  };