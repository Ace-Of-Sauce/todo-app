const AddTask = () => {
  return (
    <div className="grid gap-4">
    <button className="btn btn-neutral w-full">Add New Task</button>
      <div className="flex">
        <input className="input rounded-r-none input-bordered w-full" placeholder="Add Task" />
        <button className="btn btn-primary join-item rounded-l-none rounded-r-lg ">Add New Item</button>
      </div>
    </div>
  );
};

export default AddTask;
