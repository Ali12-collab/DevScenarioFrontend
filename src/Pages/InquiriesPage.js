import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {getInquiries, deleteInquiry} from '../Services/InquiryServices';
import Button from '../Components/Button';
import '../Styling/AppsPage.css';
import LoadingSpinner from '../Components/LoadingSpinner';

const InquiriesPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInquiries();
      setInquiries(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await deleteInquiry(id);
      setInquiries(inquiries.filter(i => i.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Error deleting inquiry.');
    }
  };

  const paginate = (data) => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const totalPages = Math.ceil(inquiries.length / itemsPerPage);

  if (loading) return <LoadingSpinner fullPage />;
  return (
    <div className="apps-page-container fade-in">
      <h2>Inquiries</h2>

      <div className="action-buttons">
        <Link to="/inquiries/create">
          <Button label="Create New Inquiry" className="create-button" />
        </Link>
      </div>

      <table className="applications-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Send To</th>
            <th>Asked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginate(inquiries).map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.subject}</td>
              <td>{item.sendToPerson}</td>
              <td>{item.askedDt}</td>
              <td>
                <Link to={`/inquiries/edit/${item.id}`}>
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

export default InquiriesPage;