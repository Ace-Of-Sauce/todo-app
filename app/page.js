'use client'
import DarkModeSwitch from "./components/DarkModeSwitch";
import TodoApp from "./todoApp";
import { useEffect, useState, createContext } from "react";

export const ThemeContext = createContext(null);

export default function Home() {
  const [todos, setTodos] = useState('');
  const [theme, setTheme] = useState({themeColor: 'light'})
  const [isDarkMode, setIsDarkMode] = useState(false);

  function onDarkModeSwitch(mode){
    setIsDarkMode(mode);
  }

  function getColor(mode){
    return mode === true ? '#333535' : '#FFFFFF'
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
  }, [isDarkMode]);


  console.log('dark', isDarkMode);
  console.log('get color', getColor(isDarkMode))
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <div className="flex flex-row justify-between" style={{ backgroundColor: isDarkMode ? "#0a0b0b" : "#FFFFF", paddingLeft: '3%', paddingRight: '3%' }}>
        <header> 
          <h1>Todo App</h1>       
        </header>
        <DarkModeSwitch onSwitch={onDarkModeSwitch}/>
      </div>
        
      <div style={{ paddingLeft: '3%', paddingRight: '3%', backgroundColor: getColor(isDarkMode), flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="col-span-1 text-2xl font-bold my-5"></div>
        <div className="col-span-2 text-center my-5 flex flex-col gap-4">
          <h1 className=" text-2xl font-bold text-center">Todo List</h1>
         <TodoApp />
        </div>
      </div>
    </div>
  );
}
