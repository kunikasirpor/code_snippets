import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateSnippet = ({ title, code, language, setTitle, setCode, setLanguage, editingId, fetchSnippets, resetForm }) => {
  const navigate = useNavigate();

  // List of programming languages
  const languages = ["JavaScript", "Python", "C++", "C", "Java", "Go", "PHP", "Ruby", "Swift", "Kotlin"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSnippet = { title, code, language };

    if (editingId) {
      axios.put(`http://localhost:5000/snippets/${editingId}`, newSnippet)
        .then(() => {
          fetchSnippets();
          resetForm();
          navigate("/snippets");
        })
        .catch(err => console.error("Error updating snippet:", err));
    } else {
      axios.post("http://localhost:5000/snippets", newSnippet)
        .then(() => {
          fetchSnippets();
          resetForm();
          navigate("/snippets");
        })
        .catch(err => console.error("Error creating snippet:", err));
    }
  };

  const handleCancel = () => {
    resetForm();  // Clear input fields
    navigate("/snippets");  // Redirect to snippets list
  };

  return (
    <div className="create-snippet">
      <h2>{editingId ? "Edit Snippet" : "Create a New Snippet"}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Snippet Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Enter your code here..." 
          value={code} 
          onChange={(e) => setCode(e.target.value)} 
          required 
        />
        
        {/* Dropdown for selecting language */}
        <select value={language} onChange={(e) => setLanguage(e.target.value)} required>
          <option value="" disabled>Select Language</option>
          {languages.map((lang, index) => (
            <option key={index} value={lang}>{lang}</option>
          ))}
        </select>

        <div className="button-container">
          <button type="submit">{editingId ? "Update Snippet" : "Create Snippet"}</button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateSnippet;
