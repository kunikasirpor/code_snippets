import React from "react";
import AddTodo from "./components/AddTodo";
import AppRoutes from "./routes/routes";
import Students from "./components/students";

function App() {
  return (
    <>
    <AppRoutes />
    <Students name = "Hello" age ={32}/>
    <Students name = "Hello"/>  
    <Students age = {30}/>
    <AddTodo/>
    </>
  );
}

export default App;

