import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createApplication } from '../Services/ApplicationServices';
import { applicationFormConfig } from '../Config/FormConfig';

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

  const handleSubmit = async () => {
    const newApplication = { ...formValues };
    await createApplication(newApplication);
    navigate('/applications');
  };

  const isFormValid = Object.values(formValues).every((value) => value.trim() !== '');

  const hasUnsavedChanges = () => {
    return JSON.stringify(formValues) !== JSON.stringify(initialFormValues);
  };

  return (
    <div>
      <h2>Create New Application</h2>
      <form onSubmit={handleSubmit}>
        {applicationFormConfig.map((field) => (
          <div key={field.name}>
            <label>{field.label}</label>
            <input
              type={field.type}
              value={formValues[field.name]}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
            />
          </div>
        ))}
        <button type="submit" disabled={!isFormValid || !hasUnsavedChanges()}>Create</button>
      </form>
    </div>
  );
}

export default NewApplication;
