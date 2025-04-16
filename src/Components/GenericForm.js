// src/components/GenericForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../Styling/GenericForm.css"; // Import your CSS file for styling

const GenericForm = ({ entity, fields, initialValues = {}, onSubmit, apiCalls }) => {
  const [formData, setFormData] = useState(initialValues);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Edit existing entity
      const fetchEntity = async () => {
        const data = await apiCalls.get(id);
        setFormData(data);
      };
      fetchEntity();
    }
  }, [id, apiCalls]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await apiCalls.edit(id, formData);
    } else {
      await apiCalls.add(formData);
    }
    navigate('/');
    onSubmit();  // Callback for any post-submit actions like navigation
  };

  return (
    <div>
      <h1>{id ? `Edit ${entity}` : `Add New ${entity}`}</h1>
      <form onSubmit={handleSubmit}>
        {fields.map((field, idx) => (
          <div key={idx}>
            <label>{field.label}</label>
            <input
              type={field.type || 'text'}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required || false}
            />
          </div>
        ))}
        <button type="submit">{id ? 'Save Changes' : 'Add ' + entity}</button>
      </form>
    </div>
  );
};

export default GenericForm;
