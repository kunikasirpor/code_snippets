// snippetcard.js
import React from 'react';
import './styles/snippetcard.css';

const SnippetCard = ({ snippet, onEdit = () => {}, onDelete = () => {}, showActions = true }) => {
  return (
    <div className="snippet-card">
      <div className="snippet-header">
        <h3>{snippet.title}</h3>
        <span className="language-badge">{snippet.language}</span>
      </div>
      <pre className="snippet-code">
        <code>{snippet.code}</code>
      </pre>
      {showActions && (
        <div className="snippet-actions">
          <button onClick={() => onEdit(snippet)} className="edit-btn">
            Edit
          </button>
          <button onClick={() => onDelete(snippet.id)} className="delete-btn">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default SnippetCard;
