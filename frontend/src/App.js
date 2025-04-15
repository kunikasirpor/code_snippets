import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Sidebar from "./components/sidebar";
import Welcome from "./pages/welcome";
import CreateSnippet from "./pages/createsnippets";
import Snippets from "./pages/viewsnippets";
import TrashPage from "./pages/trashpage";
import LoginPage from "./pages/login";
import PrivateRoute from "./components/PrivateRoute";
import Cookies from 'js-cookie';

function App() {
  const [snippets, setSnippets] = useState([]);
  const [deletedSnippets, setDeletedSnippets] = useState([]);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchSnippets();
    fetchDeletedSnippets();
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const fetchSnippets = () => {
    axios.get("http://localhost:5000/snippets")
      .then((res) => {
        console.log("Fetched snippets:", res.data);
        // Fix: Ensure data is an array
        if (Array.isArray(res.data)) {
          setSnippets(res.data);
        } else if (Array.isArray(res.data.snippets)) {
          setSnippets(res.data.snippets);
        } else {
          console.error("Invalid snippets format:", res.data);
          setSnippets([]); // fallback to empty array
        }
      })
      .catch((err) => console.error("Error fetching snippets:", err));
  };
  

  const fetchDeletedSnippets = () => {
    const storedTrash = JSON.parse(localStorage.getItem("deletedSnippets")) || [];
    setDeletedSnippets(storedTrash);
  };

  const handleEdit = (snippet) => {
    setEditingSnippet(snippet);
    setTitle(snippet.title);
    setCode(snippet.code);
    setLanguage(snippet.language);
    navigate('/create');
  };

  const handleDelete = (id) => {
    const deletedSnippet = snippets.find(snippet => snippet.id === id);
    if (deletedSnippet) {
      const updatedTrash = [...deletedSnippets, deletedSnippet];
      setDeletedSnippets(updatedTrash);
      localStorage.setItem("deletedSnippets", JSON.stringify(updatedTrash));
    }

    axios.delete(`http://localhost:5000/snippets/${id}`)
      .then(() => fetchSnippets())
      .catch((err) => console.error("Error deleting snippet:", err));
  };

  const resetForm = () => {
    setTitle("");
    setCode("");
    setLanguage("");
    setEditingSnippet(null);
  };

  const filteredSnippets = snippets.filter(snippet =>
    snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    snippet.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
    snippet.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isLoggedIn = Cookies.get("isLoggedIn") === "true";
  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      {isLoggedIn && <Sidebar toggleDarkMode={() => setDarkMode(!darkMode)} darkMode={darkMode} />}
      <div className="main-content">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <PrivateRoute>
              <Welcome snippets={snippets} />
            </PrivateRoute>
          } />
          <Route path="/create" element={
            <PrivateRoute>
              <CreateSnippet 
                title={title}
                setTitle={setTitle}
                code={code}
                setCode={setCode}
                language={language}
                setLanguage={setLanguage}
                editingId={editingSnippet?.id || null}
                fetchSnippets={fetchSnippets}
                resetForm={resetForm}
              />
            </PrivateRoute>
          } />
          <Route path="/snippets" element={
            <PrivateRoute>
              <Snippets 
                snippets={filteredSnippets} 
                handleEdit={handleEdit} 
                handleDelete={handleDelete} 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery}
              />
            </PrivateRoute>
          } />
          <Route path="/trash" element={
            <PrivateRoute>
              <TrashPage 
                deletedSnippets={deletedSnippets} 
                setDeletedSnippets={setDeletedSnippets}
              />
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
