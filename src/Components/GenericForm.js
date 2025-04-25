import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../Styling/GenericForm.css";
import Swal from 'sweetalert2';

const GenericForm = ({ entity, fields, initialValues = {}, onSubmit, apiCalls }) => {
  const [formData, setFormData] = useState(initialValues);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
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

    try {
      if (id) {
        // Edit existing entity
        await apiCalls.edit(id, formData);
        Swal.fire({
          title: `${entity} Updated`,
          text: `${entity} has been successfully updated.`,
          icon: 'success',
          confirmButtonColor: '#2563eb',
        });
      } else {
        // Optional validation for Status Level
        if (entity === 'Status Level') {
          const firstFieldName = fields[0]?.name;
          const statusValue = formData[firstFieldName] || '';

          if (/\d/.test(statusValue)) {
            Swal.fire({
              title: 'Invalid Input',
              text: 'Status Level must not contain numbers.',
              icon: 'error',
              confirmButtonColor: '#d33',
            });
            return;
          }
        }

        await apiCalls.add(formData);
        Swal.fire({
          title: `${entity} Created`,
          text: `${entity} has been successfully created.`,
          icon: 'success',
          confirmButtonColor: '#2563eb',
        });

        navigate('/'); // Only navigate after creating
      }

      onSubmit();
    } catch (error) {
      console.error(`${entity} Save Error:`, error);
      Swal.fire({
        title: 'Error!',
        text: `Something went wrong while saving ${entity.toLowerCase()}.`,
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div className="generic-form-container">
      <h1 className="generic-form-title">
        {id ? `Edit ${entity}` : `Add New ${entity}`}
      </h1>
      <form onSubmit={handleSubmit} className="generic-form">
        {fields.map((field, idx) => (
          <div key={idx} className="form-group">
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type || 'text'}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required || false}
            />
          </div>
        ))}
        <button
          type="submit"
          className="generic-submit-btn"
        >
          {id ? 'Save Changes' : 'Add ' + entity}
        </button>
      </form>
    </div>
  );
};

export default GenericForm;
