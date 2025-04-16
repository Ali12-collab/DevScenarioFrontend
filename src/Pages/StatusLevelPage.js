import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStatusLevels, deleteStatusLevel } from '../Services/StatusLevelServices';
import Button from '../Components/Button';
import '../Styling/AppsPage.css';
import LoadingSpinner from '../Components/LoadingSpinner';

const StatusLevelPage = () => {
  const [statusLevels, setStatusLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStatusLevels();
      setStatusLevels(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this status level?');
  
    if (!confirm) return;
  
    try {
      await deleteStatusLevel(id);
      setStatusLevels(statusLevels.filter(item => item.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
  
      const errorMessage = error?.response?.data || 'Something went wrong while deleting.';
  
      if (
        errorMessage.includes('The DELETE statement conflicted') ||
        errorMessage.includes('entity changes')
      ) {
        alert('❌ Cannot delete this status level because it is used by one or more applications.');
      } else {
        alert(`Error: ${errorMessage}`);
      }
    }
  };
  
  const paginate = (data) => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const totalPages = Math.ceil(statusLevels.length / itemsPerPage);

  if (loading) return <LoadingSpinner fullPage />;
  return (
    <div className="apps-page-container fade-in">
      <h2>Status Levels</h2>

      <div className="action-buttons">
        <Link to="/status/create">
          <Button label="Create New Status Level" className="create-button" />
        </Link>
      </div>

      <table className="applications-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginate(statusLevels).map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.statusName}</td>
              <td>
                <Link to={`/status/edit/${item.id}`}>
                  <Button label="Edit" className="edit-button" />
                </Link>
                <Button label="Delete" onClick={() => handleDelete(item.id)} className="delete-button" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <Button label="Previous" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
        <span>Page {currentPage} of {totalPages}</span>
        <Button label="Next" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
      </div>
    </div>
  );
};

export default StatusLevelPage;