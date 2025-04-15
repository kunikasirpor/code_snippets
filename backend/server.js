import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "snippets_db",
});

db.connect((err) => {
  if (err) {
    console.error(" MySQL Connection Error:", err);
    return;
  }
  console.log(" MySQL Connected!");
});

// Routes
app.use("/api/auth", authRoutes); // For user auth (login/register)

// ----- SNIPPETS ROUTES -----

// Get paginated active snippets
app.get("/snippets", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 9;
  const offset = (page - 1) * limit;

  const getSnippetsQuery = `
    SELECT * FROM snippets 
    WHERE status = 'active'  
    LIMIT ? OFFSET ?
  `;
  const countQuery = `SELECT COUNT(*) AS total FROM snippets WHERE status = 'active'`;

  db.query(getSnippetsQuery, [limit, offset], (err, snippetResults) => {
    if (err) {
      console.error("Error fetching snippets:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    db.query(countQuery, (err, countResult) => {
      if (err) {
        console.error("Error counting snippets:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      const totalSnippets = countResult[0].total;
      const totalPages = Math.ceil(totalSnippets / limit);

      res.status(200).json({
        snippets: snippetResults,
        currentPage: page,
        totalPages: totalPages,
      });
    });
  });
});

// Get deleted (trashed) snippets
app.get("/snippets/deleted", (req, res) => {
  db.query("SELECT * FROM snippets WHERE status = 'deleted'", (err, results) => {
    if (err) {
      console.error("Error fetching deleted snippets:", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(results);
    }
  });
});

// Add a new snippet
app.post("/snippets", async (req, res) => {
  const { title, code, language } = req.body;
  try {
    const [result] = await db
      .promise()
      .query("INSERT INTO snippets (title, code, language) VALUES (?, ?, ?)", [
        title,
        code,
        language,
      ]);
    res.json({ message: "Snippet added!", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a snippet
app.put("/snippets/:id", (req, res) => {
  const { id } = req.params;
  const { title, code, language } = req.body;
  const sql = "UPDATE snippets SET title = ?, code = ?, language = ? WHERE id = ?";

  db.query(sql, [title, code, language, id], (err, result) => {
    if (err) {
      console.error("Error updating snippet:", err);
      return res.status(500).send(err);
    }
    res.json({ message: "Snippet updated!" });
  });
});

// Soft delete (move to trash)
app.delete("/snippets/:id", (req, res) => {
  const snippetId = req.params.id;
  db.query("UPDATE snippets SET status = 'deleted' WHERE id = ?", [snippetId], (err, result) => {
    if (err) {
      console.error("Error soft deleting snippet:", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json({ message: "Snippet soft deleted successfully" });
    }
  });
});

// Restore a deleted snippet
app.put("/snippets/:id/restore", (req, res) => {
  const snippetId = req.params.id;
  db.query("UPDATE snippets SET status = 'active' WHERE id = ?", [snippetId], (err, result) => {
    if (err) {
      console.error("Error restoring snippet:", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json({ message: "Snippet restored successfully" });
    }
  });
});

// Hard delete (permanently delete)
app.delete("/snippets/hard/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`🗑️ Incoming DELETE /snippets/hard/${id}`);

  try {
    await db.query("DELETE FROM snippets WHERE id = ?", [id]);
    res.status(200).send({ message: "Snippet deleted permanently" });
  } catch (error) {
    console.error("Error permanently deleting snippet:", error);
    res.status(500).send({ error: "Failed to delete snippet permanently" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
