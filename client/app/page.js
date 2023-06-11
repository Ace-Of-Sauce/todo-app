'use client'
import DarkModeSwitch from "./components/DarkModeSwitch";
import TodoApp from "./todoApp";
import { useEffect, useState, createContext } from "react";

export const ThemeContext = createContext(null);

export default function Home() {
 
  const [theme, setTheme] = useState({themeColor: 'light'})
  const [isDarkMode, setIsDarkMode] = useState(false);

  function onDarkModeSwitch(mode){
    setIsDarkMode(mode);
  }

  function getColor(mode){
    return mode === true ? '#333535' : '#FFFFFF'
  }

  


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
         <TodoApp/>
        </div>
      </div>
    </div>
  );
}
