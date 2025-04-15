// trash.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SnippetCard from './snippetcard.js';
import './styles/trash.css';

const Trash = () => {
  const [deletedSnippets, setDeletedSnippets] = useState([]);

  useEffect(() => {
    const fetchDeletedSnippets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/snippets/deleted');
        setDeletedSnippets(response.data);
      } catch (error) {
        console.error('Error fetching deleted snippets:', error);
      }
    };
    fetchDeletedSnippets();
  }, []);

  const handleRestore = async (id) => {
    try {
      await axios.put(`http://localhost:5000/snippets/${id}/restore`);
      setDeletedSnippets(prev => prev.filter(snippet => snippet.id !== id));
    } catch (error) {
      console.error('Error restoring snippet:', error);
    }
  };

  const handlePermanentDelete = async (id) => {
    console.log('Trying to delete permanently:', id);
    alert(`Deleting snippet with ID: ${id}`);
  
    try {
      const response = await axios.delete(`http://localhost:5000/snippets/hard/${id}`);
      console.log('Delete response:', response.data); // <--- add this
      setDeletedSnippets(prev => prev.filter(snippet => snippet.id !== id));
    } catch (error) {
      console.error('Error permanently deleting snippet:', error);
    }
  };
  

  return (
    <div className="trash-container">
      <h2>Deleted Snippets</h2>
      {deletedSnippets.length > 0 ? (
        <div className="trash-grid">
          {deletedSnippets.map(snippet => (
            <div key={snippet.id} className="trash-item">
              <SnippetCard 
                snippet={snippet} 
                showActions={false} // Hides Edit/Delete buttons
              />
              <div className="trash-actions">
                <button 
                  onClick={() => handleRestore(snippet.id)}
                  className="restore-btn"
                >
                  Restore
                </button>
                <button 
                  onClick={() => handlePermanentDelete(snippet.id)}
                  className="permanent-delete-btn"
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No deleted snippets found.</p>
      )}
    </div>
  );
};

export default Trash;
