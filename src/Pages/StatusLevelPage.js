import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStatusLevels, deleteStatusLevel } from '../Services/StatusLevelServices';
import Button from '../Components/Button';
import SearchBar from '../Components/SearchBar';
import LoadingSpinner from '../Components/LoadingSpinner';
import EntityDetailModal from '../Components/EntityDetailModal';
import Swal from 'sweetalert2';
import '../Styling/AppsPage.css';

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

const statusLevelFields = [
  { key: 'id', label: 'ID' },
  { key: 'statusName', label: 'Status Name' }
];

const StatusLevelPage = () => {
  const [statusLevels, setStatusLevels] = useState([]);
  const [filteredStatusLevels, setFilteredStatusLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewType, setViewType] = useState('table');
  const [selectedStatusLevel, setSelectedStatusLevel] = useState(null);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStatusLevels();
      setStatusLevels(data);
      setFilteredStatusLevels(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSearch = (term) => {
    if (!term) return setFilteredStatusLevels(statusLevels);
    const lower = term.toLowerCase();
    const results = statusLevels.filter((s) =>
      s.statusName?.toLowerCase().includes(lower)
    );
    setFilteredStatusLevels(results);
  };

  const handleDelete = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this status level?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!isConfirmed) return;

    try {
      await deleteStatusLevel(id);
      const updatedList = statusLevels.filter(item => item.id !== id);
      setStatusLevels(updatedList);
      setFilteredStatusLevels(updatedList);
      setSelectedStatusLevel(null);
      Swal.fire('Deleted!', 'Status level deleted successfully.', 'success');
    } catch (error) {
      console.error('Delete failed:', error);
      const errorMessage = error?.response?.data || 'Something went wrong while deleting.';

      if (
        errorMessage.includes('The DELETE statement conflicted') ||
        errorMessage.includes('entity changes')
      ) {
        Swal.fire('Cannot delete', 'This status level is used by one or more applications.', 'error');
      } else {
        Swal.fire('Error', errorMessage, 'error');
      }
    }
  };

  const paginate = (data) => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const totalPages = Math.ceil(filteredStatusLevels.length / itemsPerPage);

  if (loading) return <LoadingSpinner fullPage />;

  return (
    <div className="apps-page-container fade-in">
      <h2 className="page-title">Status Levels</h2>

      <SearchBar
        data={statusLevels}
        searchFields={['statusName']}
        onSearch={handleSearch}
        placeholder="Search Status Levels..."
      />

      <div className="action-buttons">
        <Link to="/status/create">
          <Button label="Create New Status Level" svgLogo={CreateIcon} className="create-button" />
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
              <th>ID</th>
              <th>Status Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginate(filteredStatusLevels).map((item) => (
              <tr key={item.id} onClick={() => setSelectedStatusLevel(item)} className="clickable-row">
                <td>{item.id}</td>
                <td>{item.statusName}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <Link to={`/status/edit/${item.id}`} onClick={(e) => e.stopPropagation()}>
                    <Button label="Edit" svgLogo={EditIcon} className="edit-button" />
                  </Link>
                  <Button label="Delete" svgLogo={DeleteIcon} onClick={() => handleDelete(item.id)} className="delete-button" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="applications-grid">
          {paginate(filteredStatusLevels).map((item) => (
            <div key={item.id} className="application-card" onClick={() => setSelectedStatusLevel(item)}>
              <h3 className="application-title">{item.statusName}</h3>
              <div className="application-actions" onClick={(e) => e.stopPropagation()}>
                <Link to={`/status/edit/${item.id}`}>
                  <Button label="Edit" svgLogo={EditIcon} className="edit-button" />
                </Link>
                <Button label="Delete" svgLogo={DeleteIcon} onClick={() => handleDelete(item.id)} className="delete-button" />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <Button label="Previous" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
        <span>Page {currentPage} of {totalPages}</span>
        <Button label="Next" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
      </div>

      <EntityDetailModal
        entity={selectedStatusLevel}
        onClose={() => setSelectedStatusLevel(null)}
        onDelete={handleDelete}
        editLinkBase="/status/edit"
        fields={statusLevelFields}
        titleField="statusName"
        editIcon={EditIcon}
        deleteIcon={DeleteIcon}
      />
    </div>
  );
};

export default StatusLevelPage;
