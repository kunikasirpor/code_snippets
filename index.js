import express from "express";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
const port = 3002;

// Use routes
app.use("/api", userRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
