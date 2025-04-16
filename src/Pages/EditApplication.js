import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getApplicationById, updateApplication } from '../Services/ApplicationServices';
import { applicationFormConfig } from '../Config/FormConfig';
import LoadingSpinner from '../Components/LoadingSpinner';
import '../Styling/EditApplication.css';
import Popup from '../Components/Popup';
import '../Styling/Popup.css';

const EditApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const data = await getApplicationById(id);
        setFormValues(data);
      } catch (error) {
        console.error('Error fetching application:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleChange = (name, value) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateApplication(id, formValues);
  
      // Show a confirmation popup
      alert('✅ Application updated successfully!');
  
      // Navigate after confirmation
      navigate('/applications');
    } catch (error) {
      console.error('Error updating application:', error);
      alert('❌ Something went wrong while updating.');
    }
  };
  

  if (loading) return <LoadingSpinner fullPage />;

  return (
    <div className="edit-form-container fade-in">
      <h2 className="edit-title">Edit Application</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        {applicationFormConfig.map((field) => (
          <div className="form-group" key={field.name}>
            <label className="form-label">{field.label}</label>
            <input
              className="form-input"
              type={field.type}
              name={field.name}
              value={formValues[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
            />
          </div>
        ))}
        <button type="submit" className="submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditApplication;
