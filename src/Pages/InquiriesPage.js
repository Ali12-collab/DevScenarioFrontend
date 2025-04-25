import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getInquiries, deleteInquiry } from '../Services/InquiryServices';
import Button from '../Components/Button';
import LoadingSpinner from '../Components/LoadingSpinner';
import SearchBar from '../Components/SearchBar';
import EntityDetailModal from '../Components/EntityDetailModal';
import '../Styling/InquiriesPage.css';
import Swal from 'sweetalert2';

const EditIcon = (
  <img src={require('../Assets/edit-2-svgrepo-com.svg').default} alt="Edit" width="16" height="16" />
);

const DeleteIcon = (
  <img src={require('../Assets/trash-svgrepo-com.svg').default} alt="Delete" width="16" height="16" />
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

const inquiryFields = [
  { key: 'applicationId', label: 'Application ID' },
  { key: 'sendToPerson', label: 'Send To' },
  { key: 'sendToRole', label: 'Role' },
  { key: 'inquiry', label: 'Inquiry' },
  { key: 'response', label: 'Response' },
  { key: 'askedDt', label: 'Asked Date' },
  { key: 'completedDt', label: 'Completed Date' }
];

const InquiriesPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const data = await getInquiries();
        setInquiries(data);
        setFilteredInquiries(data);
      } catch (err) {
        console.error('Failed to fetch inquiries:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  const handleSearch = (term) => {
    if (!term) return setFilteredInquiries(inquiries);
    const results = inquiries.filter((i) =>
      i.subject?.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredInquiries(results);
  };

  const handleDelete = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Delete this inquiry?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });
  
    if (!isConfirmed) return;
  
    try {
      await deleteInquiry(id);
      const updated = inquiries.filter((inq) => inq.id !== id);
      setInquiries(updated);
      setFilteredInquiries(updated);
      setSelectedInquiry(null);
      Swal.fire('Deleted!', 'Inquiry removed successfully.', 'success');
    } catch (err) {
      console.error('Error deleting inquiry:', err);
      Swal.fire('Error', 'Failed to delete the inquiry.', 'error');
    }
  };
  

  const paginate = (data) => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const totalPages = Math.ceil((filteredInquiries ?? []).length / itemsPerPage);

  if (loading) return <LoadingSpinner fullPage />;

  return (
    <div className="inquiries-container fade-in">
      <div className="header-section">
        <h2 className="page-title">Inquiries</h2>
        <SearchBar
          data={inquiries}
          searchFields={['subject']}
          onSearch={handleSearch}
          placeholder="Search by Subject..."
        />
        <div className="header-actions">
          <Link to="/inquiries/create">
            <Button label="Create New Inquiry" svgLogo={CreateIcon} className="create-button" />
          </Link>
          <div className="view-toggle">
            <Button
              label="Table View"
              svgLogo={TableViewIcon}
              onClick={() => setViewType('table')}
              className={viewType === 'table' ? 'active' : ''}
            />
            <Button
              label="Card View"
              svgLogo={CardViewIcon}
              onClick={() => setViewType('card')}
              className={viewType === 'card' ? 'active' : ''}
            />
          </div>
        </div>
      </div>

      {viewType === 'table' ? (
        <div className="table-container">
          <table className="applications-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>App ID</th>
                <th>To</th>
                <th>Role</th>
                <th>Subject</th>
                <th>Inquiry</th>
                <th>Response</th>
                <th>Asked</th>
                <th>Completed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginate(filteredInquiries).map((item) => (
                <tr
                  key={item.id}
                  onClick={() => setSelectedInquiry(item)}
                  className="clickable-row"
                >
                  <td>{item.id}</td>
                  <td>{item.applicationId}</td>
                  <td>{item.sendToPerson}</td>
                  <td>{item.sendToRole}</td>
                  <td>{item.subject}</td>
                  <td title={item.inquiry}>{item.inquiry?.slice(0, 50)}...</td>
                  <td title={item.response}>{item.response?.slice(0, 50)}...</td>
                  <td>{new Date(item.askedDt).toLocaleDateString()}</td>
                  <td>{new Date(item.completedDt).toLocaleDateString()}</td>
                  <td onClick={(e) => e.stopPropagation()}>
  <div className="actions-wrapper">
    <Link
      to={`/inquiries/edit/${item.id}`}
      onClick={(e) => e.stopPropagation()}
    >
      <Button label="Edit" svgLogo={EditIcon} className="edit-button compact" />
    </Link>
    <Button
      label="Delete"
      svgLogo={DeleteIcon}
      onClick={(e) => {
        e.stopPropagation();
        handleDelete(item.id);
      }}
      className="delete-button compact"
    />
  </div>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="applications-grid">
          {paginate(filteredInquiries).map((item) => (
            <div
              className="application-card"
              key={item.id}
              onClick={() => setSelectedInquiry(item)}
            >
              <h3 className="application-title">{item.subject}</h3>
              <p><strong>To:</strong> {item.sendToPerson}</p>
              <p><strong>Inquiry:</strong> {item.inquiry?.slice(0, 100)}...</p>
              <p><strong>Response:</strong> {item.response?.slice(0, 100)}...</p>
              <div className="application-actions" onClick={(e) => e.stopPropagation()}>
                <Link to={`/inquiries/edit/${item.id}`}>
                  <Button label="Edit" svgLogo={EditIcon} className="edit-button" />
                </Link>
                <Button
                  label="Delete"
                  svgLogo={DeleteIcon}
                  onClick={() => handleDelete(item.id)}
                  className="delete-button"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <Button
          label="Previous"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        />
        <span>Page {currentPage} of {totalPages}</span>
        <Button
          label="Next"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        />
      </div>

      <EntityDetailModal
        entity={selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        onDelete={handleDelete}
        editLinkBase="/inquiries/edit"
        fields={inquiryFields}
        titleField="subject"
        editIcon={EditIcon}
        deleteIcon={DeleteIcon}
      />
    </div>
  );
};

export default InquiriesPage;
