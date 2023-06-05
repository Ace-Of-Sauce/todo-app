import AddTask from "./AddTask";
import { BsFillCalendar2CheckFill } from "react-icons/bs";


const TodoTable = ({ tasks }) => {
    return (
      <div>
        <div className="overflow-x-auto">
          <table className="table text-white table-zebra">
            {/* head */}
            <thead className="bg-mygray rounded-t-lg text-zinc-50">
              <tr>
                <th >
                <BsFillCalendar2CheckFill size={20} color="white"/>
                </th>
                <th className="text-white">Title</th>
                <th className="text-white">Description</th>
                
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <th>
                    <input type="checkbox" className="checkbox " />
                  </th>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

export default TodoTable;
