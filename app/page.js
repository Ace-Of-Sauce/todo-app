'use client'
import Image from "next/image";
import AddTask from "./components/AddTask";
import TodoTable from "./components/AddTask";
import Theme from "./components/Theme";


export default function Home() {
  return (
    <main className="max-w-4xl mx-auto mt-20 gap-5">
      
        <Theme style={{ position: "absolute", top: 0, left: 0, zIndex: 100 }} />

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-1 text-2xl font-bold my-5"></div>
        <div className="col-span-2 text-center my-5 flex flex-col gap-4">
          <h1 className=" text-2xl font-bold text-center">Todo list App</h1>
          <AddTask />
        </div>
      </div>
    </main>
  );
}
