import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SnippetCard from '../components/snippetcard';

const TrashPage = () => {
  const [deletedSnippets, setDeletedSnippets] = useState([]);

  useEffect(() => {
    fetchDeletedSnippets();
  }, []);

  const fetchDeletedSnippets = () => {
    axios.get('http://localhost:5000/snippets/deleted')
      .then(res => setDeletedSnippets(res.data))
      .catch(err => console.error('Error fetching deleted snippets:', err));
  };

  const handleRestore = (id) => {
    axios.put(`http://localhost:5000/snippets/${id}/restore`)
      .then(() => fetchDeletedSnippets())
      .catch(err => console.error('Error restoring snippet:', err));
  };

  const handlePermanentDelete = (id) => {
    axios.delete(`http://localhost:5000/snippets/${id}/permanent`)
      .then(() => fetchDeletedSnippets())
      .catch(err => console.error('Error permanently deleting snippet:', err));
  };

  return (
    <div className="trash-container">
      <h2>Deleted Snippets</h2>
      <p className="trash-description">
        Snippets in trash will be permanently deleted after 30 days.
      </p>

      <div className="snippets-grid">
        {deletedSnippets.length > 0 ? (
          deletedSnippets.map(snippet => (
            <div key={snippet.id} className="snippet-card deleted">
              <SnippetCard snippet={snippet} />
              <div className="trash-actions">
                <button 
                  onClick={() => handleRestore(snippet.id)}
                  className="btn primary"
                >
                  Restore
                </button>
                <button
                  onClick={() => handlePermanentDelete(snippet.id)}
                  className="btn danger"
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>Your trash is empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrashPage;