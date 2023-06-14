'use client'
import DarkModeSwitch from "./components/DarkModeSwitch";
import TodoApp from "./todoApp";
import { useEffect, useState, createContext } from "react";

export const ThemeContext = createContext(null);
const frontendUrl = window.location.href;
const backendPort = 4000;
export const backendUrl = frontendUrl.split(":")[0] + ":" + frontendUrl.split(":")[1] + ":" + backendPort;
export default function Home() {


 
  const [theme, setTheme] = useState({themeColor: 'light'})
  const [isDarkMode, setIsDarkMode] = useState(false);

  function onDarkModeSwitch(mode){
    setIsDarkMode(mode);
  }

  function getColor(mode, type){
    switch(type){
      case 'body':
        return mode === true ? '#333535' : '#FFFFFF';
      case 'header':
        return mode === true ? '#071e26' : '#e9f5f9'
    }
    
  }

  


  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <div className="flex flex-row justify-between" style={{ backgroundColor: getColor(isDarkMode, 'header'), paddingLeft: '3%', paddingRight: '3%' }}>
        <header> 
          {isDarkMode ? <h1 style={{ color: "white", fontFamily: 'monospace', fontSize: '20px' }}>Todo App</h1 > : <h1 style={{ color: "black", fontFamily: 'monospace', fontSize: '20px' }}>Todo App</h1> }       
        </header>
        <DarkModeSwitch onSwitch={onDarkModeSwitch}/>
      </div>
        
      <div style={{ paddingLeft: '3%', paddingRight: '3%', backgroundColor: getColor(isDarkMode, 'body'), flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="col-span-1 text-2xl font-bold my-5"></div>
        <div className="col-span-2 text-center my-5 flex flex-col gap-4">
          {isDarkMode ? <h1 className=" text-2xl font-bold text-center" style={{ color: "white", fontSize: '30px' }}>Todo List</h1> : <h1 className=" text-2xl font-bold text-center" style={{ color: "black", fontSize: '30px' }}>Todo List</h1>}
         <TodoApp/>
        </div>
      </div>
    </div>
  );
}


