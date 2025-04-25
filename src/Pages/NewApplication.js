import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createApplication } from '../Services/ApplicationServices';
import { applicationFormConfig } from '../Config/FormConfig';
import '../Styling/NewApplication.css'; // Import your updated CSS
import Swal from 'sweetalert2';


function NewApplication() {
  const [formValues, setFormValues] = useState({
    appStatus: '',
    projectRef: '',
    projectName: '',
    projectLocation: '',
    openDt: '',
    startDt: '',
    completedDt: '',
    projectValue: '',
    statusId: '',
    notes: '',
  });

  const [initialFormValues] = useState({ ...formValues });
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newApplication = { ...formValues };
      await createApplication(newApplication);
      await Swal.fire({
        title: 'Created!',
        text: 'Application created successfully.',
        icon: 'success',
        confirmButtonColor: '#2563eb',
      });
      // navigate('/applications');
    } catch (error) {
      console.error('Error creating application:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to create the application.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  };
  

  const isFormValid = Object.values(formValues).every((value) => value.trim() !== '');
  const hasUnsavedChanges = JSON.stringify(formValues) !== JSON.stringify(initialFormValues);

  return (
    <div className="form-card">
      <h2 className="form-title">Create New Application</h2>
      <form className="app-form" onSubmit={handleSubmit}>
        {applicationFormConfig.map((field) => (
          <div key={field.name} className="form-field">
            <label htmlFor={field.name}>{field.label}</label>
            <input
              id={field.name}
              type={field.type}
              value={formValues[field.name]}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
            />
          </div>
        ))}
        <button
          type="submit"
          className="app-submit-btn"
          disabled={!isFormValid || !hasUnsavedChanges}
        >
          Create Application
        </button>
      </form>
    </div>
  );
}

export default NewApplication;
