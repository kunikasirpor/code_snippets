import React, { useState } from "react";
import { createTodo } from "../services/api";

function AddTodo() {
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createTodo(name);
      alert(`Response from API: ${response.data.message}`);
    } catch (error) {
      console.error("Error submitting name:", error);
      alert(error);
    }
    setName("");
  };

  return (
    <>
      <div>
        <h1> Add Todo</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default AddTodo;