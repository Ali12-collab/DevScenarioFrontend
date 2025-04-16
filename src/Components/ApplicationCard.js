// src/components/ApplicationCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ApplicationCard = ({ application, onDelete }) => {
  const handleDelete = () => {
    onDelete(application.id);
  };

  return (
    <tr>
      <td>{application.projectName}</td>
      <td>{application.appStatus}</td>
      <td>
        <Link to="#" onClick={() => onDelete(application.id)}>Delete</Link> | 
        <Link to={`/`} onClick={() => onDelete(application.id)}>Edit</Link>
      </td>
    </tr>
  );
};

export default ApplicationCard;
