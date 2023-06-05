'use client'
import Theme from "./components/Theme";
import TodoApp from "./todoApp";
import { useEffect, useState } from "react";



export default function Home() {
  const [todos, setTodos] = useState('');
  const [themeColor, setThemeColor] = useState('')

  const onChangeTheme = (color)=>{
    console.log("color", color)
    setThemeColor(color);
  }

  useEffect(()=>{
    async function getTodos(){
      try {
        const res = await fetch('https://api.github.com/repos/vercel/next.js');
        if (!res.ok) {
          throw new Error('Failed to fetch data from the GitHub API');
        }
        const repo = await res.json();
        return repo
      } catch (error) {
        console.error('Error fetching data:', error);
        return null
      }
    }

    let tasks = getTodos();
    setTodos({...tasks});
  }, [])


  console.log('todos', todos);
  return (
    <main className="flex flex-col " style={{backgroundColor: themeColor}}>
      <div className="flex flex-row justify-between" style={{ backgroundColor: 'gray', paddingLeft: '3%', paddingRight: '3%' }}>
        <header>
          <h1>Todo App</h1>       
        </header>
        <Theme onChangeTheme={onChangeTheme}/>
      </div>
        
      <div className="flex flex-col" style={{ paddingLeft: '3%', paddingRight: '3%' }}>
        <div className="col-span-1 text-2xl font-bold my-5"></div>
        <div className="col-span-2 text-center my-5 flex flex-col gap-4">
          <h1 className=" text-2xl font-bold text-center">Todo List</h1>
         <TodoApp />
        </div>
      </div>
    </main>
  );
}
