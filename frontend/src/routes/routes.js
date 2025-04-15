import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddTodo from "../components/AddTodo";
import UpdateTodo from "../components/UpdateTodo";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/add-todo" element={<AddTodo />} />
        <Route path="/update-todo" element={<UpdateTodo />} />
        
      </Routes>
    </Router>
  );
};

export default AppRoutes;   