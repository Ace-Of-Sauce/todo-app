import TodoTable from "./components/TodoTable";
import TodoForm from "./components/AddTask";
import { useEffect, useState } from "react";
import { backendUrl } from "./page";

export default function TodoApp() {
  const [taskList, setTaskList] = useState([]);
  const [showDeleteCompletePrompt, setShowDeleteCompletePrompt] = useState(false);
  const [showDeleteSelectedPromt, setDeleteSelectedPrompt] = useState(false)
  const [todos, setTodos] = useState([]);
  const [nonSelectedPrompt, setShowNonSelectedPrompt] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState([]);

  const selectedTodosArray = [];


    const handleAddTask = async(task) => {
      //Check for duplicates
     const todo =  await fetch(`${backendUrl}/todos`, {
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
        const res = await fetch(`${backendUrl}/todos`, {
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
        // Filter the todos based on the selected value
        let filteredList = todos.filter(
          (task) => task.status.toLowerCase() === filterValue.toLowerCase()
        );
        setTaskList(filteredList);
      }  
       
    }

  async function handleDeleteCompleted(){

    setShowDeleteCompletePrompt(false)
  }

  async function deleteSelectedTodos(){

  }
  async function handleDeleteSelected(){
    console.log('length:', selectedTodos.length)
    if (selectedTodos.length === 0) {
      setShowNonSelectedPrompt(true)
    }
    else{
      setDeleteSelectedPrompt(true);

    }

    setDeleteSelectedPrompt(false)
  }

  function onSelectTodo(todo){
    selectedTodosArray.push(todo);
    console.log('current todo:', todo)
    setSelectedTodos(selectedTodosArray)
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
          
          <div>
              <button className="btn btn-error" onClick={async()=> await handleDeleteSelected()} style={{marginRight: '5px'}}>Delete Selected</button>
              <button className="btn btn-error" onClick={()=>setShowDeleteCompletePrompt(true)}>Delete Completed</button>
          </div>
          
        </div>
          {taskList? 
            <TodoTable todos={taskList} onSelectTodo={onSelectTodo}/>
            :
            <div>No Todos To Display. Click On Add Todo To Add</div>
          }
        </div>
        {showDeleteSelectedPromt && (
          <dialog open className="modal">
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-lg">Please Confirm</h3>
              <p className="py-4">
                Are You Sure You Want To Delete Selected Todos?
              </p>
              <div className="modal-action">
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn btn-success"
                  onClick={async () => await deleteSelectedTodos()}
                >

                  Yes
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => {
                    setDeleteSelectedPrompt(false);
                    setShowDeleteCompletePrompt(false);
                  }}
                >

                  Cancel
                </button>
              </div>
            </form>
          </dialog>


        )}
        {showDeleteCompletePrompt && (
          <dialog open className="modal">
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-lg">Please Confirm</h3>
              <p className="py-4">
                Are You Sure You Want To Delete All Completed Todos?
              </p>
              <div className="modal-action">
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn btn-success"
                  onClick={async () => await handleDeleteCompleted()}
                >

                  Yes
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => {
                    setDeleteSelectedPrompt(false);
                    setShowDeleteCompletePrompt(false);
                  }}
                >

                  Cancel
                </button>
              </div>
            </form>
          </dialog>


        )}     
        {nonSelectedPrompt && (
          <dialog open className="modal">
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-lg">Please Confirm</h3>
              <p className="py-4">
                Please Select A Todo To continue
              </p>
              <div className="modal-action">
                {/* if there is a button in form, it will close the modal */}
                
                <button
                  className="btn btn-error"
                  onClick={() => {
                    setShowNonSelectedPrompt(false)
                  }}
                >

                  Close
                </button>
              </div>
            </form>
          </dialog>


        )}

      </div>
    );
  };