import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import { BsFillCalendar2CheckFill } from "react-icons/bs";
 

const TodoTable = ({ todos }) => {
  const [tasks, setTasks] = useState(todos)
  const [showCompletePrompt, setShowCompletePrompt] = useState(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(()=>{
    setTasks(todos)
  }, [todos, tasks])


  async function handleCompletePrompt() {
    const todo = await fetch('http://localhost:4000/todos/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
      body: JSON.stringify(selectedItem)
    });

    const updatedTodo = await todo.json();

    if (updatedTodo) {
      console.log("Todo updated:", updatedTodo);

      setTasks(prev => {
        const index = prev.findIndex(t => t.title === updatedTodo.title);
        console.log('index', index)
        if (index !== -1) {
          const updatedTask = { ...prev[index], status: "completed" };
          const tempTasks = [...prev];
          tempTasks.splice(index, 1, updatedTask);
          return tempTasks;
        } else {
          return prev;
        }
      });
    }
  }


  function handleDeletePrompt() { 
    // Handle delete prompt logic
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
                <BsFillCalendar2CheckFill size={20} color="white" />
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
                      className="btn"
                      onClick={() => setShowCompletePrompt(true)}
                    >
                      ✅
                    </button>
                    
                    <button
                      className="btn"
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
                  className="btn"
                  onClick={async() => await handleCompletePrompt()}
                >

                  Yes
                </button>
                <button
                  className="btn"
                  onClick={() => setShowCompletePrompt(false)}
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
                  className="btn"
                  onClick={() => handleDeletePrompt}
                >

                  Yes
                </button>
                <button
                  className="btn"
                  onClick={() => setShowCompletePrompt(false)}
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
