import express from 'express';
import {createTodo, getTodo , updateTodo, deleteTodo} from "../controller/todo.controller.js"
const router = express.Router();

// Define the routes
router.post('/create-todo', createTodo)
router.put('/update-todo', updateTodo) // PUT method is preffered becoz it is idempotent that means if we perform same operations multiple times then the result remians same where as in POST is not idempotent so performing mutiple opetions creates different results
router.get('/get-todo', getTodo);
router.delete('/delete-todo', deleteTodo)

export default router;
