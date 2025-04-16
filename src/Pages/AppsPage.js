import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getApplications, deleteApplication } from '../Services/ApplicationServices';
import Button from '../Components/Button';  // Import the reusable Button component
import '../Styling/AppsPage.css';
import EditApplication from '../Pages/EditApplication'
import LoadingSpinner from '../Components/LoadingSpinner';
import SearchBar from '../Components/SearchBar';


// Define the SVG Icons for all actions
const DeleteIcon = (
  <img src={require('../Assets/trash-svgrepo-com.svg').default} alt="Delete" width="16" height="16" />
);

const SendIcon = (
  <img src={require('../Assets/send-svgrepo-com.svg').default} alt="Send" width="16" height="16" />
);

const EditIcon = (
  <img src={require('../Assets/edit-2-svgrepo-com.svg').default} alt="Edit" width="16" height="16" />
);

const TableViewIcon = (
  <img src={require('../Assets/table-svgrepo-com.svg').default} alt="Table View" width="16" height="16" />
);

const CardViewIcon = (
  <img src={require('../Assets/card-view-svgrepo-com.svg').default} alt="Card View" width="16" height="16" />
);

const CreateIcon = (
  <img src={require('../Assets/create-svgrepo-com.svg').default} alt="Create" width="16" height="16" />
);

const AppsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewType, setViewType] = useState('table');  // Default to table view
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;  // Limit to 10 items per page

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplications();
        setApplications(data);
      } catch (err) {
        setError('Failed to fetch applications');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this application?');
    if (confirmDelete) {
      try {
        await deleteApplication(id);
        setApplications(applications.filter(app => app.id !== id));
      } catch (err) {
        console.error('Error deleting application:', err);
      }
    }
  };

  const paginate = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(applications.length / itemsPerPage);

  if (loading) return <LoadingSpinner fullPage />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="apps-page-container fade-in">
      <h2 className="page-title">Applications</h2>

      {/* Action Buttons */}
      <div className="action-buttons">
        <Link to="/create">
          <Button label="Create New Application" svgLogo={CreateIcon} className="create-button" />
        </Link>
      </div>

      {/* View Toggle */}
      <div className="view-toggle">
        <Button label="Table View" svgLogo={TableViewIcon} onClick={() => setViewType('table')} className={viewType === 'table' ? 'active' : ''} />
        <Button label="Card View" svgLogo={CardViewIcon} onClick={() => setViewType('card')} className={viewType === 'card' ? 'active' : ''} />
      </div>

      {/* Table View */}
      {viewType === 'table' ? (
        <table className="applications-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Location</th>
              <th>Status</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginate(applications).map(app => (
              <tr key={app.id}>
                <td>{app.projectName}</td>
                <td>{app.projectLocation}</td>
                <td>{app.appStatus}</td>
                <td>${app.projectValue}</td>
                <td>
               
                <Link to={`/edit/${app.id}`}>
                <Button label="Edit" svgLogo={EditIcon} className="edit-button" />
                </Link>

                
                  <Button label="Delete" svgLogo={DeleteIcon} onClick={() => handleDelete(app.id)} className="delete-button" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="applications-grid">
          {paginate(applications).map(app => (
            <div key={app.id} className="application-card">
              <h3 className="application-title">{app.projectName}</h3>
              <p><strong>Location:</strong> {app.projectLocation}</p>
              <p><strong>Status:</strong> {app.appStatus}</p>
              <p><strong>Value:</strong> ${app.projectValue}</p>
              <div className="application-actions">
                <Link to={`/edit/${app.id}`} >
                  <Button className={"edit-button"} label="Edit" svgLogo={EditIcon} />
                </Link>
                <Button label="Delete" svgLogo={DeleteIcon} onClick={() => handleDelete(app.id)} className="delete-button" />
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Pagination */}
      <div className="pagination">
        <Button label="Previous" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="pagination-btn" />
        <span>Page {currentPage} of {totalPages}</span>
        <Button label="Next" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="pagination-btn" />
      </div>
    </div>
  );
};

export default AppsPage;
