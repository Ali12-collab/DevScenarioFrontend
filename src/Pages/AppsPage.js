import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getApplications, deleteApplication } from '../Services/ApplicationServices';
import Button from '../Components/Button';
import '../Styling/AppsPage.css';
import EditApplication from '../Pages/EditApplication';
import LoadingSpinner from '../Components/LoadingSpinner';
import SearchBar from '../Components/SearchBar';
import EntityDetailModal from '../Components/EntityDetailModal';
import Swal from 'sweetalert2';

const DeleteIcon = (
  <img src={require('../Assets/trash-svgrepo-com.svg').default} alt="Delete" width="16" height="16" />
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

const applicationFields = [
  { key: 'projectName', label: 'Project Name' },
  { key: 'projectLocation', label: 'Location' },
  { key: 'appStatus', label: 'Status' },
  { key: 'projectValue', label: 'Value' },
  { key: 'openDt', label: 'Open Date' },
  { key: 'startDt', label: 'Start Date' },
  { key: 'completedDt', label: 'Completed Date' },
  { key: 'statusId', label: 'Status ID' },
  { key: 'notes', label: 'Notes' }
];

const AppsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewType, setViewType] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplications();
        setApplications(data);
        setFilteredApplications(data);
      } catch (err) {
        setError('Failed to fetch applications');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleSearch = (term) => {
    if (!term) return setFilteredApplications(applications);
    const lower = term.toLowerCase();
    const results = applications.filter((a) =>
      a.projectName?.toLowerCase().includes(lower) ||
      a.projectLocation?.toLowerCase().includes(lower)
    );
    setFilteredApplications(results);
  };

  const handleDelete = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (isConfirmed) {
      try {
        await deleteApplication(id);
        const updated = applications.filter(app => app.id !== id);
        setApplications(updated);
        setFilteredApplications(updated);
        setSelectedApp(null);
        Swal.fire('Deleted!', 'The application has been deleted.', 'success');
      } catch (err) {
        console.error('Error deleting application:', err);
        Swal.fire('Error', 'Something went wrong while deleting.', 'error');
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

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  if (loading) return <LoadingSpinner fullPage />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="apps-page-container fade-in">
      <h2 className="page-title">Applications</h2>

      <SearchBar
        data={applications}
        searchFields={['projectName', 'projectLocation']}
        onSearch={handleSearch}
        placeholder="Search Applications by Name or Location..."
      />

      <div className="action-buttons">
        <Link to="/create">
          <Button label="Create New Application" svgLogo={CreateIcon} className="create-button" />
        </Link>
      </div>

      <div className="view-toggle">
        <Button label="Table View" svgLogo={TableViewIcon} onClick={() => setViewType('table')} className={viewType === 'table' ? 'active' : ''} />
        <Button label="Card View" svgLogo={CardViewIcon} onClick={() => setViewType('card')} className={viewType === 'card' ? 'active' : ''} />
      </div>

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
            {paginate(filteredApplications).map(app => (
              <tr key={app.id} onClick={() => setSelectedApp(app)} className="clickable-row">
                <td>{app.projectName}</td>
                <td>{app.projectLocation}</td>
                <td>{app.appStatus}</td>
                <td>${app.projectValue}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <div className="actions-wrapper">
                    <Link to={`/edit/${app.id}`} onClick={(e) => e.stopPropagation()}>
                      <Button label="Edit" svgLogo={EditIcon} className="edit-button compact" />
                    </Link>
                    <Button
                      label="Delete"
                      svgLogo={DeleteIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(app.id);
                      }}
                      className="delete-button compact"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="applications-grid">
          {paginate(filteredApplications).map(app => (
            <div key={app.id} className="application-card" onClick={() => setSelectedApp(app)}>
              <h3 className="application-title">{app.projectName}</h3>
              <p><strong>Location:</strong> {app.projectLocation}</p>
              <p><strong>Status:</strong> {app.appStatus}</p>
              <p><strong>Value:</strong> ${app.projectValue}</p>
              <div className="application-actions" onClick={(e) => e.stopPropagation()}>
                <Link to={`/edit/${app.id}`}>
                  <Button label="Edit" svgLogo={EditIcon} className="edit-button" />
                </Link>
                <Button label="Delete" svgLogo={DeleteIcon} onClick={() => handleDelete(app.id)} className="delete-button" />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <Button label="Previous" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="pagination-btn" />
        <span>Page {currentPage} of {totalPages}</span>
        <Button label="Next" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="pagination-btn" />
      </div>

      <EntityDetailModal
        entity={selectedApp}
        onClose={() => setSelectedApp(null)}
        onDelete={handleDelete}
        editLinkBase="/edit"
        fields={applicationFields}
        titleField="projectName"
        editIcon={EditIcon}
        deleteIcon={DeleteIcon}
      />
    </div>
  );
};

export default AppsPage;
