import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import { BsFillCalendar2CheckFill } from "react-icons/bs";
import { backendUrl } from "../page";
 

const TodoTable = ({ todos, onSelectTodo }) => {
  const [tasks, setTasks] = useState(todos)
  const [showCompletePrompt, setShowCompletePrompt] = useState(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null)
  const [todoList, setTodoList] = useState([])



  async function handleCompletePrompt() {
    const todo = await fetch(`/todos/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
      body: JSON.stringify(selectedItem)
    });

    const updatedTodo = await todo.json();

    if (updatedTodo) {
      setTasks(prev => {
        const updatedTasks = prev.map(task => {
          if (task.title === updatedTodo.title) {
            return { ...task, status: "completed" };
          }
          return task;
        });
        setTodoList(updatedTasks);
        return updatedTasks;
      });

      
    }
    setShowCompletePrompt(false);
  }

  useEffect(() => {
    setTasks(todos);
  }, [todos]);

  useEffect(() => {
    if (todoList.length > 0) {
      setTasks(todoList);
    }
  }, [todoList]);


  async function handleDeletePrompt() {
    const response = await fetch(`/todos/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
      body: JSON.stringify(selectedItem)
    });

    const jsonResponse = await response.json();
   
    if (jsonResponse.deletedCount > 0 ) {
      const newTodos = todos.filter(t => t.title !== selectedItem.title);
      setTasks(newTodos);
    }
    setShowDeletePrompt(false);
  }

  function handleCheckMarkSelect(){
    onSelectTodo(selectedItem)
  }

  function handleItemClick(item) {
    setSelectedItem(item);
    console.log("selected item: ", item)
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table text-white table-zebra">
          {/* head */}
          <thead className="bg-mygray rounded-t-lg text-zinc-50">
            <tr>
              <th>
                <BsFillCalendar2CheckFill size={20} color="white" onSelect={handleCheckMarkSelect}/>
              </th>
              <th className="text-white">Title</th>
              <th className="text-white">Description</th>
              <th className="text-white">Status</th>
              <th className="text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} onClick={() => handleItemClick(task)}>
                <th>
                  <input type="checkbox" className="checkbox " />
                </th>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      position: "relative",
                    }}
                  >
                    {/* Open the modal using state */}
                    <button
                      className="btn btn-outline btn-success"
                      onClick={() => setShowCompletePrompt(true)}
                    >
                      ✅
                    </button>
                    
                    <button
                      className="btn btn-outline btn-error"
                      style={{marginLeft: "15px"}}
                      onClick={() => setShowDeletePrompt(true)}
                    >
                      ❌
                    </button>
                   
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showCompletePrompt && (
          <dialog open className="modal">
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-lg">Please Confirm</h3>
              <p className="py-4">
                Are You Sure You Want To Mark Todo As Completed?
              </p>
              <div className="modal-action">
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn btn-success"
                  onClick={async() => await handleCompletePrompt()}
                >

                  Yes
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => {
                    setShowCompletePrompt(false);
                    setShowDeletePrompt(false);
                  }}
                >

                  Cancel
                </button>
              </div>
            </form>
          </dialog>


        )}
        {showDeletePrompt && (
          <dialog open className="modal">
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-lg">Please Confirm</h3>
              <p className="py-4">
                Are You Sure You Want To Delete This Todo?
              </p>
              <div className="modal-action">
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn btn-success"
                  onClick={async() => await handleDeletePrompt()}
                >

                  Yes
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => {
                    setShowCompletePrompt(false);
                    setShowDeletePrompt(false);
                  }}
                >

                  Cancel
                </button>
              </div>
            </form>
          </dialog>


        )}
      </div>
    </div>
  );
};

export default TodoTable;
