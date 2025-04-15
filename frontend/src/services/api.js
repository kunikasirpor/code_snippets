import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3002/api",
});

export const createTodo = (name) => {
  return api.post("/create-todo", { name });
};