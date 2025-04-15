import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SnippetCard from '../components/snippetcard.js';

const Snippets = ({ snippets = [], handleEdit, handleDelete, searchQuery, setSearchQuery }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const snippetsPerPage = 9;

  // Filter the snippets based on the search query
  const filteredSnippets = snippets.filter(snippet =>
    snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    snippet.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
    snippet.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Log the filtered snippets nicely
  console.log('Filtered Snippets:', JSON.stringify(filteredSnippets, null, 2));

  // Pagination logic
  const totalPages = Math.ceil(filteredSnippets.length / snippetsPerPage);
  const startIndex = (currentPage - 1) * snippetsPerPage;
  const currentSnippets = filteredSnippets.slice(startIndex, startIndex + snippetsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Create pagination buttons
  const getPaginationButtons = () => {
    const pages = [];
    const maxVisible = 3;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= maxVisible) {
        pages.push(...[1, 2, 3, 4, '...', totalPages]);
      } else if (currentPage >= totalPages - maxVisible + 1) {
        pages.push(...[1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]);
      } else {
        pages.push(...[1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]);
      }
    }

    return pages;
  };

  return (
    <div className="snippets-page">
      <div className="snippets-header">
        <h1>Your Code Snippets</h1>
        <div className="search-add-container">
          <input
            type="text"
            placeholder="Search snippets..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
          <Link to="/create" className="add-new-btn">+ Add New</Link>
          <Link to="/" className="home-link">🏠 Home</Link>
        </div>
      </div>

      <div className="snippets-grid">
        {currentSnippets.length > 0 ? (
          currentSnippets.map(snippet => {
            console.log('Rendering Snippet:', snippet); // See each snippet clearly
            return (
              <SnippetCard
                key={snippet.id}
                snippet={snippet}
                onEdit={() => handleEdit(snippet)}
                onDelete={() => handleDelete(snippet.id)}
              />
            );
          })
        ) : (
          <div className="empty-state">
            <p>No snippets found. Create your first snippet!</p>
            <Link to="/create" className="add-new-btn">Create Snippet</Link>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>‹ Previous</button>
          {getPaginationButtons().map((page, index) =>
            page === '...' ? (
              <span key={index} className="dots">...</span>
            ) : (
              <button
                key={index}
                onClick={() => goToPage(page)}
                className={page === currentPage ? 'active' : ''}
              >
                {page}
              </button>
            )
          )}
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next ›</button>
        </div>
      )}
    </div>
  );
};

export default Snippets;
